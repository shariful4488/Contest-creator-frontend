import { NavLink, Outlet } from "react-router";
import { FaHome, FaUsers, FaFolderPlus, FaAddressCard, FaTrophy, FaUserCircle, FaBars } from "react-icons/fa";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) {
        return <div className="min-h-screen flex justify-center items-center font-black text-primary italic uppercase tracking-widest">Loading Dashboard...</div>;
    }

    return (
        <div className="drawer lg:drawer-open font-outfit">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col bg-slate-50 min-h-screen overflow-x-hidden">
                {/* Mobile Header */}
                <div className="flex items-center justify-between bg-secondary text-white p-4 lg:hidden shadow-md">
                    <h2 className="text-xl font-black italic tracking-tighter uppercase">
                        Contest<span className="text-primary">Hub</span>
                    </h2>
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button">
                        <FaBars className="text-xl" />
                    </label>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-8 lg:p-12 w-full">
                    <div className="max-w-6xl mx-auto bg-white rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 shadow-sm border border-slate-100 min-h-[85vh]">
                        <Outlet />
                    </div>
                </main>
            </div> 

            {/* Sidebar */}
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                <div className="w-72 min-h-full bg-secondary text-white p-6 shadow-2xl flex flex-col">
                    {/* Logo Area */}
                    <div className="mb-10 text-left">
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase">
                            Contest<span className="text-primary">Hub</span>
                        </h2>
                        <div className="badge badge-primary badge-outline text-[10px] font-bold mt-2 uppercase tracking-widest px-3 py-2 rounded-lg">
                            {role} Panel
                        </div>
                    </div>

                    <ul className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                        {/* --- Admin Routes --- */}
                        {role === 'admin' && (
                            <>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2 ml-2">Administration</p>
                                <li><DashboardLink to="/dashboard/manage-users" icon={<FaUsers />} label="Manage Users" /></li>
                                <li><DashboardLink to="/dashboard/manage-contests" icon={<FaAddressCard />} label="Manage Contests" /></li>
                            </>
                        )}

                        {/* --- Manager / Creator Routes --- */}
                        {role === 'creator' && (
                            <>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2 ml-2">Management</p>
                                <li><DashboardLink to="/dashboard/add-contest" icon={<FaFolderPlus />} label="Add Contest" /></li>
                                <li><DashboardLink to="/dashboard/myCreated-contests" icon={<FaAddressCard />} label="My Contests" /></li>
                            </>
                        )}

                        {/* --- Normal User Routes --- */}
                        {role === 'user' && (
                            <>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2 ml-2">User Menu</p>
                                <li><DashboardLink to="/dashboard/my-participated" icon={<FaTrophy />} label="My Participations" /></li>
                                <li><DashboardLink to="/dashboard/my-winnings" icon={<FaTrophy />} label="My Winnings" /></li>
                            </>
                        )}

                        <div className="divider bg-white/5 h-[1px] my-6 opacity-20"></div>

                        {/* --- Shared Routes --- */}
                        <li><DashboardLink to="/" icon={<FaHome />} label="Back to Home" /></li>
                        <li><DashboardLink to="/dashboard/profile" icon={<FaUserCircle />} label="My Profile" /></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const DashboardLink = ({ to, icon, label }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all duration-300 group ${
                isActive 
                ? "bg-primary text-secondary shadow-lg shadow-primary/20 scale-[1.02]" 
                : "hover:bg-white/5 text-slate-400 hover:text-white"
            }`
        }
    >
        <span className="text-lg transition-transform group-hover:scale-110">{icon}</span> 
        {label}
    </NavLink>
);

export default Dashboard;