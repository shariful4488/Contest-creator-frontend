import { NavLink, Outlet } from "react-router";
import { FaHome, FaUsers, FaFolderPlus, FaAddressCard, FaTrophy, FaUserCircle } from "react-icons/fa";
import useRole from "../../hooks/useRole";


const Dashboard = () => {
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) {
        return <div className="min-h-screen flex justify-center items-center font-black text-primary">LOADING DASHBOARD...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-outfit">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-secondary p-6 text-white shadow-xl min-h-screen sticky top-0">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase">
                        Contest<span className="text-primary">Hub</span>
                    </h2>
                    <div className="badge badge-primary badge-outline text-[10px] font-bold mt-2 uppercase tracking-widest px-3 py-2">
                        {role} Panel
                    </div>
                </div>

                <ul className="space-y-3 font-bold uppercase text-[11px] tracking-widest">
                    {/* --- Admin Routes --- */}
                    {role === 'admin' && (
                        <>
                            <p className="text-slate-500 text-[10px] mb-2 ml-2">Administration</p>
                            <li>
                                <DashboardLink to="/dashboard/manage-users" icon={<FaUsers />} label="Manage Users" />
                            </li>
                            <li>
                                <DashboardLink to="/dashboard/manage-contests" icon={<FaAddressCard />} label="Manage Contests" />
                            </li>
                        </>
                    )}

                    {/* --- Manager / Creator Routes --- */}
                    {role === 'creator' && (
                        <>
                            <p className="text-slate-500 text-[10px] mb-2 ml-2">Management</p>
                            <li>
                                <DashboardLink to="/dashboard/add-contest" icon={<FaFolderPlus />} label="Add Contest" />
                            </li>
                            <li>
                                <DashboardLink to="/dashboard/myCreated-contests" icon={<FaAddressCard />} label="My Contests" />
                            </li>
                        </>
                    )}

                    {/* --- Normal User Routes --- */}
                    {role === 'user' && (
                        <>
                            <p className="text-slate-500 text-[10px] mb-2 ml-2">User Menu</p>
                            <li>
                                <DashboardLink to="/dashboard/my-participated" icon={<FaTrophy />} label="My Participations" />
                            </li>
                            <li>
                                <DashboardLink to="/dashboard/my-winning" icon={<FaTrophy />} label="My Winnings" />
                            </li>
                        </>
                    )}

                    <div className="divider bg-white/5 h-[1px] my-6"></div>

                    
                    <li>
                        <DashboardLink to="/" icon={<FaHome />} label="Back to Home" />
                    </li>
                    <li>
                        <DashboardLink to="/dashboard/profile" icon={<FaUserCircle />} label="My Profile" />
                    </li>
                </ul>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-12">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[80vh]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};


const DashboardLink = ({ to, icon, label }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive ? "bg-primary text-secondary" : "hover:bg-white/5 text-slate-300"
            }`
        }
    >
        <span className="text-lg">{icon}</span> {label}
    </NavLink>
);

export default Dashboard;