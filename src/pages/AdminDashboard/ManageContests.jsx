import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

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
                    Swal.fire("Confirmed!", "Contest approved successfully.", "success");
                }
            });
    };

    const handleReject = (id) => {
        axiosSecure.patch(`/contests/status/${id}`, { status: 'Rejected' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire("Rejected!", "Contest has been rejected.", "info");
                }
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Admin can delete any contest, regardless of status!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // FIXED: URL-এ role=admin পাঠানো হচ্ছে 400 error এড়াতে
                axiosSecure.delete(`/contests/${id}?role=admin`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Contest removed.", "success");
                        }
                    })
                    .catch(err => {
                        Swal.fire("Failed!", err.response?.data?.message || "Error occurred", "error");
                    });
            }
        });
    };

    return (
        <div className="p-5 font-outfit">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-secondary uppercase italic">
                    Manage <span className="text-primary">Contests</span>
                </h2>
                <p className="text-slate-400 font-medium">Total Contests: {contests.length}</p>
            </div>

            <div className="overflow-x-auto bg-white rounded-3xl border border-slate-100 shadow-sm">
                <table className="table w-full">
                    <thead className="bg-slate-50">
                        <tr className="text-secondary uppercase text-[11px] tracking-widest border-none">
                            <th className="py-5 pl-8">Contest Name</th>
                            <th>Creator Email</th>
                            <th>Status</th>
                            <th className="text-center">Confirm / Reject</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-semibold text-slate-600">
                        {contests.map((contest) => (
                            <tr key={contest._id} className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors">
                                <td className="py-4 pl-8 font-bold text-secondary">{contest.contestName}</td>
                                <td>{contest.creatorEmail}</td>
                                <td>
                                    <span className={`badge badge-sm font-bold p-3 uppercase tracking-tighter ${
                                        contest.status === 'Accepted' ? 'badge-success text-white' : 
                                        contest.status === 'Rejected' ? 'badge-error text-white' : 'badge-warning text-white'
                                    }`}>
                                        {contest.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleConfirm(contest._id)} disabled={contest.status === 'Accepted'} className="btn btn-ghost btn-xs text-green-500 hover:bg-green-50 tooltip" data-tip="Confirm"><FaCheckCircle size={20} /></button>
                                        <button onClick={() => handleReject(contest._id)} disabled={contest.status === 'Rejected' || contest.status === 'Accepted'} className="btn btn-ghost btn-xs text-orange-500 hover:bg-orange-50 tooltip" data-tip="Reject"><FaTimesCircle size={20} /></button>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <button onClick={() => handleDelete(contest._id)} className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50 tooltip" data-tip="Delete"><FaTrashAlt size={18} /></button>
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