import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";

import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc"; 
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.photo)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate("/");
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-secondary">Create Account</h2>
            <p className="text-slate-500 mt-2">Join the ultimate contest community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
            <div>
              <label className="label-text font-bold ml-1">Full Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full rounded-xl focus:ring-2 ring-primary/20 outline-none"
              />
              {errors.name && <span className="text-error text-xs ml-1">Name is required</span>}
            </div>

           
            <div>
              <label className="label-text font-bold ml-1">Photo URL</label>
              <input
                type="text"
                {...register("photo", { required: true })}
                placeholder="Paste image link"
                className="input input-bordered w-full rounded-xl"
              />
              {errors.photo && <span className="text-error text-xs ml-1">Photo URL is required</span>}
            </div>

           
            <div>
              <label className="label-text font-bold ml-1">Email Address</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email@example.com"
                className="input input-bordered w-full rounded-xl"
              />
              {errors.email && <span className="text-error text-xs ml-1">Email is required</span>}
            </div>

            
            <div>
              <label className="label-text font-bold ml-1">Password</label>
              <input
                type="password"
                {...register("password", { 
                    required: true, 
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                })}
                placeholder="******"
                className="input input-bordered w-full rounded-xl"
              />
              {errors.password?.type === 'required' && <p className="text-error text-xs">Password is required</p>}
              {errors.password?.type === 'minLength' && <p className="text-error text-xs">Must be 6 characters</p>}
              {errors.password?.type === 'pattern' && <p className="text-error text-xs">Add 1 capital letter and 1 special character</p>}
            </div>

            <button className="btn btn-primary w-full rounded-xl text-white font-bold text-lg mt-4 shadow-lg shadow-primary/30">
              Register
            </button>
          </form>

          <div className="divider my-8 text-slate-400 text-sm">OR CONTINUE WITH</div>

          <button 
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full rounded-xl border-slate-200 hover:bg-slate-50 hover:text-secondary gap-2 transition-all"
          >
            <FcGoogle className="text-2xl" />
            Google
          </button>

          <p className="text-center mt-8 text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;