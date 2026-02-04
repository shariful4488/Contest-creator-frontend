import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxios";


// ImgBB API
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
       
        const imageFile = new FormData();
        imageFile.append('image', data.photo[0]);

        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const imageUrl = res.data.data.display_url;

                
                const result = await createUser(data.email, data.password);
                
               
                await updateUserProfile(data.name, imageUrl);

               
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    image: imageUrl,
                    role: 'user', 
                    timestamp: new Date()
                };

                const dbResponse = await axiosPublic.post('/users', userInfo);
                
                if (dbResponse.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Registration Successful!",
                        text: "User data saved to database",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    reset();
                    navigate("/");
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
            });
        }
    };

    
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (result) => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    role: 'user',
                    timestamp: new Date()
                };
                
                await axiosPublic.post('/users', userInfo);
                
                Swal.fire({
                    icon: "success",
                    title: "Google Login Successful!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-10 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-secondary">Create Account</h2>
                    <p className="text-slate-400 text-sm font-medium">Join ContestHub today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1 ml-1">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            placeholder="John Doe"
                            className="input input-bordered rounded-xl focus:ring-2 ring-primary/20"
                        />
                        {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
                    </div>

                    {/* Photo */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1 ml-1">Upload Photo</label>
                        <input
                            type="file"
                            {...register("photo", { required: "Photo is required" })}
                            className="file-input file-input-bordered file-input-primary w-full rounded-xl"
                        />
                        {errors.photo && <span className="text-error text-xs mt-1">{errors.photo.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1 ml-1">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="example@mail.com"
                            className="input input-bordered rounded-xl"
                        />
                        {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1 ml-1">Password</label>
                        <input
                            type="password"
                            {...register("password", { 
                                required: "Password is required",
                                minLength: { value: 6, message: "Min 6 characters" }
                            })}
                            placeholder="******"
                            className="input input-bordered rounded-xl"
                        />
                        {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <button className="btn btn-primary w-full rounded-xl text-white font-bold text-lg mt-4 shadow-lg shadow-primary/30 transition-all active:scale-95">
                        Register
                    </button>
                </form>

                <div className="divider my-6 text-slate-400 text-xs font-bold uppercase tracking-widest">OR</div>

                <button 
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full rounded-xl border-slate-200 hover:bg-slate-50 hover:text-secondary gap-3 font-bold"
                >
                    <FcGoogle className="text-2xl" /> Continue with Google
                </button>

                <p className="text-center mt-6 text-slate-500 font-medium text-sm">
                    Already have an account? <Link to="/auth/login" className="text-primary font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;