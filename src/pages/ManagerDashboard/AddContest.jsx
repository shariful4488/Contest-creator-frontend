// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../hooks/useAxios";
// import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth"; // ইউজার ইনফো (ইমেইল) পাওয়ার জন্য
// import { FaPlusCircle } from "react-icons/fa";

// // ImgBB API Key
// const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const AddContest = () => {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const axiosPublic = useAxiosPublic();
//     const { user } = useAuth(); // বর্তমানে লগইন করা ইউজারের ইমেইল

//     const onSubmit = async (data) => {
//         // ১. কন্টেস্টের ইমেজ ImgBB-তে আপলোড
//         const imageFile = new FormData();
//         imageFile.append('image', data.image[0]);

//         try {
//             const res = await axiosPublic.post(image_hosting_api, imageFile, {
//                 headers: { 'content-type': 'multipart/form-data' }
//             });

//             if (res.data.success) {
//                 const imageUrl = res.data.data.display_url;

//                 // ২. কন্টেস্টের ডেটা তৈরি
//                 const contestItem = {
//                     contestName: data.name,
//                     image: imageUrl,
//                     price: parseFloat(data.price), // স্ট্রিং থেকে ফ্লোটে কনভার্ট
//                     prizeMoney: parseFloat(data.prizeMoney),
//                     contestDescription: data.description,
//                     taskSubmissionInstruction: data.instruction,
//                     contestCategory: data.category,
//                     contestDeadline: data.deadline,
//                     creatorEmail: user.email, // কন্টেস্ট ক্রিয়েটরের ইমেইল
//                     creatorName: user.displayName, // ক্রিয়েটরের নাম (যদি থাকে)
//                     participationCount: 0, // নতুন কন্টেস্ট, তাই পার্টিসিপেশন ০
//                     status: 'pending' // অ্যাডমিন অ্যাপ্রুভ করার আগে pending থাকবে
//                 };

//                 // ৩. ডাটাবেসে কন্টেস্ট সেভ
//                 const contestRes = await axiosPublic.post('/contests', contestItem);

//                 if (contestRes.data.insertedId) {
//                     reset();
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `${data.name} contest added successfully! Waiting for admin approval.`,
//                         showConfirmButton: false,
//                         timer: 2000
//                     });
//                 }
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Error!",
//                 text: error.message || "Failed to add contest.",
//                 confirmButtonText: "Ok"
//             });
//             console.error(error);
//         }
//     };

//     return (
//         <div className="font-outfit">
//             <h2 className="text-3xl font-black text-secondary uppercase italic mb-8">
//                 Create a New <span className="text-primary">Contest</span>
//             </h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 {/* Row 1: Contest Name & Image */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="form-control">
//                         <label className="label-text font-bold mb-2 ml-1">Contest Name</label>
//                         <input
//                             type="text"
//                             {...register('name', { required: "Contest Name is required" })}
//                             placeholder="e.g., Creative Logo Design"
//                             className="input input-bordered rounded-xl focus:ring-2 ring-primary/20"
//                         />
//                         {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
//                     </div>

//                     <div className="form-control">
//                         <label className="label-text font-bold mb-2 ml-1">Contest Image</label>
//                         <input
//                             type="file"
//                             {...register('image', { required: "Contest Image is required" })}
//                             className="file-input file-input-bordered file-input-primary w-full rounded-xl"
//                         />
//                         {errors.image && <span className="text-error text-xs mt-1">{errors.image.message}</span>}
//                     </div>
//                 </div>

//                 {/* Row 2: Price & Prize Money */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="form-control">
//                         <label className="label-text font-bold mb-2 ml-1">Contest Price (for Participant)</label>
//                         <input
//                             type="number"
//                             step="0.01" // দশমিক সংখ্যা ইনপুট করার জন্য
//                             {...register('price', { required: "Contest Price is required", min: { value: 0, message: "Price cannot be negative" } })}
//                             placeholder="$50"
//                             className="input input-bordered rounded-xl focus:ring-2 ring-primary/20"
//                         />
//                         {errors.price && <span className="text-error text-xs mt-1">{errors.price.message}</span>}
//                     </div>

//                     <div className="form-control">
//                         <label className="label-text font-bold mb-2 ml-1">Prize Money (Winner gets)</label>
//                         <input
//                             type="number"
//                             step="0.01"
//                             {...register('prizeMoney', { required: "Prize Money is required", min: { value: 0, message: "Prize money cannot be negative" } })}
//                             placeholder="$200"
//                             className="input input-bordered rounded-xl focus:ring-2 ring-primary/20"
//                         />
//                         {errors.prizeMoney && <span className="text-error text-xs mt-1">{errors.prizeMoney.message}</span>}
//                     </div>
//                 </div>

//                 {/* Row 3: Description & Category */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="form-control">
//                         <label className="label-text font-bold mb-2 ml-1">Contest Description</label>
//                         <textarea
//                             {...register('description', { required: "Description is required" })}
//                             placeholder="Provide a detailed description of the contest..."
//                             className="textarea textarea-bordered h-24 rounded-xl focus:ring-2 ring-primary/20"
//                         ></textarea>
//                         {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
//                     </div>

//                     <div className="form-control">
//                         <label className="label-text font-bold mb-2 ml-1">Contest Category</label>
//                         <select
//                             {...register('category', { required: "Category is required" })}
//                             className="select select-bordered rounded-xl focus:ring-2 ring-primary/20 font-semibold text-secondary"
//                         >
//                             <option value="">Select a Category</option>
//                             <option value="Image Design">Image Design</option>
//                             <option value="Article Writing">Article Writing</option>
//                             <option value="Marketing">Marketing</option>
//                             <option value="Gaming">Gaming</option>
//                             <option value="Photography">Photography</option>
//                             <option value="Web Design">Web Design</option>
//                             <option value="Video Editing">Video Editing</option>
//                             <option value="Coding">Coding Challenge</option>
//                             {/* আরও ক্যাটাগরি যোগ করতে পারেন */}
//                         </select>
//                         {errors.category && <span className="text-error text-xs mt-1">{errors.category.message}</span>}
//                     </div>
//                 </div>

//                 {/* Row 4: Task Submission Instruction & Deadline */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="form-control">
//                         <label className="label-text font-bold mb-2 ml-1">Task Submission Instruction</label>
//                         <textarea
//                             {...register('instruction', { required: "Submission instruction is required" })}
//                             placeholder="e.g., Submit a high-res JPG via Google Drive link."
//                             className="textarea textarea-bordered h-24 rounded-xl focus:ring-2 ring-primary/20"
//                         ></textarea>
//                         {errors.instruction && <span className="text-error text-xs mt-1">{errors.instruction.message}</span>}
//                     </div>

//                     <div className="form-control">
//                         <label className="label-text font-bold mb-2 ml-1">Contest Deadline</label>
//                         <input
//                             type="date"
//                             {...register('deadline', { required: "Deadline is required" })}
//                             className="input input-bordered rounded-xl focus:ring-2 ring-primary/20"
//                         />
//                         {errors.deadline && <span className="text-error text-xs mt-1">{errors.deadline.message}</span>}
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     className="btn btn-primary w-full rounded-xl text-white font-bold text-lg mt-8 shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
//                 >
//                     <FaPlusCircle /> Add Contest
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddContest;