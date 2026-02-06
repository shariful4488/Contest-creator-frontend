import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ContestCard from "../components/ContestCard";
import useAxiosPublic from "../hooks/useAxios";


const ExploreContests = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    // ক্যাটাগরি লিস্ট
    const categories = ['All', 'Business', 'Medical', 'Writing', 'Gaming', 'Design'];

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['all-contests', search, category],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-contests?search=${search}&category=${category}`);
            return res.data;
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 font-outfit">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-secondary uppercase italic">
                    Explore <span className="text-primary">Contests</span>
                </h2>
                <p className="text-slate-500 mt-2">Find the best contests and showcase your talent</p>
            </div>

            {/* Search & Filter Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                {/* Tabs for Categories */}
                <div className="tabs tabs-boxed bg-white p-2 shadow-sm border">
                    {categories.map(cat => (
                        <a 
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`tab transition-all ${category === cat ? 'tab-active !bg-primary !text-white' : ''}`}
                        >
                            {cat}
                        </a>
                    ))}
                </div>

                {/* Search Input */}
                <div className="join w-full md:w-96 shadow-sm">
                    <input 
                        className="input input-bordered join-item w-full focus:outline-none" 
                        placeholder="Search by name..." 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-primary join-item text-white px-8">Search</button>
                </div>
            </div>

            {/* Contests Grid */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contests.length > 0 ? (
                        contests.map(contest => (
                            <ContestCard key={contest._id} contest={contest} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-400">
                            <p className="text-2xl font-bold">No contests found!</p>
                            <p>Try changing the category or search keyword.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExploreContests;