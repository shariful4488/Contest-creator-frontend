import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../hooks/useAxios";
import ContestCard from "./ContestCard";

const PopularContests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['popular-contests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popular-contests');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-20 font-black text-primary">LOADING CONTESTS...</div>;

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-black text-secondary tracking-tighter uppercase">
                            Popular <span className="text-primary">Contests</span>
                        </h2>
                        <p className="text-slate-500 font-medium mt-2">Most participated competitions right now</p>
                    </div>
                    <button className="hidden md:block text-sm font-bold text-primary hover:underline uppercase tracking-widest">
                        View All Contests →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contests.map(contest => (
                        <ContestCard key={contest._id} contest={contest} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularContests;