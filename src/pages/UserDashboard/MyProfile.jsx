import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['user-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="max-w-[1440px] mx-auto p-4 sm:p-6 md:p-10 font-outfit">
            
            {/* --- Header Section --- */}
            <div className="mb-8 md:mb-12 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary uppercase italic tracking-tighter">
                    My <span className="text-primary">Profile</span>
                </h2>
                <div className="w-16 h-1 bg-primary mt-2 mx-auto md:mx-0 rounded-full"></div>
            </div>

            {/* --- Main Grid Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                
                {/* Left Side: Profile Info (4/12 Column) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center h-full">
                        <div className="relative group">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-4 ring-primary ring-offset-4 overflow-hidden mx-auto transition-transform group-hover:scale-105 duration-300">
                                <img 
                                    src={user?.photoURL || "https://i.ibb.co/3S46BvD/user.png"} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-sm"></div>
                        </div>
                        
                        <div className="mt-6 w-full">
                            <h3 className="text-xl sm:text-2xl font-black text-secondary truncate px-2">
                                {user?.displayName}
                            </h3>
                            <p className="text-slate-400 font-medium text-sm truncate mb-6">
                                {user?.email}
                            </p>
                            
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Account Role</p>
                                <span className="badge badge-secondary badge-outline font-black px-5 py-3">
                                    CONTESTANT
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Stats & Metrics (8/12 Column) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    
                    {/* Winning Stats Card (Dark Theme) */}
                    <div className="bg-secondary rounded-[2rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-slate-200">
                        {/* Background Decoration */}
                        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
                        
                        <div className="relative flex flex-col sm:flex-row justify-between items-center gap-8">
                            <div className="text-center sm:text-left">
                                <h4 className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2">Achievement Summary</h4>
                                <h2 className="text-3xl sm:text-4xl font-black italic uppercase leading-none">
                                    Top <span className="text-primary">Performer</span>
                                </h2>
                                <p className="text-white/60 text-sm mt-4 max-w-xs leading-relaxed">
                                    You've shown incredible skill! Your wins place you among the elite participants.
                                </p>
                            </div>
                            
                            <div className="flex flex-col items-center bg-white/5 backdrop-blur-xl px-8 py-6 rounded-3xl border border-white/10 w-full sm:w-auto min-w-[140px]">
                                <span className="text-primary text-5xl sm:text-6xl font-black italic">
                                    {userData.winCount || 0}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest mt-2 text-white/70">
                                    Wins Total
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress & Performance Grid */}
                    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
                        <h4 className="text-secondary font-black uppercase text-lg mb-8 flex items-center gap-2">
                            <span className="w-2 h-6 bg-primary rounded-full"></span>
                            Performance Metrics
                        </h4>
                        
                        <div className="space-y-8">
                            {/* Metric 1 */}
                            <div className="w-full">
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Consistency</span>
                                    <span className="text-sm font-black text-primary italic">85%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[85%] rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(255,191,0,0.3)]"></div>
                                </div>
                            </div>
                            
                            {/* Metric 2 */}
                            <div className="w-full">
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Participation</span>
                                    <span className="text-sm font-black text-secondary italic">60%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                    <div className="bg-secondary h-full w-[60%] rounded-full transition-all duration-1000"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyProfile;