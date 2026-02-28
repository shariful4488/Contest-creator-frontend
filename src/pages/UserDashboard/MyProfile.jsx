import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosPublic from "../../hooks/useAxios";
import Swal from "sweetalert2";
import axios from "axios";
import { FaUserShield, FaUsers, FaTasks, FaEnvelope, FaFingerprint, FaCamera, FaSave, FaTrophy } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const [role] = useRole();
    const axiosPublic = useAxiosPublic();
    const [uploading, setUploading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const isAdmin = role === 'admin';

    const onSubmit = async (data) => {
        setUploading(true);
        try {
            let imageUrl = user?.photoURL;
            if (data.photo && data.photo[0]) {
                const imageFile = new FormData();
                imageFile.append('image', data.photo[0]);
                const res = await axios.post(image_hosting_api, imageFile, {
                    headers: { 'content-type': 'multipart/form-data' }
                });
                imageUrl = res.data.data.display_url;
            }

            await updateUserProfile(data.name || user?.displayName, imageUrl);

            const updatedInfo = {
                name: data.name || user?.displayName,
                image: imageUrl
            };
            const res = await axiosPublic.patch(`/users/update/${user?.email}`, updatedInfo);

            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire({ icon: "success", title: "Profile Updated!", showConfirmButton: false, timer: 1500 });
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({ icon: "error", title: "Update Failed" });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="animate-fade-in font-outfit pb-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-4xl font-black text-secondary uppercase italic leading-none">
                        {isAdmin ? "Admin" : "User"} <span className="text-primary">Space.</span>
                    </h2>
                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold mt-2">
                        {isAdmin ? "Platform Authority Control" : "Your Participation Journey"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-full h-32 ${isAdmin ? 'bg-secondary' : 'bg-primary'} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="relative">
                        <div className="relative w-40 h-40 mx-auto mb-8">
                            <div className="w-full h-full rounded-[2.5rem] ring-4 ring-offset-8 ring-primary/20 overflow-hidden shadow-2xl">
                                <img src={user?.photoURL || "https://i.ibb.co/3S46BvD/user.png"} className="w-full h-full object-cover" alt="Avatar" />
                            </div>
                            <label className="absolute -bottom-2 -right-2 btn btn-circle btn-primary btn-md shadow-xl border-4 border-white cursor-pointer hover:scale-110 transition-transform">
                                <FaCamera className="text-white" />
                                <input type="file" {...register("photo")} className="hidden" />
                            </label>
                        </div>

                        <div className="text-center space-y-4">
                            <input 
                                type="text" 
                                defaultValue={user?.displayName} 
                                {...register("name")}
                                className="text-2xl font-black text-secondary uppercase italic bg-transparent border-b-2 border-dashed border-slate-200 focus:border-primary outline-none text-center w-full"
                            />
                            
                            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${isAdmin ? 'bg-secondary text-white' : 'bg-primary/10 text-primary'}`}>
                                {isAdmin ? <FaUserShield /> : <FaFingerprint />} {role} verified
                            </div>

                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mt-8 text-left">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <FaEnvelope className="text-primary" /> Official Email
                                </p>
                                <p className="text-sm font-bold text-secondary truncate">{user?.email}</p>
                            </div>

                            <button disabled={uploading} className="btn btn-primary w-full rounded-2xl text-white font-black uppercase italic tracking-widest mt-6 shadow-lg shadow-primary/20">
                                {uploading ? <span className="loading loading-spinner"></span> : <><FaSave /> Save Profile</>}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-7 space-y-6">
                    {isAdmin ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary opacity-20 rounded-full blur-3xl"></div>
                                <div>
                                    <FaUsers className="text-5xl mb-6 text-primary group-hover:animate-bounce" />
                                    <p className="font-black uppercase text-[10px] tracking-widest text-slate-400">System Control</p>
                                    <h4 className="text-3xl font-black italic mt-2 uppercase">Users List</h4>
                                </div>
                                <p className="text-xs mt-6 text-slate-400 font-bold border-l-2 border-primary pl-4">Manage and monitor all participants</p>
                            </div>

                            <div className="bg-white border border-slate-100 p-10 rounded-[3rem] flex flex-col justify-between shadow-xl group">
                                <div>
                                    <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                        <FaTasks className="text-3xl text-secondary" />
                                    </div>
                                    <p className="font-black uppercase text-[10px] tracking-widest text-slate-400">Audit Trail</p>
                                    <h4 className="text-3xl font-black italic mt-2 uppercase text-secondary">Contest Info</h4>
                                </div>
                                <button className="btn btn-ghost btn-sm p-0 justify-start hover:bg-transparent text-primary font-black uppercase text-[10px] tracking-widest mt-6">Review Pending →</button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-12 h-full flex flex-col justify-center items-center text-center">
                            <div className="relative">
                                <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mb-8 animate-pulse">
                                    <FaTrophy className="text-4xl text-primary" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full"></div>
                            </div>
                            <h4 className="text-3xl font-black text-secondary uppercase italic">No Trophies Yet!</h4>
                            <p className="text-slate-400 mt-4 max-w-xs font-medium leading-relaxed">
                                Your cabinet is empty. Join a contest today and start your winning streak!
                            </p>
                            <Link to="/all-contests" className="btn btn-secondary rounded-2xl px-10 font-black uppercase italic text-xs tracking-widest mt-10 shadow-xl">
                                Browse All Contests
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;