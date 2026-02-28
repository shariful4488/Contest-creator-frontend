import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; 
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxios";
import axios from "axios"; // External API (ImgBB) এর জন্য

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // ১. ImgBB-তে ইমেজ আপলোড (সরাসরি axios দিয়ে)
            const imageFile = new FormData();
            imageFile.append('image', data.photo[0]);

            const res = await axios.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const imageUrl = res.data.data.display_url;

                // ২. Firebase ইউজার তৈরি
                await createUser(data.email, data.password);
                
                // ৩. Firebase প্রোফাইল আপডেট
                await updateUserProfile(data.name, imageUrl);
                
                // ৪. MongoDB-তে ডাটা পাঠানো
                const userInfo = {
                    name: data.name,
                    email: data.email.toLowerCase(), 
                    image: imageUrl,
                };

                const dbResponse = await axiosPublic.post('/users', userInfo);
                
                if (dbResponse.data.insertedId || dbResponse.data.message === "User already exists") {
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: "Registration Successful!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Full Error Info:", error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.message || "Registration failed. Use a VPN if ImgBB fails.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                image: result.user?.photoURL,
            };

            await axiosPublic.post('/users', userInfo);
            Swal.fire({ icon: "success", title: "Login Successful!", timer: 1500 });
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 font-outfit">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-secondary uppercase italic leading-none">
                        Join <span className="text-primary">Hub</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-widest">Create your profile</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1 text-secondary uppercase text-[10px] tracking-widest">Full Name</label>
                        <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered rounded-2xl w-full" />
                        {errors.name && <span className="text-error text-[10px] mt-1 uppercase">{errors.name.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1 text-secondary uppercase text-[10px] tracking-widest">Profile Picture</label>
                        <input type="file" {...register("photo", { required: "Photo is required" })} className="file-input file-input-bordered file-input-primary w-full rounded-2xl" />
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1 text-secondary uppercase text-[10px] tracking-widest">Email Address</label>
                        <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered rounded-2xl w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1 text-secondary uppercase text-[10px] tracking-widest">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", minLength: 6 })} className="input input-bordered rounded-2xl w-full pr-12" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button disabled={loading} className="btn btn-primary w-full rounded-2xl text-white font-black uppercase tracking-widest">
                        {loading ? <span className="loading loading-spinner"></span> : "Register Now"}
                    </button>
                </form>

                <div className="divider my-8 text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">Social Connect</div>

                <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline w-full rounded-2xl border-slate-200 gap-3 font-bold">
                    <FcGoogle className="text-xl" /> Continue with Google
                </button>

                <p className="text-center mt-8 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                    Member already? <Link to="/auth/login" className="text-primary hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;