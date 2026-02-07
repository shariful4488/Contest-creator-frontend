import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router"; 
import { FaSun, FaMoon, FaLayerGroup, FaSignOutAlt, FaUser } from "react-icons/fa"; 
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
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all ${isActive ? "bg-primary/10 text-primary font-bold" : "hover:bg-base-200 text-slate-600"}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/all-contests" 
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all ${isActive ? "bg-primary/10 text-primary font-bold" : "hover:bg-base-200 text-slate-600"}`
          }
        >
          Explore Contests
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/leaderboard" 
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all ${isActive ? "bg-primary/10 text-primary font-bold" : "hover:bg-base-200 text-slate-600"}`
          }
        >
          Leaderboard
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${isActive ? "bg-primary text-white font-bold" : "hover:bg-base-200 text-slate-600"}`
            }
          >
            <FaLayerGroup className="text-xs" /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-base-100/80 backdrop-blur-xl sticky top-0 z-50 border-b border-base-200 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="shrink-0 flex items-center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-base-content tracking-tight">
                Contest<span className="text-primary">Hub.</span>
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-1 text-sm font-semibold">
              {navLinks}
            </ul>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            
            <button 
              onClick={toggleTheme} 
              className="btn btn-ghost btn-circle text-xl transition-transform active:scale-90"
              title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            >
              {theme === "light" ? <FaMoon className="text-slate-600" /> : <FaSun className="text-yellow-400" />}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-primary/20 ring-offset-2 hover:ring-primary transition-all">
                  <div className="w-10 rounded-full overflow-hidden">
                    <img src={user?.photoURL || "https://i.ibb.co/mR7093p/user.png"} alt="profile" referrerPolicy="no-referrer" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-60 border border-base-200 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-base-200 mb-2 bg-slate-50 rounded-t-xl">
                    <p className="font-bold text-base-content truncate">{user?.displayName || "Anonymous User"}</p>
                    <p className="text-[10px] text-slate-500 truncate font-semibold uppercase tracking-wider">{user?.email}</p>
                  </div>
                  
                  <li>
                    <Link to="/dashboard" className="py-2.5 rounded-lg font-bold text-primary bg-primary/5 hover:bg-primary hover:text-white transition-all mb-1">
                       <FaLayerGroup /> Dashboard Overview
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile" className="py-2.5 rounded-lg font-medium flex items-center gap-2">
                      <FaUser /> My Profile
                    </Link>
                  </li>
                  
                  <li className="mt-2 pt-2 border-t border-base-200">
                    <button onClick={handleLogout} className="text-error font-bold hover:bg-error/10 rounded-lg flex items-center gap-2">
                      <FaSignOutAlt /> Logout Account
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/auth/login" className="text-sm font-bold text-base-content/70 hover:text-primary transition-colors px-2">
                  Login
                </Link>
                <Link to="/auth/register" className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95">
                  Register
                </Link>
              </div>
            )}
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-xl w-64 border border-base-200 gap-2 font-outfit">
                {navLinks}
                {!user && (
                  <>
                    <hr className="my-2 border-base-200"/>
                    <li><Link to="/auth/login" className="py-2 font-semibold">Login</Link></li>
                    <li><Link to="/auth/register" className="bg-primary text-white py-2 rounded-lg text-center font-bold">Register</Link></li>
                  </>
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