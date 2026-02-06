import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddContest = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        const imageFile = new FormData();
        imageFile.append('image', data.image[0]);

        try {
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const imageUrl = res.data.data.display_url;

                const contestItem = {
                    contestName: data.name,
                    image: imageUrl,
                    price: parseFloat(data.price),
                    prizeMoney: parseFloat(data.prizeMoney),
                    contestDescription: data.description,
                    taskSubmissionInstruction: data.instruction,
                    contestCategory: data.category,
                    contestDeadline: data.deadline,
                    creatorEmail: user?.email,
                    creatorName: user?.displayName,
                    participationCount: 0,
                    status: 'pending'
                };

                const contestRes = await axiosSecure.post('/contests', contestItem);

                if (contestRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} contest added successfully!`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.message || "Failed to add contest.",
                confirmButtonText: "Ok"
            });
        }
    };

    return (
        <div className="font-outfit">
            <h2 className="text-3xl font-black text-secondary uppercase italic mb-8">
                Create a New <span className="text-primary">Contest</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1">Contest Name</label>
                        <input
                            type="text"
                            {...register('name', { required: "Contest Name is required" })}
                            placeholder="e.g., Creative Logo Design"
                            className="input input-bordered rounded-xl focus:ring-2 ring-primary/20"
                        />
                        {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1">Contest Image</label>
                        <input
                            type="file"
                            {...register('image', { required: "Contest Image is required" })}
                            className="file-input file-input-bordered file-input-primary w-full rounded-xl"
                        />
                        {errors.image && <span className="text-error text-xs mt-1">{errors.image.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1">Contest Price</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('price', { required: "Required", min: 0 })}
                            placeholder="$50"
                            className="input input-bordered rounded-xl"
                        />
                        {errors.price && <span className="text-error text-xs mt-1">Required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1">Prize Money</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('prizeMoney', { required: "Required", min: 0 })}
                            placeholder="$200"
                            className="input input-bordered rounded-xl"
                        />
                        {errors.prizeMoney && <span className="text-error text-xs mt-1">Required</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1">Description</label>
                        <textarea
                            {...register('description', { required: "Required" })}
                            className="textarea textarea-bordered h-24 rounded-xl"
                        ></textarea>
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1">Category</label>
                        <select
                            {...register('category', { required: "Required" })}
                            className="select select-bordered rounded-xl"
                        >
                            <option value="">Select a Category</option>
                            <option value="Image Design">Image Design</option>
                            <option value="Article Writing">Article Writing</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Photography">Photography</option>
                            <option value="Web Design">Web Design</option>
                            <option value="Video Editing">Video Editing</option>
                            <option value="Coding">Coding Challenge</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1">Instructions</label>
                        <textarea
                            {...register('instruction', { required: "Required" })}
                            className="textarea textarea-bordered h-24 rounded-xl"
                        ></textarea>
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-2 ml-1">Deadline</label>
                        <input
                            type="date"
                            {...register('deadline', { required: "Required" })}
                            className="input input-bordered rounded-xl"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full rounded-xl text-white font-bold text-lg mt-8 flex items-center justify-center gap-2"
                >
                    <FaPlusCircle /> Add Contest
                </button>
            </form>
        </div>
    );
};

export default AddContest;