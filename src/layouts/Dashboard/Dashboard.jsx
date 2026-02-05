import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaPlusCircle, FaList, FaUserEdit, FaSignOutAlt, FaTrophy } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";


const Dashboard = () => {
    const [role, isRoleLoading] = useRole();
    const { logOut, user } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut().then(() => navigate('/'));
    };

    if (isRoleLoading) return <div className="h-screen flex justify-center items-center font-black text-primary">LOADING...</div>;

    return (
        <div className="flex min-h-screen bg-slate-100 font-outfit">
            {/* Sidebar Container */}
            <div className="w-64 bg-secondary text-white flex flex-col fixed h-full z-50">
                <div className="p-8">
                    <h2 className="text-2xl font-black italic tracking-tighter">
                        Contest<span className="text-primary">Hub</span>
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1 font-bold">Dashboard</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {/* Admin Routes */}
                    {role === 'admin' && (
                        <>
                            <p className="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2">Admin Panel</p>
                            <DashboardItem icon={<FaUsers />} label="Manage Users" to="/dashboard/manage-users" />
                            <DashboardItem icon={<FaList />} label="Manage Contests" to="/dashboard/manage-contests" />
                        </>
                    )}

                    {/* Creator Routes */}
                    {role === 'creator' && (
                        <>
                            <p className="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2">Creator Panel</p>
                            <DashboardItem icon={<FaPlusCircle />} label="Add Contest" to="/dashboard/add-contest" />
                            <DashboardItem icon={<FaList />} label="My Contests" to="/dashboard/my-created-contests" />
                        </>
                    )}

                    {/* User Routes */}
                    {role === 'user' && (
                        <>
                            <p className="text-[10px] font-bold text-slate-500 uppercase px-4 mb-2">User Panel</p>
                            <DashboardItem icon={<FaTrophy />} label="My Participated" to="/dashboard/my-participated" />
                            <DashboardItem icon={<FaUserEdit />} label="My Profile" to="/dashboard/profile" />
                        </>
                    )}

                    <div className="pt-6 mt-6 border-t border-white/5">
                        <DashboardItem icon={<FaHome />} label="Back to Home" to="/" />
                        <button 
                            onClick={handleLogOut}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-400 hover:bg-white/5 rounded-xl transition-all"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Dashboard Top Header */}
                <header className="bg-white h-20 flex items-center justify-between px-10 shadow-sm sticky top-0 z-40">
                    <h2 className="text-lg font-bold text-secondary uppercase tracking-widest">
                        Welcome back, <span className="text-primary">{user?.displayName?.split(' ')[0]}</span>
                    </h2>
                    <div className="flex items-center gap-4">
                        <img src={user?.photoURL} className="w-10 h-10 rounded-full border-2 border-primary" alt="" />
                    </div>
                </header>

                <main className="p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// Helper Component for Sidebar Items
const DashboardItem = ({ icon, label, to }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                isActive ? "bg-primary text-secondary" : "hover:bg-white/5 text-slate-300"
            }`
        }
    >
        {icon} {label}
    </NavLink>
);

export default Dashboard;