import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxios";
import Swal from "sweetalert2";

const UpdateContest = () => {
    const contest = useLoaderData(); // রাউটার থেকে কন্টেস্টের ডাটা লোড হবে
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const updatedDoc = {
            contestName: data.name,
            contestCategory: data.category,
            image: data.image,
            description: data.description,
            prizeMoney: parseFloat(data.prize),
            deadline: data.deadline
        };

        const res = await axiosPublic.put(`/contests/${contest._id}`, updatedDoc);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Contest updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/myCreated-contests');
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 font-outfit">
            <h2 className="text-3xl font-black text-secondary uppercase italic mb-6">Update <span className="text-primary">Contest</span></h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-600">Contest Name</label>
                        <input type="text" defaultValue={contest.contestName} {...register("name")} className="input input-bordered rounded-xl" required />
                    </div>
                    {/* Category */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-600">Category</label>
                        <select defaultValue={contest.contestCategory} {...register("category")} className="select select-bordered rounded-xl">
                            <option value="Image Design">Image Design</option>
                            <option value="Article Writing">Article Writing</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Digital Advertisement">Digital Advertisement</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-600">Image URL</label>
                        <input type="text" defaultValue={contest.image} {...register("image")} className="input input-bordered rounded-xl" />
                    </div>
                    {/* Deadline */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-600">Deadline</label>
                        <input type="date" defaultValue={contest.deadline} {...register("deadline")} className="input input-bordered rounded-xl" required />
                    </div>
                </div>

                {/* Prize */}
                <div className="form-control">
                    <label className="label font-bold text-slate-600">Prize Money</label>
                    <input type="number" defaultValue={contest.prizeMoney} {...register("prize")} className="input input-bordered rounded-xl" required />
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label font-bold text-slate-600">Description</label>
                    <textarea defaultValue={contest.description} {...register("description")} className="textarea textarea-bordered rounded-xl h-24" required></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full text-white font-bold rounded-xl mt-4">Save Changes</button>
            </form>
        </div>
    );
};

export default UpdateContest;