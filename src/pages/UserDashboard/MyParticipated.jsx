import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";


const MyParticipated = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: participations = [] } = useQuery({
        queryKey: ['participated', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/participated/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="font-outfit">
            <h2 className="text-3xl font-black text-secondary uppercase italic mb-8">
                My <span className="text-primary">Participations</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {participations.map((item) => (
                    <div key={item._id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <img src={item.contestImage} className="h-40 w-full object-cover rounded-2xl mb-4" alt="" />
                        <h3 className="text-lg font-bold text-secondary mb-2">{item.contestName}</h3>
                        <div className="flex justify-between items-center mt-4">
                            <span className="badge badge-primary font-bold text-[10px] uppercase p-3">Paid</span>
                            <span className="text-xs font-bold text-slate-400 italic">Deadline: {item.deadline}</span>
                        </div>
                    </div>
                ))}
            </div>

            {participations.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-400 font-bold italic">You haven't participated in any contests yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyParticipated;