import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-secondary uppercase tracking-tighter">Login <span className="text-primary text-4xl">.</span></h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Enter your credentials to access ContestHub</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="name@company.com"
              className="input input-bordered w-full rounded-xl focus:ring-2 ring-primary/20 outline-none"
            />
            {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="••••••••"
              className="input input-bordered w-full rounded-xl focus:ring-2 ring-primary/20 outline-none"
            />
            {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button className="btn btn-primary w-full rounded-xl text-white font-bold text-lg shadow-lg shadow-primary/30">
            Sign In
          </button>
        </form>

        <div className="divider my-8 text-slate-300 text-xs font-bold uppercase tracking-widest font-outfit">Or Continue With</div>

        <button 
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full rounded-xl border-slate-200 hover:bg-slate-50 hover:text-secondary gap-3 transition-all font-bold"
        >
          <FcGoogle className="text-2xl" />
          Google
        </button>

        <p className="text-center mt-8 text-slate-500 font-medium">
          New here?{" "}
          <Link to="/auth/register" className="text-primary font-bold hover:underline transition-all">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;