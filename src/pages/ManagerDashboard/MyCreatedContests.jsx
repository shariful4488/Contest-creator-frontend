import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyCreatedContests = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['my-contests', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contests?email=${user?.email}`);
            return res.data;
        }
    });

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
                        Swal.fire("Deleted!", "Your contest has been deleted.", "success");
                    }
                });
            }
        });
    };

    return (
        <div className="font-outfit">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-black text-secondary uppercase italic">My <span className="text-primary">Contests</span></h2>
                    <p className="text-slate-400 font-medium">Manage your created contests</p>
                </div>
                <div className="badge badge-secondary p-4 font-bold">Total: {contests.length}</div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm bg-white">
                <table className="table w-full">
                    <thead className="bg-slate-50">
                        <tr className="text-secondary uppercase text-[11px] tracking-widest border-none">
                            <th className="py-5 pl-8">Contest Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-semibold text-slate-600">
                        {contests.map((contest) => (
                            <tr key={contest._id} className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors">
                                <td className="py-4 pl-8">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10">
                                                <img src={contest.image} alt="" />
                                            </div>
                                        </div>
                                        <span className="font-bold text-secondary">{contest.contestName}</span>
                                    </div>
                                </td>
                                <td>{contest.contestCategory}</td>
                                <td>
                                    <span className={`badge badge-sm font-bold p-3 uppercase tracking-tighter ${
                                        contest.status === 'Accepted' ? 'badge-success text-white' : 'badge-warning text-white'
                                    }`}>
                                        {contest.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="flex justify-center gap-2">
                                        {/* Edit Button */}
                                        <Link to={`/dashboard/update-contest/${contest._id}`}>
                                            <button 
                                                disabled={contest.status === 'Accepted'}
                                                className="btn btn-ghost btn-xs text-blue-500 hover:bg-blue-50 tooltip" 
                                                data-tip="Edit Contest"
                                            >
                                                <FaEdit className="text-lg" />
                                            </button>
                                        </Link>

                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => handleDelete(contest._id)}
                                            disabled={contest.status === 'Accepted'}
                                            className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50 tooltip" 
                                            data-tip="Delete Contest"
                                        >
                                            <FaTrashAlt className="text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {contests.length === 0 && (
                    <div className="text-center py-10 text-slate-400 font-bold">You haven't created any contests yet.</div>
                )}
            </div>
        </div>
    );
};

export default MyCreatedContests;