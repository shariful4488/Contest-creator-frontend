import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SubmissionReview = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [], refetch, isLoading } = useQuery({
        queryKey: ['submissions', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/${id}`);
            return res.data;
        }
    });

    const winnerEntry = submissions.find(sub => sub.winnerEmail || sub.isWinner);
    const isAnyWinnerDeclared = !!winnerEntry;

    const handleMakeWinner = async (submission) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Confirming ${submission.userName || submission.userEmail} as the winner.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Declare Winner!",
        });

        if (result.isConfirmed) {
            try {
                const winnerData = {
                    contestId: submission.contestId,
                    winnerEmail: submission.userEmail,
                    winnerName: submission.userName || "Participant"
                };

                const res = await axiosSecure.patch(`/make-winner/${submission._id}`, winnerData);
                if (res.data.success) {
                    Swal.fire("Declared!", "Winner has been selected.", "success");
                    refetch();
                }
            } catch (error) {
                Swal.fire("Error!", "Failed to update winner.", "error");
            }
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 font-outfit max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
                        Review <span className="text-primary">Submissions</span>
                    </h2>
                    <p className="text-slate-500 text-sm">Review participant work and select the winner.</p>
                </div>

                {isAnyWinnerDeclared && (
                    <div className="w-full md:w-auto bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
                        <div className="bg-green-500 p-2 rounded-full text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-green-600">Selected Winner</p>
                            <p className="text-sm font-bold text-slate-700">{winnerEntry.winnerEmail}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200">
                <table className="table w-full border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-4 pl-6 text-slate-500 uppercase text-xs">#</th>
                            <th className="text-slate-500 uppercase text-xs">Participant</th>
                            <th className="text-slate-500 uppercase text-xs">Submission</th>
                            <th className="text-center text-slate-500 uppercase text-xs">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {submissions.map((sub, index) => (
                            <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="pl-6 font-semibold text-slate-400">{index + 1}</td>
                                <td>
                                    <div className="font-bold text-slate-700">{sub.userName || "Anonymous"}</div>
                                    <div className="text-xs text-slate-500">{sub.userEmail}</div>
                                </td>
                                <td>
                                    <a href={sub.submittedTask} target="_blank" rel="noreferrer" 
                                       className="btn btn-xs btn-outline btn-primary rounded-lg px-4 normal-case">
                                        Open Work
                                    </a>
                                </td>
                                <td className="text-center">
                                    <button 
                                        onClick={() => handleMakeWinner(sub)}
                                        disabled={isAnyWinnerDeclared}
                                        className={`btn btn-sm px-6 rounded-xl border-none text-white normal-case
                                            ${sub.winnerEmail || sub.isWinner 
                                                ? 'bg-yellow-500 hover:bg-yellow-600' 
                                                : isAnyWinnerDeclared ? 'bg-slate-200 text-slate-400' : 'bg-green-600 hover:bg-green-700'}`}
                                    >
                                        {sub.winnerEmail || sub.isWinner ? "Winner 🏆" : isAnyWinnerDeclared ? "Closed" : "Make Winner"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {submissions.map((sub, index) => (
                    <div key={sub._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">#{index + 1}</span>
                            <a href={sub.submittedTask} target="_blank" rel="noreferrer" className="text-primary text-sm font-bold underline">View Work</a>
                        </div>
                        <h4 className="font-black text-slate-800">{sub.userName || "Participant"}</h4>
                        <p className="text-sm text-slate-500 mb-5">{sub.userEmail}</p>
                        
                        <button 
                            onClick={() => handleMakeWinner(sub)}
                            disabled={isAnyWinnerDeclared}
                            className={`w-full btn btn-md rounded-xl border-none text-white
                                ${sub.winnerEmail || sub.isWinner ? 'bg-yellow-500' : isAnyWinnerDeclared ? 'bg-slate-200 text-slate-400' : 'bg-green-600'}`}
                        >
                            {sub.winnerEmail || sub.isWinner ? "Winner 🏆" : isAnyWinnerDeclared ? "Contest Closed" : "Declare as Winner"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {submissions.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No submissions found.</p>
                </div>
            )}
        </div>
    );
};

export default SubmissionReview;