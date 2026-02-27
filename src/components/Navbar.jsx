import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router"; 
import { FaSun, FaMoon, FaLayerGroup, FaSignOutAlt, FaUser, FaInfoCircle, FaPhoneAlt, FaTrophy, FaBriefcase } from "react-icons/fa"; 
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const linkStyle = ({ isActive }) => 
    `px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
      isActive 
      ? "bg-primary/10 text-primary font-bold" 
      : "hover:bg-base-200 text-base-content/80 font-medium"
    }`;

  const navLinks = (
    <>
      <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
      <li><NavLink to="/all-contests" className={linkStyle}>Explore</NavLink></li>
      <li><NavLink to="/leaderboard" className={linkStyle}><FaTrophy className="text-[10px]"/> Leaderboard</NavLink></li>
      <li><NavLink to="/about" className={linkStyle}><FaInfoCircle className="text-[10px]"/> About</NavLink></li>
      <li><NavLink to="/contact" className={linkStyle}><FaPhoneAlt className="text-[10px]"/> Contact</NavLink></li>
    </>
  );

  return (
    <nav className="bg-base-100/80 backdrop-blur-xl sticky top-0 z-50 border-b border-base-200 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 1. Logo Section */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black text-base-content tracking-tight">
                Contest<span className="text-primary">Hub.</span>
              </span>
            </Link>
          </div>

          {/* 2. Desktop Navigation (Visible only on Large Screens) */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1 text-sm">
              {navLinks}
            </ul>
          </div>

          {/* 3. Actions: Theme + Auth */}
          <div className="flex items-center gap-2">
            
            <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl transition-all hover:bg-primary/10">
              {theme === "light" ? <FaMoon className="text-slate-600" /> : <FaSun className="text-yellow-400" />}
            </button>

            {user ? (
              /* Profile Dropdown: Nemesis Requirement: Minimum 6 routes for Logged In */
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-primary/20 ring-offset-2 hover:ring-primary transition-all">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL || "https://i.ibb.co/mR7093p/user.png"} alt="profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-4 z-[50] p-2 shadow-2xl menu dropdown-content bg-base-100 rounded-2xl w-64 border border-base-200 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b border-base-200 mb-2 bg-base-200/30 rounded-t-xl">
                    <p className="font-bold text-base-content truncate">{user?.displayName}</p>
                    <p className="text-[10px] text-base-content/60 truncate uppercase font-bold tracking-widest">{user?.email}</p>
                  </div>
                  
                  {/* 6+ Logged In Routes below */}
                  <li><Link to="/dashboard" className="font-bold text-primary hover:bg-primary hover:text-white transition-all"><FaLayerGroup /> Dashboard Home</Link></li>
                  <li><Link to="/dashboard/my-participated" className="font-medium">My Participation</Link></li>
                  <li><Link to="/dashboard/my-winning" className="font-medium"><FaTrophy className="text-orange-400"/> My Wins</Link></li>
                  <li><Link to="/dashboard/my-submissions" className="font-medium"><FaBriefcase /> Submissions</Link></li>
                  <li><Link to="/dashboard/profile" className="font-medium"><FaUser /> Profile Settings</Link></li>
                  
                  <li className="mt-2 pt-2 border-t border-base-200">
                    <button onClick={handleLogout} className="text-error font-bold hover:bg-error/10">
                      <FaSignOutAlt /> Logout Account
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              /* Public Auth Buttons */
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/auth/login" className="btn btn-ghost btn-sm font-bold text-base-content/70">Login</Link>
                <Link to="/auth/register" className="btn btn-primary btn-sm rounded-xl px-5 h-10 min-h-0 normal-case shadow-lg shadow-primary/20">Register</Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-4 shadow-xl bg-base-100 rounded-2xl w-72 border border-base-200 gap-2">
                {navLinks}
                {!user && (
                  <div className="flex flex-col gap-2 mt-4 border-t pt-4">
                    <Link to="/auth/login" className="btn btn-outline btn-primary btn-sm rounded-lg">Login</Link>
                    <Link to="/auth/register" className="btn btn-primary btn-sm rounded-lg">Register</Link>
                  </div>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;