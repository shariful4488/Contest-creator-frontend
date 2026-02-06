import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";


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
        description,
        contestPrice,
        prizeMoney,
        participationCount,
        deadline,
        winnerName
    } = contest;

    // চেক করা হচ্ছে ডেডলাইন শেষ হয়েছে কি না
    const isDeadlineOver = new Date() > new Date(deadline);

    return (
        <div className="max-w-6xl mx-auto my-12 p-5 font-outfit">
            <div className="card lg:card-side bg-white shadow-2xl overflow-hidden border border-slate-100 rounded-3xl">
                <figure className="lg:w-1/2 relative">
                    <img src={image} alt={contestName} className="h-full w-full object-cover min-h-[400px]" />
                    {isDeadlineOver && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-3xl font-bold uppercase tracking-widest border-4 p-4 border-white">Expired</span>
                        </div>
                    )}
                </figure>
                
                <div className="card-body lg:w-1/2 p-8 lg:p-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="badge badge-primary badge-outline font-bold px-4 py-3 italic">Premium Contest</span>
                        <div className="text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold">Participants</p>
                            <p className="text-xl font-black text-secondary">{participationCount || 0}</p>
                        </div>
                    </div>

                    <h2 className="text-4xl font-black text-secondary leading-tight mb-4">{contestName}</h2>
                    <p className="text-slate-500 leading-relaxed mb-8">{description}</p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Entry Fee</p>
                            <p className="text-2xl font-black text-primary">${contestPrice}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Prize</p>
                            <p className="text-2xl font-black text-green-500">${prizeMoney}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-8 text-slate-600 font-medium">
                        <span className="bg-red-50 text-red-500 p-2 rounded-lg text-sm font-bold">
                            Deadline: {new Date(deadline).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="card-actions">
                        {winnerName ? (
                            <div className="w-full p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
                                <div className="avatar">
                                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={contest.winnerImage || "https://i.ibb.co/mR79YyZ/user.png"} alt="winner" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-blue-400 uppercase">Winner Declared</p>
                                    <p className="text-lg font-bold text-secondary">{winnerName}</p>
                                </div>
                            </div>
                        ) : isDeadlineOver ? (
                            <button disabled className="btn btn-disabled btn-block rounded-2xl">Registration Closed</button>
                        ) : (
                            // পেমেন্ট পেজে নিয়ে যাওয়ার বাটন
                            <Link 
                                to={`/payment/${_id}`} 
                                state={{ price: contestPrice, name: contestName }} 
                                className="w-full"
                            >
                                <button className="btn btn-primary btn-block rounded-2xl text-white font-bold text-lg shadow-lg shadow-primary/30">
                                    Registration Now
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