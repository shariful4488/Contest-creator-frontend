import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaStar, FaTrophy } from "react-icons/fa";

const MyWinnings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: winnings = [], isLoading } = useQuery({
        queryKey: ['my-winnings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-winnings/${user?.email}`);
            return res.data;
        }
    });

    const totalPrize = winnings.reduce((sum, item) => sum + parseFloat(item.contestPrize || 0), 0);

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-100">
            <span className="loading loading-infinity loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto p-4 md:p-10 font-outfit">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6 bg-slate-50 p-6 rounded-[2rem]">
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-black text-secondary italic uppercase tracking-tighter">
                        My <span className="text-primary">Victories</span>
                    </h2>
                    <p className="text-slate-500 font-medium mt-2">Success is where preparation and opportunity meet.</p>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100 flex-1 text-center">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Wins</p>
                        <p className="text-2xl font-black text-secondary">{winnings.length}</p>
                    </div>
                    <div className="bg-primary px-8 py-4 rounded-2xl shadow-lg shadow-primary/20 flex-1 text-center">
                        <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Total</p>
                        <p className="text-2xl font-black text-white">${totalPrize}</p>
                    </div>
                </div>
            </div>

            {winnings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                    {winnings.map((contest) => (
                        <div 
                            key={contest._id} 
                            className="flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group h-full"
                        >
                            <div className="relative w-full pt-[60%] overflow-hidden">
                                <img 
                                    src={contest.image} 
                                    alt={contest.contestName} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-6">
                                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        <FaTrophy className="inline mr-1" /> Winner
                                    </span>
                                </div>
                            </div>

                           
                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
                                        {contest.contestCategory}
                                    </span>
                                    <span className="text-yellow-500 text-xs"><FaStar className="inline mr-1" /> 5.0</span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 leading-tight group-hover:text-primary transition-colors">
                                    {contest.contestName}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {contest.contestDescription}
                                </p>
                                
                                <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                                    <div className="bg-slate-50 px-4 py-2 rounded-xl">
                                        <p className="text-[9px] uppercase font-bold text-slate-400">Prize Money</p>
                                        <p className="text-xl font-black text-secondary italic">${contest.contestPrize}</p>
                                    </div>
                                    <button className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center group-hover:bg-primary transition-all duration-300 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-6">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl grayscale">
                        <FaTrophy className="text-slate-300" /> 
                    </div>
                    <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Trophies Collected</h3>
                    <p className="text-slate-400 mt-2 max-w-sm mx-auto text-sm">Win a contest to see your name on the victory board!</p>
                </div>
            )}
        </div>
    );
};

export default MyWinnings;