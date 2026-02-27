import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "./CountdownTimer";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const ContestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: contest = {}, isLoading, isError } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    
    if (isError || !contest.contestName) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center font-outfit">
                <h2 className="text-2xl font-black text-secondary uppercase">Contest Not Found</h2>
                <Link to="/" className="btn btn-primary mt-4 rounded-xl">Back to Home</Link>
            </div>
        );
    }

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
        winnerImage,
        category
    } = contest;

    // ডেডলাইন চেক লজিক
    const isDeadlineOver = contestDeadline ? new Date() > new Date(contestDeadline) : false;

    return (
        <div className="max-w-7xl mx-auto my-16 p-6 font-outfit">
            <div className="card lg:card-side bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 rounded-[2.5rem]">
                
                {/* Image Section */}
                <figure className="lg:w-1/2 relative group">
                    <img 
                        src={image || "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000"} 
                        alt={contestName} 
                        className="h-full w-full object-cover min-h-[500px] transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                         <span className="badge bg-white/90 backdrop-blur-md text-primary font-black border-none px-4 py-3 shadow-lg uppercase text-[10px] tracking-widest">
                            {category || 'General'}
                        </span>
                    </div>

                    {isDeadlineOver && !winnerName && (
                        <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm flex items-center justify-center z-10">
                            <div className="text-center">
                                <span className="text-white text-4xl font-black uppercase tracking-[0.3em] border-y-4 py-4 border-white inline-block">
                                    Registration Ended
                                </span>
                            </div>
                        </div>
                    )}
                </figure>
                
                {/* Content Section */}
                <div className="card-body lg:w-1/2 p-10 lg:p-14 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Featured Contest</p>
                        </div>
                        <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest text-center">Enrolled</p>
                            <p className="text-xl font-black text-secondary text-center leading-none mt-1">{participationCount || 0}</p>
                        </div>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black text-secondary leading-tight mb-4 italic uppercase">
                        {contestName}
                    </h2>
                    
                    {/* Countdown Section */}
                    <div className="mb-8 bg-indigo-50/50 p-6 rounded-3xl border border-primary/10">
                        <p className="text-[10px] font-black text-primary uppercase mb-3 tracking-[0.2em]">Registration Deadline In:</p>
                        {contestDeadline ? (
                            <CountdownTimer deadline={contestDeadline} />
                        ) : (
                            <span className="text-red-500 font-bold">No Fixed Deadline</span>
                        )}
                    </div>

                    <p className="text-slate-500 font-medium leading-relaxed mb-8 text-lg">
                        {contestDescription}
                    </p>
                    
                    {/* Price & Prize Section */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 group hover:border-primary/30 transition-all">
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-widest">Registration Fee</p>
                            <p className="text-3xl font-black text-primary">${price}</p>
                        </div>
                        <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 group hover:border-emerald-300 transition-all">
                            <p className="text-[10px] text-emerald-600/60 uppercase font-black mb-1 tracking-widest">Grand Prize Money</p>
                            <p className="text-3xl font-black text-emerald-500">${prizeMoney}</p>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="card-actions mt-auto">
                        {winnerName ? (
                            <div className="w-full p-6 bg-secondary text-white rounded-[2rem] flex items-center gap-5 shadow-2xl relative overflow-hidden group">
                                <div className="absolute right-0 top-0 opacity-10 text-8xl font-black -rotate-12 translate-x-4 -translate-y-4">🏆</div>
                                <div className="avatar ring-4 ring-primary ring-offset-2 ring-offset-secondary rounded-full relative z-10">
                                    <div className="w-16 rounded-full">
                                        <img src={winnerImage || "https://i.ibb.co/mR79YyZ/user.png"} alt="winner" />
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic mb-1">Our Champion</p>
                                    <p className="text-2xl font-black">{winnerName}</p>
                                </div>
                            </div>
                        ) : isDeadlineOver ? (
                            <button disabled className="btn btn-disabled btn-block rounded-2xl h-20 text-sm font-black uppercase tracking-widest">
                                Registration Closed
                            </button>
                        ) : (
                            <Link 
                                to={user ? `/payment/${_id}` : "/auth/login"} 
                                state={{ price: price, name: contestName, from: `/contest/${_id}` }} 
                                className="w-full"
                            >
                                <button className="btn btn-primary btn-block rounded-2xl text-white font-black text-sm uppercase tracking-[0.2em] h-20 shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all">
                                    Confirm Enrollment
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