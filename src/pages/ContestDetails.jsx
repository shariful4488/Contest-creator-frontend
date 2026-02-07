import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "./CountdownTimer";


const ContestDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;


    const {
        _id,
        contestName,
        image,
        contestDescription,
        price,
        prizeMoney,
        participationCount,
        contestDeadline,
        winnerName,
        winnerImage
    } = contest;

    const isDeadlineOver = contestDeadline ? new Date() > new Date(contestDeadline) : false;

    return (
        <div className="max-w-6xl mx-auto my-12 p-5 font-outfit">
            <div className="card lg:card-side bg-white shadow-2xl overflow-hidden border border-slate-100 rounded-3xl">
                
                <figure className="lg:w-1/2 relative">
                    <img src={image} alt={contestName} className="h-full w-full object-cover min-h-[450px]" />
                    {isDeadlineOver && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                            <span className="text-white text-3xl font-black uppercase tracking-widest border-4 p-4 border-white -rotate-12">
                                Terminated
                            </span>
                        </div>
                    )}
                </figure>
                
                <div className="card-body lg:w-1/2 p-8 lg:p-12">
                    <div className="flex justify-between items-start mb-4">
                        <span className="badge badge-primary badge-outline font-bold px-4 py-3 italic">
                            Premium Contest
                        </span>
                        <div className="text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Participants</p>
                            <p className="text-2xl font-black text-secondary">{participationCount || 0}</p>
                        </div>
                    </div>

                    <h2 className="text-4xl font-black text-secondary leading-tight mb-2">{contestName}</h2>
                    
                    <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Time Remaining</p>
                        {contestDeadline ? (
                            <CountdownTimer deadline={contestDeadline} />
                        ) : (
                            <span className="text-red-500 font-bold">No deadline set</span>
                        )}
                    </div>

                    <p className="text-slate-500 leading-relaxed mb-8">{contestDescription}</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Entry Fee</p>
                            <p className="text-2xl font-black text-primary">${price}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Prize Pool</p>
                            <p className="text-2xl font-black text-emerald-500">${prizeMoney}</p>
                        </div>
                    </div>

                    <div className="card-actions">
                        {winnerName ? (
                            <div className="w-full p-5 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-center gap-4">
                                <div className="avatar ring ring-yellow-400 ring-offset-2 rounded-full">
                                    <div className="w-14 rounded-full">
                                        <img src={winnerImage || "https://i.ibb.co/mR79YyZ/user.png"} alt="winner" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest italic">👑 Champion 👑</p>
                                    <p className="text-xl font-bold text-secondary">{winnerName}</p>
                                </div>
                            </div>
                        ) : isDeadlineOver ? (
                            <button disabled className="btn btn-disabled btn-block rounded-2xl h-16 text-lg font-bold uppercase">
                                Registration Closed
                            </button>
                        ) : (
                            <Link 
                                to={`/payment/${_id}`} 
                                state={{ price: price, name: contestName }} 
                                className="w-full"
                            >
                                <button className="btn btn-primary btn-block rounded-2xl text-white font-bold text-lg shadow-lg shadow-primary/30 h-16 hover:scale-[1.01] active:scale-95 transition-all">
                                    Register Now
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;