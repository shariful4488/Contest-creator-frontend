import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa"; 
import Swal from "sweetalert2";
import { Link } from "react-router"; 
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole"; 
import useAuth from "../../hooks/useAuth";

const MyCreatedContests = () => {
    const axiosSecure = useAxiosSecure(); 
    const { user } = useAuth();
    const [role] = useRole(); 

    const { data: contests = [], refetch, isLoading } = useQuery({
        queryKey: ['my-contests', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests?email=${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#f43f5e",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contests/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "Your contest has been deleted.", "success");
                    }
                }).catch(() => {
                    Swal.fire("Error!", "Something went wrong while deleting.", "error");
                });
            }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="font-outfit p-4 lg:p-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-secondary uppercase italic leading-tight">
                        My <span className="text-primary">Contests</span>
                    </h2>
                    <p className="text-slate-400 font-medium">Manage and monitor your created contests</p>
                </div>
                <div className="badge badge-secondary p-4 font-bold shadow-sm">
                    Total: {contests.length}
                </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-xl bg-white">
                <table className="table w-full">
                    <thead className="bg-slate-50">
                        <tr className="text-secondary uppercase text-[11px] tracking-widest border-none">
                            <th className="py-5 pl-8">Contest Info</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th className="text-center">Submission</th> 
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-semibold text-slate-600">
                        {contests.length > 0 ? (
                            contests.map((contest) => (
                                <tr key={contest._id} className="hover:bg-slate-50/50 border-b border-slate-50 transition-all">
                                    <td className="py-4 pl-8">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12 bg-slate-100">
                                                    <img src={contest.image} alt={contest.contestName} 
                                                         onError={(e) => e.target.src = "https://via.placeholder.com/150"} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-secondary text-base">{contest.contestName}</div>
                                                <div className="text-xs text-slate-400 capitalize">{contest.type || 'Standard'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="capitalize font-medium text-slate-500">{contest.contestCategory}</td>
                                    <td>
                                        <span className={`badge badge-sm font-bold p-3 uppercase tracking-tighter shadow-sm border-none ${
                                            contest.status === 'Accepted' ? 'bg-green-500 text-white' : 'bg-orange-400 text-white'
                                        }`}>
                                            {contest.status || 'Pending'}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <Link to={`/dashboard/submission-review/${contest._id}`}>
                                            <button 
                                                className="p-2 rounded-xl text-emerald-500 hover:bg-emerald-50 transition-colors shadow-sm border border-emerald-100"
                                                title="View Submissions"
                                            >
                                                <FaEye className="text-xl mx-auto" />
                                            </button>
                                        </Link>
                                    </td>

                                    <td className="text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <Link 
                                                to={role === 'admin' || contest.status !== 'Accepted' ? `/dashboard/update-contest/${contest._id}` : "#"}
                                                onClick={(e) => (role !== 'admin' && contest.status === 'Accepted') && e.preventDefault()}
                                            >
                                                <button 
                                                    disabled={role !== 'admin' && contest.status === 'Accepted'}
                                                    className="p-2 rounded-xl text-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
                                                    title={contest.status === 'Accepted' ? "Cannot edit approved contest" : "Edit Contest"}
                                                >
                                                    <FaEdit className="text-xl" />
                                                </button>
                                            </Link>

                                            <button 
                                                onClick={() => handleDelete(contest._id)}
                                                disabled={role !== 'admin' && contest.status === 'Accepted'}
                                                className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
                                                title={contest.status === 'Accepted' && role !== 'admin' ? "Approved contests can only be deleted by Admin" : "Delete Contest"}
                                            >
                                                <FaTrashAlt className="text-xl" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-20">
                                    <div className="text-slate-400 font-bold uppercase tracking-widest">No contests found</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCreatedContests;