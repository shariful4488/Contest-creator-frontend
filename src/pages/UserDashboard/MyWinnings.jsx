import { useQuery } from "@tanstack/react-query";
import { FaCrown, FaTrophy } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyWinnings = () => {
    const axiosPublic = useAxiosSecure();
    const { user } = useAuth();

    const { data: winnings = [], isLoading } = useQuery({
        queryKey: ['my-winnings', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-winnings/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-20 font-bold">Checking for trophies...</div>;

    return (
        <div className="font-outfit">
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-black text-secondary uppercase italic flex items-center gap-3">
                    <FaCrown className="text-yellow-500" /> My <span className="text-primary">Winnings</span>
                </h2>
                <p className="text-slate-400 font-medium">Congratulations on your achievements!</p>
            </div>

            {winnings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {winnings.map((contest) => (
                        <div key={contest._id} className="relative group bg-white p-6 rounded-[2rem] border-2 border-slate-50 shadow-sm hover:border-primary/20 transition-all duration-500">
                            {/* Trophy Icon Badge */}
                            <div className="absolute -top-4 -right-4 bg-yellow-400 p-3 rounded-2xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                                <FaTrophy className="text-white text-xl" />
                            </div>

                            <img 
                                src={contest.contestImage} 
                                className="h-44 w-full object-cover rounded-[1.5rem] mb-5 shadow-inner" 
                                alt={contest.contestName} 
                            />
                            
                            <h3 className="text-xl font-black text-secondary mb-2 line-clamp-1 italic uppercase">
                                {contest.contestName}
                            </h3>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">Prize Money:</span>
                                    <span className="text-green-600 text-lg">${contest.prizeMoney}</span>
                                </div>
                                
                                <div className="divider my-0"></div>
                                
                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                    <span className="text-slate-400 italic">Category:</span>
                                    <span className="text-secondary">{contest.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="min-h-[50vh] flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <div className="bg-slate-200 p-6 rounded-full mb-4">
                        <FaTrophy className="text-5xl text-slate-400" />
                    </div>
                    <h3 className="text-xl font-black text-slate-400 uppercase italic">No Trophies Yet</h3>
                    <p className="text-slate-400 font-medium">Keep participating and show your talent!</p>
                </div>
            )}
        </div>
    );
};

export default MyWinnings;