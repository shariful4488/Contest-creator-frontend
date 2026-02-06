import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

    const handleMakeWinner = async (submission) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to make ${submission.userName || submission.userEmail} the winner?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const winnerData = {
                    contestId: submission.contestId,
                    winnerEmail: submission.userEmail,
                    winnerName: submission.userName || "Participant"
                };

                const res = await axiosSecure.patch(`/make-winner/${submission._id}`, winnerData);
                if (res.data.success) {
                    Swal.fire("Success!", "Winner has been declared.", "success");
                    refetch();
                }
            }
        });
    };

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Review Submissions</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Participant Email</th>
                            <th>Submitted Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub, index) => (
                            <tr key={sub._id}>
                                <td>{index + 1}</td>
                                <td>{sub.userEmail}</td>
                                <td>
                                    <a href={sub.submittedTask} target="_blank" className="link link-primary">
                                        View Work
                                    </a>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleMakeWinner(sub)}
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        Make Winner
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {submissions.length === 0 && <p className="text-center py-10">No submissions yet.</p>}
            </div>
        </div>
    );
};

export default SubmissionReview;