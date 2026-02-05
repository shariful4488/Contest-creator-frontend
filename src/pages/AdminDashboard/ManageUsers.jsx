import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxios";
import { FaTrashAlt, FaUserShield, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();

    // সব ইউজারদের ডাটা নিয়ে আসা
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    // রোল পরিবর্তন করার ফাংশন
    const handleUpdateRole = (user, newRole) => {
        axiosPublic.patch(`/users/role/${user._id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch(); // টেবিল আপডেট করার জন্য
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a ${newRole}!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    return (
        <div className="font-outfit">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-black text-secondary uppercase italic">Manage <span className="text-primary">Users</span></h2>
                    <p className="text-slate-400 font-medium">Total Users: {users.length}</p>
                </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-slate-50">
                        <tr className="text-secondary uppercase text-[11px] tracking-widest border-none">
                            <th className="py-5 pl-8">User Info</th>
                            <th>Current Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-semibold text-slate-600">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors">
                                <td className="py-4 pl-8">
                                    <div className="flex items-center gap-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.image} alt={user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-secondary">{user.name}</div>
                                            <div className="text-xs opacity-50 font-medium">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge badge-sm font-bold p-3 uppercase tracking-tighter ${
                                        user.role === 'admin' ? 'badge-primary text-secondary' : 
                                        user.role === 'creator' ? 'badge-secondary text-white' : 'badge-ghost'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="flex justify-center gap-2">
                                        {/* Make Admin Button */}
                                        <button 
                                            onClick={() => handleUpdateRole(user, 'admin')}
                                            disabled={user.role === 'admin'}
                                            className="btn btn-ghost btn-xs text-primary hover:bg-primary/10 tooltip" 
                                            data-tip="Make Admin"
                                        >
                                            <FaUserShield className="text-lg" />
                                        </button>

                                        {/* Make Manager/Creator Button */}
                                        <button 
                                            onClick={() => handleUpdateRole(user, 'creator')}
                                            disabled={user.role === 'creator'}
                                            className="btn btn-ghost btn-xs text-secondary hover:bg-secondary/10 tooltip" 
                                            data-tip="Make Manager"
                                        >
                                            <FaUserEdit className="text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;