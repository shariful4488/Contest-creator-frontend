import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ContestCard from "../components/ContestCard";
import useAxiosPublic from "../hooks/useAxios";
import { FaSearch, FaChevronLeft, FaChevronRight, FaSortAmountDown } from "react-icons/fa";
import SkeletonCard from "../components/SkeletonCard";

const ExploreContests = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState(''); 
    const [currentPage, setCurrentPage] = useState(0);
    const size = 6; 
    
    const categories = [
        'All', 'Image Design', 'Article Writing', 'Marketing', 
        'Gaming', 'Photography', 'Web Design', 'Video Editing', 'Coding'
    ];

    const { data: contestsData = {}, isLoading } = useQuery({
        queryKey: ['all-contests', search, category, sort, currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-contests`, {
                params: { search, category, sort, page: currentPage, size }
            });
            return res.data;
        }
    });

    const contests = contestsData.contests || [];
    const totalPages = contestsData.totalPages || 0;

    const handleCategoryChange = (cat) => {
        setCategory(cat);
        setCurrentPage(0);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 font-outfit min-h-screen">
            <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase italic tracking-tight">
                    Explore <span className="text-primary">Contests</span>
                </h2>
                <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-6 mb-12">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full lg:max-w-xl group">
                        <input 
                            type="text"
                            className="input input-bordered w-full pl-12 h-14 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 border-slate-200" 
                            placeholder="Search by contest name..." 
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(0);
                            }}
                        />
                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary" />
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <FaSortAmountDown className="text-primary hidden sm:block" />
                        <select 
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value);
                                setCurrentPage(0);
                            }}
                            className="select select-bordered rounded-2xl h-14 font-bold text-secondary w-full lg:w-48 shadow-sm"
                        >
                            <option value="">Sort By Price</option>
                            <option value="desc">High to Low</option>
                            <option value="asc">Low to High</option>
                        </select>
                    </div>
                </div>
                
                {/* Categories */}
                <div className="flex overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:justify-center">
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 w-max">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all
                                    ${category === cat ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {isLoading ? (
                    [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
                ) : (
                    <>
                        {contests.length > 0 ? (
                            contests.map(contest => (
                                <div key={contest._id} className="hover:-translate-y-2 transition-transform duration-300">
                                    <ContestCard contest={contest} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 text-center py-24">
                                <p className="text-2xl font-black text-slate-300 uppercase italic">No Contests Found</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-3 mt-16">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className="btn btn-circle btn-outline border-slate-200 text-slate-500 hover:bg-primary hover:text-white"
                    >
                        <FaChevronLeft />
                    </button>
                    
                    <div className="flex gap-2">
                        {[...Array(totalPages).keys()].map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`btn btn-circle shadow-sm ${currentPage === page ? 'btn-primary text-white' : 'btn-ghost text-slate-500'}`}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={currentPage === totalPages - 1}
                        className="btn btn-circle btn-outline border-slate-200 text-slate-500 hover:bg-primary hover:text-white"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExploreContests;