import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router"; 
import { AuthContext } from "../provider/AuthProvider";
import { FaSun, FaMoon } from "react-icons/fa"; 

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  
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
      .then(() => {})
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
    </>
  );

  return (
    <nav className="bg-base-100/80 backdrop-blur-xl sticky top-0 z-50 border-b border-base-200 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-base-content tracking-tight">
                Contest<span className="text-primary">Hub.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-1 text-sm font-semibold">
              {navLinks}
            </ul>
          </div>

          {/* Auth & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* --- Theme Toggle Button --- */}
            <button 
              onClick={toggleTheme} 
              className="btn btn-ghost btn-circle text-xl"
              title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            >
              {theme === "light" ? <FaMoon className="text-slate-600" /> : <FaSun className="text-yellow-400" />}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-primary/20 ring-offset-2">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL || "https://i.ibb.co/mR7093p/user.png"} alt="profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-60 border border-base-200">
                  <div className="px-4 py-3 border-b border-base-200 mb-2">
                    <p className="font-bold text-base-content truncate">{user?.displayName || "Anonymous User"}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <li><Link to="/dashboard" className="py-2.5 rounded-lg font-medium">My Dashboard</Link></li>
                  <li className="mt-2 pt-2 border-t border-base-200">
                    <button onClick={handleLogout} className="text-error font-bold hover:bg-error/10 rounded-lg">Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/auth/login" className="text-sm font-bold text-base-content/70 hover:text-primary transition-colors px-2">
                  Login
                </Link>
                <Link to="/auth/register" className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
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
                    <li><Link to="/auth/register" className="bg-primary text-white py-2 rounded-lg text-center font-bold shadow-md">Register</Link></li>
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