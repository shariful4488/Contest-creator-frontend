import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxios";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageContests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['all-contests-admin'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-contests');
            return res.data;
        }
    });

    // ১. কন্টেস্ট অ্যাপ্রুভ করার ফাংশন
    const handleConfirm = (id) => {
        axiosPublic.patch(`/contests/status/${id}`, { status: 'Accepted' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Confirmed!",
                        text: "Contest has been approved and is now live.",
                        icon: "success",
                        timer: 1500
                    });
                }
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/contests/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "Contest has been deleted.", "success");
                    }
                });
            }
        });
    };

    return (
        <div className="font-outfit">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-black text-secondary uppercase italic leading-tight">
                        Manage <span className="text-primary">Contests</span>
                    </h2>
                    <p className="text-slate-400 font-medium">Review and approve contest submissions</p>
                </div>
                <div className="badge badge-primary p-4 font-bold">Total: {contests.length}</div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm bg-white">
                <table className="table w-full">
                    <thead className="bg-slate-50">
                        <tr className="text-secondary uppercase text-[11px] tracking-widest border-none">
                            <th className="py-5 pl-8">Contest Name</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th className="text-center">Confirm</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-semibold text-slate-600">
                        {contests.map((contest) => (
                            <tr key={contest._id} className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors">
                                <td className="py-4 pl-8 font-bold text-secondary">{contest.contestName}</td>
                                <td>{contest.creatorEmail}</td>
                                <td>
                                    <span className={`badge badge-sm font-bold uppercase ${
                                        contest.status === 'Accepted' ? 'badge-success text-white' : 'badge-warning text-white'
                                    }`}>
                                        {contest.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {/* ২. কনফার্ম বাটনটি এখানে ডাইনামিক করা হলো */}
                                    <button 
                                        onClick={() => handleConfirm(contest._id)}
                                        disabled={contest.status === 'Accepted'}
                                        className={`btn btn-ghost btn-xs ${contest.status === 'Accepted' ? 'text-slate-300' : 'text-green-500 hover:bg-green-50 tooltip'}`}
                                        data-tip="Approve Contest"
                                    >
                                        <FaCheckCircle className="text-xl" />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button 
                                        onClick={() => handleDelete(contest._id)}
                                        className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50"
                                    >
                                        <FaTrashAlt className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {contests.length === 0 && (
                    <div className="p-10 text-center text-slate-400">No contests available to manage.</div>
                )}
            </div>
        </div>
    );
};

export default ManageContests;