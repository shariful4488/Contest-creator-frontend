import { useQuery } from "@tanstack/react-query";
import ContestCard from "./ContestCard";
import { Link } from "react-router"; 
import useAxiosSecure from "../hooks/useAxiosSecure";

const PopularContests = () => {
    const axiosPublic = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['popular-contests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popular-contests');
            return res.data;
        }
    });

   
    if (isLoading) return (
        <div className="flex justify-center items-center py-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="ml-4 font-black text-secondary tracking-widest uppercase">Loading Challenges...</span>
        </div>
    );

    return (
        <section className="py-24 bg-slate-50 font-outfit">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-secondary tracking-tighter uppercase italic">
                            Popular <span className="text-primary">Contests</span>
                        </h2>
                        <div className="h-1.5 w-24 bg-primary mt-2 rounded-full"></div> {/* ছোট ডিজাইন এলিমেন্ট */}
                        <p className="text-slate-500 font-medium mt-4 text-lg">Most participated competitions right now</p>
                    </div>
                    
                    {/* View All Button with Link */}
                    <Link to="/all-contests">
                        <button className="text-sm font-bold text-primary hover:text-secondary transition-colors uppercase tracking-widest flex items-center gap-2 border-b-2 border-primary hover:border-secondary pb-1">
                            View All Contests <span>→</span>
                        </button>
                    </Link>
                </div>

                {/* Contests Grid */}
                {contests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {contests.map(contest => (
                            <ContestCard key={contest._id} contest={contest} />
                        ))}
                    </div>
                ) : (
                    // যদি কোনো ডাটা না থাকে (Empty State)
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">No Popular Contests Found</p>
                        <p className="text-slate-400 text-sm">Check back later or explore other categories.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PopularContests;