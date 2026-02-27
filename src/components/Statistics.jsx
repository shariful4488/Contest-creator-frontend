import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup"; 
import useAxiosPublic from "../hooks/useAxios";

const Statistics = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosPublic.get('/get-stats');
      return res.data;
    }
  });

  const statData = [
    {
      id: 1,
      label: "Total Participations",
      value: stats.totalParticipants || 0, 
      suffix: "+",
      color: "text-primary"
    },
    {
      id: 2,
      label: "Active Contests",
      value: stats.totalContests || 0,
      suffix: "",
      color: "text-secondary"
    },
    {
      id: 3,
      label: "Winners Celebrated",
      value: stats.totalWinners || 0,
      suffix: "+",
      color: "text-primary"
    }
  ];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-32 skeleton rounded-[2.5rem] bg-base-200"></div>
      </div>
    );
  }

  return (
    <section className="relative z-30 max-w-6xl mx-auto px-4 -mt-12 md:-mt-16 font-outfit">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-50">
        {statData.map((stat) => (
          <div 
            key={stat.id} 
            className="p-8 md:p-12 text-center hover:bg-slate-50 transition-all duration-300 group"
          >
            <h3 className={`text-4xl md:text-5xl font-black italic mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
              <CountUp 
                end={stat.value} 
                duration={3} 
                enableScrollSpy 
                scrollSpyOnce
              />
              {stat.suffix}
            </h3>
            <p className="text-slate-500 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
