import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { FaTrophy, FaGamepad, FaEnvelope, FaUserTag, FaChartLine } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['user-stats', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user-stats/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="font-outfit max-w-full overflow-hidden px-2 md:px-0">
            {/* Header / Banner Section */}
            <div className="relative h-32 md:h-48 bg-gradient-to-r from-primary to-secondary rounded-2xl md:rounded-[2.5rem] mb-16 md:mb-20 shadow-lg">
                <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-10 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 w-full md:w-auto">
                    <div className="avatar">
                        <div className="w-24 md:w-40 rounded-2xl md:rounded-3xl border-4 md:border-8 border-white shadow-xl bg-white">
                            <img src={user?.photoURL} alt="Profile" />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-xl md:text-3xl font-black text-secondary italic uppercase tracking-tighter truncate max-w-[250px] md:max-w-full">
                            {user?.displayName}
                        </h2>
                        <span className="badge badge-primary font-bold uppercase p-2 md:p-3 text-[8px] md:text-[10px] tracking-widest">
                           Verified Contestant
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pt-4">
                
                {/* Stats Section */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 md:gap-6 group">
                        <div className="p-3 md:p-4 bg-primary/10 rounded-xl text-primary">
                            <FaGamepad className="text-2xl md:text-3xl" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Participated</p>
                            <h4 className="text-2xl md:text-3xl font-black text-secondary">{stats?.participatedCount || 0}</h4>
                        </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 md:gap-6 group">
                        <div className="p-3 md:p-4 bg-yellow-100 rounded-xl text-yellow-600">
                            <FaTrophy className="text-2xl md:text-3xl" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Winnings</p>
                            <h4 className="text-2xl md:text-3xl font-black text-secondary">{stats?.winningCount || 0}</h4>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="sm:col-span-2 bg-white p-6 md:p-8 rounded-2xl md:rounded-[3rem] border border-slate-100 shadow-sm">
                        <h3 className="font-black text-secondary uppercase italic flex items-center gap-2 mb-4">
                            <FaChartLine className="text-primary" /> Performance
                        </h3>
                        <div className="h-32 w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                            <p className="text-slate-400 font-bold italic text-sm">Winning Ratio: {((stats?.winningCount / stats?.participatedCount) * 100 || 0).toFixed(1)}%</p>
                        </div>
                    </div>
                </div>

                {/* Info Sidebar - টেক্সট ফিক্সড করা হয়েছে */}
                <div className="bg-secondary p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] text-white shadow-xl">
                    <h3 className="text-lg md:text-xl font-black italic uppercase mb-6 border-b border-white/10 pb-4">
                        Info <span className="text-primary">Details</span>
                    </h3>
                    
                    <div className="space-y-6 overflow-hidden">
                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-xl shrink-0">
                                <FaEnvelope className="text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">Email Address</p>
                                <p className="text-sm font-semibold break-words leading-tight">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        {/* Role */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-xl shrink-0">
                                <FaUserTag className="text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">Account Role</p>
                                <p className="text-sm font-semibold uppercase tracking-tight">Contestant</p>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary w-full mt-8 md:mt-10 rounded-xl md:rounded-2xl border-none font-black uppercase italic text-sm">
                        Update Profile
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MyProfile;