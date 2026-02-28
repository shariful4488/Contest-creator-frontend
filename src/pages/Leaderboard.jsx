import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxios";
import { FaChevronLeft, FaChevronRight, FaTrophy } from "react-icons/fa";

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
    <div className="flex justify-center p-20">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8 font-outfit">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-secondary italic uppercase">
          Our <span className="text-primary">Hall of Fame</span>
        </h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-[40px] shadow-2xl border border-slate-50">
        <table className="table w-full border-collapse">
          <thead className="bg-slate-900 text-white border-none">
            <tr>
              <th className="py-6 pl-10 rounded-tl-[40px]">Rank</th>
              <th>User Name</th>
              <th className="text-center">Contests Won</th>
              <th className="rounded-tr-[40px]">Winning Badge</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {winners.map((winner, index) => (
              <tr key={winner._id} className="hover:bg-slate-50 transition-all border-b border-slate-100">
                <td className="pl-10">{currentPage * size + index + 1}</td>
                <td>{winner.name}</td>
                <td className="text-center">{winner.winCount}</td>
                <td>
                  {index === 0 ? (
                    <span className="badge badge-warning p-3 font-bold"><FaTrophy className="mr-2" /> Ultimate Champion</span>
                  ) : index === 1 ? (
                    <span className="badge badge-ghost p-3 font-bold"><FaTrophy className="mr-2" /> Silver Medalist</span>
                  ) : index === 2 ? (
                    <span className="badge badge-ghost p-3 font-bold"><FaTrophy className="mr-2" /> Bronze Winner</span>
                  ) : (
                    <span className="badge badge-outline p-3 font-medium">Contender</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="btn btn-outline"
          >
            <FaChevronLeft />
          </button>
          {[...Array(totalPages).keys()].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="btn btn-outline"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
