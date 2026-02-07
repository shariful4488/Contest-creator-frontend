import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowRight, FaUsers, FaCheckCircle, FaClipboardList, FaInbox } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const ReviewContestList = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['review-contests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests?email=${user?.email}`);
            return res.data;
        }
    });
    const contestsWithSubmissions = contests.filter(contest => contest.participationCount > 0);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 font-outfit max-w-7xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-secondary uppercase italic leading-tight">
                        Pending <span className="text-primary">Reviews</span>
                    </h2>
                    <p className="text-slate-400 font-medium mt-1">Showing contests with active participant submissions</p>
                </div>
                <div className="badge badge-primary p-4 font-bold shadow-lg shadow-primary/20">
                    Action Needed: {contestsWithSubmissions.length}
                </div>
            </div>

            {contestsWithSubmissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {contestsWithSubmissions.map(contest => (
                        <div 
                            key={contest._id} 
                            className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                <img 
                                    src={contest.image || "https://via.placeholder.com/400x225"} 
                                    alt={contest.contestName}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-secondary text-[10px] font-bold uppercase rounded-lg shadow-sm">
                                        {contest.contestCategory}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="font-bold text-xl text-secondary mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                    {contest.contestName}
                                </h3>
                                
                                <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
                                    <FaClipboardList className="text-primary" />
                                    Review and select winner
                                </p>

                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl mb-6 border border-slate-100">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                                            <FaCheckCircle className="text-[8px]" /> {contest.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] uppercase font-bold text-slate-400">New Entries</span>
                                        <span className="text-xs font-bold text-secondary flex items-center gap-1">
                                            <FaUsers className="text-primary" /> {contest.participationCount}
                                        </span>
                                    </div>
                                </div>

                                <Link 
                                    to={`/dashboard/submission-review/${contest._id}`}
                                    className="mt-auto flex items-center justify-center gap-2 py-3 px-6 bg-secondary text-white rounded-xl font-bold hover:bg-primary transition-all duration-300 group/btn shadow-md"
                                >
                                    Review Submissions
                                    <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaInbox className="text-3xl text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">No Submissions to Review</h3>
                    <p className="text-slate-400 mt-1 max-w-xs mx-auto">When participants submit their tasks for your contests, they will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default ReviewContestList;