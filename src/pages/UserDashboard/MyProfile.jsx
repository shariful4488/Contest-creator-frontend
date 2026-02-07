import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { FaUserShield, FaUsers, FaTasks, FaEnvelope, FaFingerprint, FaCog } from "react-icons/fa";

const MyProfile = () => {
    const { user } = useAuth();
    const [role] = useRole();

    const isAdmin = role === 'admin';

    return (
        <div className="animate-fade-in font-outfit">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-3xl font-black text-secondary uppercase italic leading-none">
                        {isAdmin ? "Admin" : "User"} <span className="text-primary">Profile</span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 font-medium">
                        {isAdmin ? "Platform Control & Personal Information" : "Your personal journey and stats"}
                    </p>
                </div>
                <button className={`btn btn-sm rounded-full px-6 shadow-lg transition-all ${isAdmin ? 'btn-secondary' : 'btn-primary text-white'}`}>
                    <FaCog /> Settings
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm text-center relative overflow-hidden">
                    {isAdmin && <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-6 py-1 rotate-45 translate-x-4 translate-y-2 uppercase">Root</div>}
                    
                    <div className="avatar ring-4 ring-primary ring-offset-4 rounded-full w-28 h-28 mb-6 mx-auto">
                        <img src={user?.photoURL || "https://i.ibb.co/3S46BvD/user.png"} className="rounded-full" alt="Avatar" />
                    </div>

                    <h3 className="text-2xl font-black text-secondary uppercase italic">{user?.displayName}</h3>
                    
                    <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isAdmin ? 'bg-secondary text-white' : 'bg-primary/10 text-primary'}`}>
                        {isAdmin ? <FaUserShield /> : <FaFingerprint />} {role} Mode
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl text-left border border-slate-100">
                            <FaEnvelope className="text-primary" />
                            <div className="overflow-hidden">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Registered Email</p>
                                <p className="text-xs font-bold text-secondary truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    {isAdmin ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            <div className="bg-primary p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl shadow-primary/20 group hover:-translate-y-1 transition-transform">
                                <div>
                                    <FaUsers className="text-4xl mb-4 opacity-50 group-hover:scale-110 transition-transform" />
                                    <p className="font-black uppercase italic text-xs tracking-widest opacity-80">Platform Management</p>
                                    <h4 className="text-4xl font-black italic mt-2 uppercase">Manage Users</h4>
                                </div>
                                <p className="text-sm mt-4 text-blue-100 italic">Total 124 Active users on site</p>
                            </div>

                            <div className="bg-secondary p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl shadow-slate-300 group hover:-translate-y-1 transition-transform">
                                <div>
                                    <FaTasks className="text-4xl mb-4 text-primary opacity-80 group-hover:scale-110 transition-transform" />
                                    <p className="font-black uppercase italic text-xs tracking-widest opacity-60">Approvals</p>
                                    <h4 className="text-4xl font-black italic mt-2 uppercase">Contest Requests</h4>
                                </div>
                                <p className="text-sm mt-4 text-slate-400 italic">05 Pending approvals required</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 h-full flex flex-col justify-center items-center text-center">
                            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                                <FaTasks className="text-3xl text-primary" />
                            </div>
                            <h4 className="text-2xl font-black text-secondary uppercase italic">Performance Snapshot</h4>
                            <p className="text-slate-400 mt-2 max-w-sm">You haven't participated in any contests yet. Start your journey today and win prizes!</p>
                            <button className="btn btn-primary btn-outline mt-8 rounded-full px-8 font-black uppercase italic text-xs tracking-widest">Explore Contests</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;