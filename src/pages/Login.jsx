import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router"; 
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxios";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 

    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleDemoLogin = (role) => {
        if (role === 'admin') {
            setValue("email", "admin@gmail.com");
            setValue("password", "Admin123@");
        }
        else if (role === 'manager') {
            setValue("email", "manager@gmail.com");
            setValue("password", "Manager123@");
        }
        else {
            setValue("email", "user@gmail.com");
            setValue("password", "User@123");
        }
    };

    const onSubmit = (data) => {
        setLoading(true);
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
                    text: "Check your credentials and try again.",
                });
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (result) => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    role: 'user', 
                    winCount: 0,
                    timestamp: new Date()
                };
                await axiosPublic.post('/users', userInfo);
                Swal.fire({ icon: "success", title: "Success!", timer: 1500 });
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 font-outfit">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-secondary uppercase italic leading-none">
                        Login <span className="text-primary">.</span>
                    </h2>
                </div>

                <div className="flex gap-2 mb-8">
                    <button onClick={() => handleDemoLogin('admin')} className="flex-1 py-2 px-3 bg-slate-100 hover:bg-secondary hover:text-white rounded-xl text-[10px] font-black uppercase transition-all">Demo Admin</button>
                    <button onClick={() => handleDemoLogin('manager')} className="flex-1 py-2 px-3 bg-slate-100 hover:bg-secondary hover:text-white rounded-xl text-[10px] font-black uppercase transition-all">Demo Manager</button>
                    <button onClick={() => handleDemoLogin('user')} className="flex-1 py-2 px-3 bg-slate-100 hover:bg-secondary hover:text-white rounded-xl text-[10px] font-black uppercase transition-all">Demo User</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1 text-secondary uppercase text-[10px] tracking-widest">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="name@example.com"
                            className="input input-bordered rounded-2xl font-semibold"
                        />
                        {errors.email && <span className="text-error text-[10px] font-bold mt-1 ml-1 uppercase">{errors.email.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1 text-secondary uppercase text-[10px] tracking-widest">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} 
                                {...register("password", { required: "Password is required" })}
                                placeholder="••••••••"
                                className="input input-bordered rounded-2xl font-semibold w-full pr-12"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors text-lg"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <span className="text-error text-[10px] font-bold mt-1 ml-1 uppercase">{errors.password.message}</span>}
                    </div>

                    <button disabled={loading} className="btn btn-primary w-full rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
                        {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
                    </button>
                </form>

                <div className="divider my-8 text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">OR</div>

                <button onClick={handleGoogleSignIn} className="btn btn-outline w-full rounded-2xl border-slate-200 hover:bg-slate-50 hover:text-secondary gap-3 font-bold text-xs uppercase tracking-widest">
                    <FcGoogle className="text-xl" /> Google
                </button>

                <p className="text-center mt-8 text-slate-400 font-bold text-[11px] uppercase tracking-widest leading-relaxed">
                    New here? <Link to="/auth/register" className="text-primary hover:underline">Register Now</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;