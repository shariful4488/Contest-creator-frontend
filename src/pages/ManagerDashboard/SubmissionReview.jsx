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
    const winnerEntry = submissions.find(sub => sub.winnerEmail);
    const isAnyWinnerDeclared = !!winnerEntry;

    const handleMakeWinner = async (submission) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to make ${submission.userName || submission.userEmail} the winner?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const winnerData = {
                    contestId: submission.contestId,
                    winnerEmail: submission.userEmail,
                    winnerName: submission.userName || "Participant"
                };

                try {
                    const res = await axiosSecure.patch(`/make-winner/${submission._id}`, winnerData);
                    if (res.data.success) {
                        Swal.fire("Success!", "Winner has been declared successfully.", "success");
                        refetch(); 
                    }
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong.", "error");
                }
            }
        });
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-100">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-8 font-outfit">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-secondary uppercase italic">
                    Review <span className="text-primary">Submissions</span>
                </h2>
                {isAnyWinnerDeclared && (
                    <div className="badge badge-success gap-2 p-4 text-white font-bold">
                         Winner: {winnerEntry.winnerEmail}
                    </div>
                )}
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-slate-100">
                <table className="table w-full">
                    <thead className="bg-slate-50 text-secondary">
                        <tr>
                            <th className="py-5">#</th>
                            <th>Participant Email</th>
                            <th>Submitted Work</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub, index) => {
                            const isThisUserWinner = sub.winnerEmail;
                            
                            return (
                                <tr key={sub._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="font-bold text-slate-400">{index + 1}</td>
                                    <td className="font-medium text-secondary">{sub.userEmail}</td>
                                    <td>
                                        <a 
                                            href={sub.submittedTask} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="btn btn-xs btn-outline btn-primary rounded-full px-4"
                                        >
                                            View Link
                                        </a>
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleMakeWinner(sub)}
                                            disabled={isAnyWinnerDeclared}
                                            className={`btn btn-sm min-w-30 rounded-lg border-none text-white transition-all
                                                ${isThisUserWinner 
                                                    ? 'bg-yellow-500 hover:bg-yellow-600 shadow-lg shadow-yellow-100' 
                                                    : isAnyWinnerDeclared 
                                                        ? 'bg-slate-300 cursor-not-allowed' 
                                                        : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-100'
                                                }`}
                                        >
                                            {isThisUserWinner 
                                                ? " Winner" 
                                                : isAnyWinnerDeclared 
                                                    ? "Closed" 
                                                    : "Make Winner"
                                            }
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                
                {submissions.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-bold uppercase tracking-widest">No submissions yet to review.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmissionReview;


