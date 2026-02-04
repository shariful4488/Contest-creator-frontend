import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => 
          `px-4 py-2 rounded-lg transition-all ${isActive ? "bg-primary/10 text-primary font-bold" : "hover:bg-base-200"}`
        }>Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-contests" className={({ isActive }) => 
          `px-4 py-2 rounded-lg transition-all ${isActive ? "bg-primary/10 text-primary font-bold" : "hover:bg-base-200"}`
        }>Explore Contests</NavLink>
      </li>
      <li>
        <NavLink to="/leaderboard" className={({ isActive }) => 
          `px-4 py-2 rounded-lg transition-all ${isActive ? "bg-primary/10 text-primary font-bold" : "hover:bg-base-200"}`
        }>Leaderboard</NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-secondary tracking-tight">
                Contest<span className="text-primary">Hub.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-1 text-sm font-semibold text-slate-600">
              {navLinks}
            </ul>
          </div>

          {/* Auth Buttons / Profile */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-primary/20 ring-offset-2">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL || "https://i.ibb.co/mR7093p/user.png"} alt="profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-60 border border-slate-100">
                  <div className="px-4 py-3 border-b border-slate-50 mb-2">
                    <p className="font-bold text-slate-900 truncate">{user?.displayName || "User"}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <li><Link to="/dashboard" className="py-2.5 rounded-lg">My Dashboard</Link></li>
                  <li className="mt-2 pt-2 border-t border-slate-50">
                    <button onClick={handleLogout} className="text-error font-bold">Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/auth/login" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors px-2">
                  Login
                </Link>
                <Link to="/auth/register" className="bg-secondary hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-200">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-white rounded-xl w-64 border border-slate-100 gap-2">
                {navLinks}
                <hr className="my-2 border-slate-100"/>
                {!user && (
                  <>
                    <li><Link to="/auth/login" className="py-2">Login</Link></li>
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