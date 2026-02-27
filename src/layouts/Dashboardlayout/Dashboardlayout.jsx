import { NavLink, Outlet, useLocation } from "react-router";
import { FaHome, FaUsers, FaFolderPlus, FaAddressCard, FaTrophy, FaUserCircle, FaBars, FaSignOutAlt, FaRocket, FaChartBar, FaTasks } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { useRef } from "react";

const Dashboard = () => {
    const [role, isRoleLoading] = useRole();
    const { logOut, user } = useAuth();
    const location = useLocation();
    const drawerCheckboxRef = useRef(null);

    const handleLogout = () => {
        logOut().catch((err) => console.log(err));
    };

    const closeDrawer = () => {
        if (drawerCheckboxRef.current) {
            drawerCheckboxRef.current.checked = false;
        }
    };

    if (isRoleLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
                <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                <div className="font-black text-primary italic uppercase tracking-[0.3em] animate-pulse text-center px-4">
                    Verifying Credentials & <br /> Initializing Secure Panel...
                </div>
            </div>
        );
    }

    const isDashboardRoot = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

    return (
        <div className="drawer lg:drawer-open font-outfit">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" ref={drawerCheckboxRef} />
            
            {/* --- Main Content --- */}
            <div className="drawer-content flex flex-col bg-slate-50 min-h-screen">
                
                {/* Mobile Header */}
                <div className="flex items-center justify-between bg-secondary text-white p-5 lg:hidden shadow-xl sticky top-0 z-40">
                    <h2 className="text-xl font-black italic tracking-tighter uppercase">
                        Contest<span className="text-primary">Hub</span>
                    </h2>
                    <label htmlFor="dashboard-drawer" className="btn btn-primary btn-sm drawer-button shadow-lg shadow-primary/20">
                        <FaBars className="text-white" />
                    </label>
                </div>

                <main className="flex-1 p-4 md:p-8 lg:p-10 w-full overflow-y-auto">
                    <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100 min-h-[85vh] relative">
                        
                        {isDashboardRoot ? (
                            <div className="animate-fade-in">
                                {/* Welcome Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-black text-secondary leading-none uppercase italic">
                                            Welcome, <span className="text-primary">{user?.displayName?.split(' ')[0] || 'Champion'}</span>!
                                        </h1>
                                        <p className="text-slate-400 mt-2 font-bold text-xs uppercase tracking-[0.2em]">
                                            Role: <span className="text-secondary bg-slate-100 px-3 py-1 rounded-lg ml-1">{role}</span>
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50 p-4 rounded-3xl border border-indigo-100 flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm text-primary text-xl">
                                            <FaChartBar />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                                            <p className="text-sm font-black text-secondary uppercase italic leading-none">System Online</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Placeholder for Overview Cards (Required by Nemesis) */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <StatsCard title="Total Contests" value="12" color="bg-primary" />
                                    <StatsCard title="My Participations" value="05" color="bg-secondary" />
                                    <StatsCard title="Total Earnings" value="$240" color="bg-emerald-500" />
                                </div>

                                <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                                    <FaRocket className="text-6xl text-primary animate-bounce mb-6" />
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-center max-w-xs">
                                        Select an action from the menu to start managing your hub.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </main>
            </div> 

            {/* --- Sidebar --- */}
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                <div className="w-80 min-h-full bg-secondary text-white p-8 shadow-2xl flex flex-col border-r border-white/5">
                    
                    <div className="mb-12 text-left px-2">
                        <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
                            Contest<span className="text-primary">Hub</span>
                        </h2>
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-primary text-[10px] font-black mt-4 uppercase tracking-[0.2em] px-4 py-2 rounded-xl">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            {role} Panel
                        </div>
                    </div>

                    <ul className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {/* --- Admin --- */}
                        {role === 'admin' && (
                            <>
                                <SectionLabel label="Administration" />
                                <li><DashboardLink to="/dashboard/manage-users" icon={<FaUsers />} label="Users Control" onClick={closeDrawer} /></li>
                                <li><DashboardLink to="/dashboard/manage-contests" icon={<FaTasks />} label="Global Contests" onClick={closeDrawer} /></li>
                            </>
                        )}

                        {/* --- Creator --- */}
                        {role === 'creator' && (
                            <>
                                <SectionLabel label="Creative Studio" />
                                <li><DashboardLink to="/dashboard/add-contest" icon={<FaFolderPlus />} label="Add Contest" onClick={closeDrawer} /></li>
                                <li><DashboardLink to="/dashboard/myCreated-contests" icon={<FaAddressCard />} label="My Studio" onClick={closeDrawer} /></li>
                                <li><DashboardLink to="/dashboard/submission-review-list" icon={<FaTrophy />} label="Submissions" onClick={closeDrawer} /></li>
                            </>
                        )}

                        {/* --- User --- */}
                        {role === 'user' && (
                            <>
                                <SectionLabel label="My Activity" />
                                <li><DashboardLink to="/dashboard/my-participated" icon={<FaTrophy />} label="Registered" onClick={closeDrawer} /></li>
                                <li><DashboardLink to="/dashboard/my-winnings" icon={<FaTrophy />} label="My Winnings" onClick={closeDrawer} /></li>
                            </>
                        )}

                        <div className="divider before:bg-white/5 after:bg-white/5 my-8 opacity-20"></div>

                        <SectionLabel label="System" />
                        <li><DashboardLink to="/" icon={<FaHome />} label="Back to Website" onClick={closeDrawer} /></li>
                        <li><DashboardLink to="/dashboard/profile" icon={<FaUserCircle />} label="My Profile" onClick={closeDrawer} /></li>
                        
                        <li className="pt-6">
                            <button 
                                onClick={() => { handleLogout(); closeDrawer(); }}
                                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all duration-300 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white group border border-red-500/10"
                            >
                                <FaSignOutAlt className="text-lg group-hover:-translate-x-1 transition-transform" />
                                Terminate Session
                            </button>
                        </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">
                            © 2026 ContestHub Dev Panel
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components ---
const SectionLabel = ({ label }) => (
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4 ml-4 mt-8 first:mt-0">
        {label}
    </p>
);

const StatsCard = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
        <div className={`w-3 h-12 rounded-full ${color} group-hover:h-14 transition-all`}></div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-3xl font-black text-secondary leading-none italic">{value}</p>
        </div>
    </div>
);

const DashboardLink = ({ to, icon, label, onClick }) => (
    <NavLink 
        to={to} 
        onClick={onClick}
        className={({ isActive }) => 
            `flex items-center gap-4 px-5 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all duration-300 group ${
                isActive 
                ? "bg-primary text-white shadow-xl shadow-primary/30 scale-[1.02]" 
                : "hover:bg-white/5 text-slate-400 hover:text-white"
            }`
        }
    >
        <span className="text-lg transition-transform group-hover:scale-125">{icon}</span> 
        {label}
    </NavLink>
);

export default Dashboard;