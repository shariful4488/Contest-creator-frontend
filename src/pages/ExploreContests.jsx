import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ContestCard from "../components/ContestCard";
import useAxiosPublic from "../hooks/useAxios";
import { FaSearch, FaChevronLeft, FaChevronRight, FaSortAmountDown, FaLayerGroup } from "react-icons/fa";
import SkeletonCard from "../components/SkeletonCard";

const ExploreContests = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const size = 6;

  const categories = ['All','Image Design','Article Writing','Marketing','Gaming','Photography','Web Design','Video Editing','Coding'];

  const { data: contestsData = {}, isLoading } = useQuery({
    queryKey: ['all-contests', search, category, sort, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get('/all-contests', {
        params: { search, category, sort, page: currentPage, size }
      });
      return res.data;
    }
  });

  const contests = contestsData.contests || [];
  const totalPages = contestsData.totalPages || 0;

  useEffect(() => { setCurrentPage(1); }, [search, category, sort]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-outfit pb-20">
      <div className="bg-gradient-to-r from-secondary to-slate-900 pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">
            Find Your Next <span className="text-primary">Challenge</span>
          </h1>
          <div className="relative group max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search contests (e.g. Logo Design)..." 
              className="w-full h-16 rounded-2xl pl-14 pr-6 text-lg focus:ring-4 focus:ring-primary/30 outline-none shadow-2xl transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-[2rem] shadow-xl border border-white flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-secondary font-bold text-sm">
                <FaLayerGroup className="text-primary"/> Category
             </div>
             <select 
                onChange={(e) => setCategory(e.target.value)}
                className="select select-ghost font-bold text-secondary focus:bg-transparent"
             >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-secondary font-bold text-sm">
                <FaSortAmountDown className="text-primary"/> Sort By
             </div>
             <select 
                onChange={(e) => setSort(e.target.value)}
                className="select select-ghost font-bold text-secondary focus:bg-transparent"
             >
                <option value="">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
             </select>
          </div>
        </div>

        {/* Contest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(size)].map((_, i) => <SkeletonCard key={i} />)
          ) : contests.length > 0 ? (
            contests.map(contest => (
              <div key={contest._id} className="hover:-translate-y-2 transition-transform duration-300">
                <ContestCard contest={contest} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] shadow-inner">
               <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" className="w-24 mx-auto mb-4 opacity-20" alt="" />
               <p className="text-slate-400 font-bold uppercase tracking-widest">No Contests Found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-20">
            <div className="flex items-center bg-white p-2 rounded-2xl shadow-lg border border-slate-100 gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-ghost btn-square text-secondary disabled:opacity-30"
              ><FaChevronLeft /></button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-square border-none ${currentPage === i + 1 ? 'btn-primary text-white shadow-lg shadow-primary/30' : 'btn-ghost text-slate-400'}`}
                >{i + 1}</button>
              ))}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-ghost btn-square text-secondary disabled:opacity-30"
              ><FaChevronRight /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreContests;