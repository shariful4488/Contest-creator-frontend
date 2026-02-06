import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxios";
import { FaTrophy } from "react-icons/fa";


const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: winners = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/leaderboard');
            return res.data;
        }
    });

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
                <p className="text-slate-400 font-bold tracking-widest text-xs mt-2 uppercase">
                    Top Winners of ContestHub
                </p>
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
                                <td className="pl-10">
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-full font-black 
                                        ${index === 0 ? 'bg-yellow-400 text-white animate-bounce' : 
                                          index === 1 ? 'bg-slate-300 text-white' : 
                                          index === 2 ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {index + 1}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-4">
                                        <div className="avatar ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full overflow-hidden w-12 h-12">
                                            <img src={winner.photoURL || "https://i.ibb.co/3S46BvD/user.png"} alt={winner.name} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-secondary text-lg">{winner.name}</div>
                                            <div className="text-xs text-slate-400">{winner.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="badge badge-primary badge-lg py-5 px-6 font-black text-xl italic">
                                        {winner.winCount || 0}
                                    </div>
                                </td>
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
        </div>
    );
};

export default Leaderboard;