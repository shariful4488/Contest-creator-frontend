import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers, FaLayerGroup, FaDollarSign } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const chartData = [
        { name: 'Users', value: stats.users || 0 },
        { name: 'Contests', value: stats.contests || 0 },
        { name: 'Revenue', value: stats.revenue || 0 }
    ];

    const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

    return (
        <div className="animate-fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-black text-secondary uppercase italic">Executive <span className="text-primary">Overview</span></h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Real-time platform analytics and performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100 flex items-center gap-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-500 text-2xl"><FaUsers /></div>
                    <div>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Total Users</p>
                        <h3 className="text-3xl font-black text-indigo-600 leading-none">{stats.users || 0}</h3>
                    </div>
                </div>

                <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100 flex items-center gap-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-500 text-2xl"><FaLayerGroup /></div>
                    <div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Total Contests</p>
                        <h3 className="text-3xl font-black text-emerald-600 leading-none">{stats.contests || 0}</h3>
                    </div>
                </div>

                <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100 flex items-center gap-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-amber-500 text-2xl"><FaDollarSign /></div>
                    <div>
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Revenue</p>
                        <h3 className="text-3xl font-black text-amber-600 leading-none">${stats.revenue || 0}</h3>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-secondary uppercase italic mb-8">Growth Analytics</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                            <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;