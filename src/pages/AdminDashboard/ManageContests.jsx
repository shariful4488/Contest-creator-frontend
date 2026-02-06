import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    // অ্যাডমিন হিসেবে সব কন্টেস্ট (Pending + Accepted) পাওয়ার জন্য '/contests' ব্যবহার করা হয়েছে
    const { data: contests = [], refetch } = useQuery({
        queryKey: ['all-contests-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests'); 
            return res.data;
        }
    });

    const handleConfirm = (id) => {
        axiosSecure.patch(`/contests/status/${id}`, { status: 'Accepted' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire("Confirmed!", "Contest has been approved.", "success");
                }
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contests/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "Contest removed.", "success");
                    }
                });
            }
        });
    };

    return (
        <div className="p-5">
            <h2 className="text-3xl font-bold mb-5">Manage Contests ({contests.length})</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Contest Name</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th>Confirm</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest) => (
                            <tr key={contest._id}>
                                <td>{contest.contestName}</td>
                                <td>{contest.creatorEmail}</td>
                                <td>
                                    <span className={`badge ${contest.status === 'Accepted' ? 'badge-success' : 'badge-warning'}`}>
                                        {contest.status || 'Pending'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleConfirm(contest._id)}
                                        disabled={contest.status === 'Accepted'}
                                        className="btn btn-ghost text-green-500"
                                    >
                                        <FaCheckCircle size={20} />
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(contest._id)} className="btn btn-ghost text-red-500">
                                        <FaTrashAlt size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContests;