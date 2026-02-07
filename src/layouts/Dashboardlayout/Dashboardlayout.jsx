import { NavLink, Outlet, useLocation } from "react-router";
import { FaHome, FaUsers, FaFolderPlus, FaAddressCard, FaTrophy, FaUserCircle, FaBars, FaSignOutAlt, FaRocket } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";


const Dashboard = () => {
    const [role, isRoleLoading] = useRole();
    const { logOut, user } = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch((err) => console.log(err));
    };

    if (isRoleLoading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
                <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                <div className="font-black text-primary italic uppercase tracking-[0.3em] animate-pulse">
                    Accessing Secure Panel...
                </div>
            </div>
        );
    }

    const isDashboardRoot = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

    return (
        <div className="drawer lg:drawer-open font-outfit">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col bg-slate-50 min-h-screen overflow-x-hidden">
                {/* Mobile Header */}
                <div className="flex items-center justify-between bg-secondary text-white p-4 lg:hidden shadow-lg sticky top-0 z-40">
                    <h2 className="text-xl font-black italic tracking-tighter uppercase">
                        Contest<span className="text-primary">Hub</span>
                    </h2>
                    <label htmlFor="dashboard-drawer" className="btn btn-primary btn-sm drawer-button">
                        <FaBars className="text-white" />
                    </label>
                </div>

                <main className="flex-1 p-3 md:p-8 lg:p-10 w-full">
                    <div className="max-w-6xl mx-auto bg-white rounded-3xl md:rounded-[3rem] p-4 md:p-10 shadow-sm border border-slate-100 min-h-[85vh] relative overflow-hidden">
                        {isDashboardRoot ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-fade-in">
                                <div className="bg-blue-50 p-6 rounded-full mb-6">
                                    <FaRocket className="text-6xl text-primary animate-bounce" />
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black text-secondary mb-4 uppercase italic">
                                    Welcome, <span className="text-primary">{user?.displayName || 'Champion'}</span>!
                                </h1>
                                <p className="text-slate-400 max-w-md mx-auto font-medium">
                                    You are logged in as <span className="text-primary font-bold uppercase">{role}</span>. 
                                    Please select an option from the sidebar to manage your activities.
                                </p>
                                <div className="mt-8 flex gap-3">
                                    <div className="w-3 h-3 rounded-full bg-primary animate-ping"></div>
                                    <div className="w-3 h-3 rounded-full bg-primary animate-ping delay-75"></div>
                                    <div className="w-3 h-3 rounded-full bg-primary animate-ping delay-150"></div>
                                </div>
                            </div>
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </main>
            </div> 

            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                <div className="w-72 min-h-full bg-secondary text-white p-6 shadow-2xl flex flex-col">
                    <div className="mb-10 text-left px-2">
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                            Contest<span className="text-primary">Hub</span>
                        </h2>
                        <div className="inline-block bg-primary/10 border border-primary/20 text-primary text-[9px] font-black mt-3 uppercase tracking-widest px-3 py-1.5 rounded-full">
                            {role} Control Panel
                        </div>
                    </div>

                    <ul className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar pr-1">
                        {/* --- Admin Routes --- */}
                        {role === 'admin' && (
                            <>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-4 mt-6">Administration</p>
                                <li><DashboardLink to="/dashboard/manage-users" icon={<FaUsers />} label="Manage Users" /></li>
                                <li><DashboardLink to="/dashboard/manage-contests" icon={<FaAddressCard />} label="Manage Contests" /></li>
                            </>
                        )}

                        {/* --- Creator Routes --- */}
                        {role === 'creator' && (
                            <>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-4 mt-6">Creative Hub</p>
                                <li><DashboardLink to="/dashboard/add-contest" icon={<FaFolderPlus />} label="Create New" /></li>
                                <li><DashboardLink to="/dashboard/myCreated-contests" icon={<FaAddressCard />} label="Contest Studio" /></li>
                            </>
                        )}

                        {/* --- User Routes --- */}
                        {role === 'user' && (
                            <>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-4 mt-6">My Activity</p>
                                <li><DashboardLink to="/dashboard/my-participated" icon={<FaTrophy />} label="Participations" /></li>
                                <li><DashboardLink to="/dashboard/my-winnings" icon={<FaTrophy />} label="My Winnings" /></li>
                            </>
                        )}

                        <div className="divider before:bg-white/5 after:bg-white/5 my-6 opacity-30 px-4"></div>

                        {/* Universal Routes */}
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-4">Account</p>
                        <li><DashboardLink to="/" icon={<FaHome />} label="Back to Home" /></li>
                        <li><DashboardLink to="/dashboard/profile" icon={<FaUserCircle />} label="My Profile" /></li>
                        
                        <li>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all duration-300 text-red-400 hover:bg-red-500/10 hover:text-red-300 group mt-4"
                            >
                                <span className="text-lg group-hover:rotate-12 transition-transform"><FaSignOutAlt /></span>
                                Logout Session
                            </button>
                        </li>
                    </ul>

                    <div className="mt-auto pt-6 text-center">
                        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-tighter">
                            © 2026 ContestHub Dev Panel
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardLink = ({ to, icon, label, onClick }) => (
    <NavLink 
        to={to} 
        onClick={onClick}
        className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all duration-300 group ${
                isActive 
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                : "hover:bg-white/5 text-slate-400 hover:text-white"
            }`
        }
    >
        <span className="text-lg transition-transform group-hover:scale-110">{icon}</span> 
        {label}
    </NavLink>
);

export default Dashboard;