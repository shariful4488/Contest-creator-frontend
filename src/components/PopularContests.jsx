import { useQuery } from "@tanstack/react-query";
import ContestCard from "./ContestCard";
import useAxiosPublic from "../hooks/useAxios";
import { Link } from "react-router";


const PopularContests = ({ searchText }) => {
    const axiosPublic = useAxiosPublic();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['popular-contests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-contests'); 
            return res.data;
        }
    });

    const filteredContests = contests.filter(contest => 
        contest.contestCategory.toLowerCase().includes(searchText.toLowerCase())
    );

    
    const popularDisplay = filteredContests
        .sort((a, b) => b.attemptedCount - a.attemptedCount)
        .slice(0, 6);

    if (isLoading) return <div className="text-center py-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="py-20 container mx-auto px-4">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-black text-secondary uppercase italic">
                    Popular <span className="text-primary">Contests</span>
                </h2>
                <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            {popularDisplay.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularDisplay.map(contest => (
                        <ContestCard key={contest._id} contest={contest} />
                    ))}
                </div>
            ) : (
               
                <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed">
                    <h3 className="text-2xl font-bold text-slate-400 uppercase">
                        No Contests found for "{searchText}"
                    </h3>
                    <p className="text-slate-400 mt-2">Try searching for another category like 'Coding', 'Design' or 'Marketing'.</p>
                </div>
            )}

            <div className="text-center mt-12">
                <Link to="/all-contests" className="btn btn-primary px-10 rounded-full font-bold uppercase italic shadow-lg">
                    Show All Contests
                </Link>
            </div>
        </div>
    );
};

export default PopularContests;