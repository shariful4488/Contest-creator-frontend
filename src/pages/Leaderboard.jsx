import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTrophy, FaMedal, FaCrown } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxios";

const Leaderboard = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const size = 10;

  const { data: leaderboardData = {}, isLoading } = useQuery({
    queryKey: ['leaderboard', currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get('/leaderboard', {
        params: { page: currentPage, size }
      });
      return res.data;
    }
  });

  const winners = leaderboardData.winners || [];
  const totalPages = leaderboardData.totalPages || 0;

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[600px]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-outfit">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-block p-2 px-4 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest mb-4">
          Top Performers
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-800 uppercase leading-tight">
          Hall of <span className="text-primary italic">Fame</span>
        </h2>
        <p className="text-slate-500 mt-4 max-w-xl mx-auto">
          Honoring our top contributors and winners who have consistently excelled in our contests.
        </p>
      </div>

      {currentPage === 0 && winners.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
          <div className="order-2 md:order-1 bg-white p-8 rounded-[30px] shadow-xl border-t-4 border-slate-300 text-center transform hover:scale-105 transition-all">
            <FaMedal className="text-slate-400 text-4xl mx-auto mb-4" />
            <h3 className="font-bold text-xl">{winners[1].name}</h3>
            <p className="text-slate-500 text-sm">Won {winners[1].winCount} Contests</p>
            <div className="mt-4 badge badge-ghost font-bold">Silver Medalist</div>
          </div>
          
          {/* 1st Place */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-yellow-50 to-white p-10 rounded-[40px] shadow-2xl border-t-8 border-yellow-400 text-center transform hover:scale-110 transition-all z-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <FaCrown className="text-8xl text-yellow-500 rotate-12" />
             </div>
            <FaCrown className="text-yellow-500 text-6xl mx-auto mb-4" />
            <h3 className="font-black text-2xl uppercase tracking-tight">{winners[0].name}</h3>
            <p className="text-yellow-700 font-bold">Won {winners[0].winCount} Contests</p>
            <div className="mt-6 badge badge-warning p-4 font-black">Ultimate Champion</div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 bg-white p-8 rounded-[30px] shadow-xl border-t-4 border-orange-300 text-center transform hover:scale-105 transition-all">
            <FaMedal className="text-orange-400 text-4xl mx-auto mb-4" />
            <h3 className="font-bold text-xl">{winners[2].name}</h3>
            <p className="text-slate-500 text-sm">Won {winners[2].winCount} Contests</p>
            <div className="mt-4 badge badge-ghost font-bold">Bronze Winner</div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-900">
                <th className="py-6 pl-10 text-white font-bold uppercase text-xs tracking-widest">Rank</th>
                <th className="text-white font-bold uppercase text-xs tracking-widest">User Details</th>
                <th className="text-center text-white font-bold uppercase text-xs tracking-widest">Victories</th>
                <th className="text-right pr-10 text-white font-bold uppercase text-xs tracking-widest">Recognition</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {winners.map((winner, index) => {
                const rank = currentPage * size + index + 1;
                return (
                  <tr key={winner._id} className="group hover:bg-slate-50 transition-all">
                    <td className="py-6 pl-10">
                      <span className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-sm
                        ${rank === 1 ? 'bg-yellow-400 text-white' : 
                          rank === 2 ? 'bg-slate-300 text-white' : 
                          rank === 3 ? 'bg-orange-300 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {rank}
                      </span>
                    </td>
                    <td className="font-bold text-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 uppercase">
                                {winner.name?.charAt(0)}
                            </div>
                            <span>{winner.name}</span>
                        </div>
                    </td>
                    <td className="text-center">
                        <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full font-bold text-sm">
                            {winner.winCount} Wins
                        </span>
                    </td>
                    <td className="text-right pr-10">
                      {rank === 1 ? (
                        <div className="flex items-center justify-end text-yellow-600 font-black italic text-xs uppercase gap-2">
                           Mastermind <FaCrown />
                        </div>
                      ) : rank <= 3 ? (
                        <div className="text-slate-400 font-bold text-xs uppercase">Elite Player</div>
                      ) : (
                        <div className="text-slate-300 font-medium text-xs uppercase">Pro Contender</div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <p className="text-sm font-medium text-slate-500">
                Showing Page <span className="text-slate-900 font-bold">{currentPage + 1}</span> of {totalPages}
            </p>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="btn btn-circle btn-outline border-slate-300 hover:bg-primary hover:border-primary disabled:opacity-30"
                >
                    <FaChevronLeft />
                </button>
                
                <div className="flex gap-1">
                    {[...Array(totalPages).keys()].map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-full font-bold transition-all
                                ${currentPage === page ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-200 text-slate-600'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="btn btn-circle btn-outline border-slate-300 hover:bg-primary hover:border-primary disabled:opacity-30"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;