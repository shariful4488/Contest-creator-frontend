import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const MyParticipated = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { data: participations = [], isLoading, refetch } = useQuery({
    queryKey: ["my-participations", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/my-participations/${user?.email}`);
      return res.data.sort((a, b) => {
        const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
        const dateB = b.deadline ? new Date(b.deadline) : new Date(0);
        return dateA - dateB;
      });
    },
    enabled: !!user?.email,
  });
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");
    const contestId = query.get("contestId");

    if (sessionId && contestId) {
      axiosSecure.post("/verify-payment", { sessionId, contestId })
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              title: "Payment Successful!",
              text: "Registration recorded successfully.",
              icon: "success",
              confirmButtonColor: "#3085d6"
            });
            window.history.replaceState({}, document.title, window.location.pathname);
            refetch();
          }
        })
        .catch(err => console.error("Verification failed", err));
    }
  }, [location, axiosSecure, refetch]);

  const handleTaskSubmit = async (id) => {
    const { value: taskLink } = await Swal.fire({
      title: "Submit Your Task",
      input: "url",
      inputLabel: "Provide your project/task link (GitHub/Drive)",
      inputPlaceholder: "Enter the URL here",
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "#3085d6",
      inputValidator: (value) => {
        if (!value) return "Submission link is required!";
      }
    });

    if (taskLink) {
      try {
        const res = await axiosSecure.patch(`/submit-task/${id}`, { taskLink });

        if (res.data.success || res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Task submitted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
          refetch(); 
        }
      } catch (error) {
        console.error("Submission error:", error);
        Swal.fire("Error", "Submission failed. Please try again.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 font-outfit">
      <div className="mb-8 border-l-4 border-primary pl-4">
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 uppercase">
          My <span className="text-primary">Participations</span>
        </h2>
        <p className="text-gray-500 mt-1 text-sm">Track registrations and submit your work.</p>
      </div>

      {participations.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="py-4 pl-6">#</th>
                  <th>Contest Name</th>
                  <th className="text-center">Status</th>
                  <th>Deadline</th>
                  <th>TrxID</th>
                  <th className="text-center pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {participations.map((item, index) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="pl-6 font-medium text-gray-400">{index + 1}</td>
                    <td><div className="font-bold text-gray-800">{item.contestName}</div></td>
                    <td className="text-center">
                      <span className={`badge badge-sm font-bold uppercase p-3 border-none text-white 
                        ${item.status === 'Completed' || item.submittedTask ? 'bg-indigo-500' : 'bg-green-500'}`}>
                        {item.submittedTask ? 'Submitted' : item.status}
                      </span>
                    </td>
                    <td className="text-sm italic text-gray-600">
                      {item.deadline ? new Date(item.deadline).toLocaleDateString() : "TBA"}
                    </td>
                    <td>
                      <span className="font-mono text-[10px] text-blue-500 bg-blue-50 px-2 py-1 rounded">
                        {item.transactionId}
                      </span>
                    </td>
                    <td className="text-center pr-6">
                      {item.submittedTask ? (
                        <button disabled className="btn btn-xs bg-gray-100 text-gray-400 border-none cursor-not-allowed">
                          ✓ Submitted
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTaskSubmit(item._id)}
                          className="btn btn-xs btn-primary shadow-md hover:scale-105"
                        >
                          Submit Task
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
          <h3 className="text-xl font-bold text-slate-400">No Participations Found!</h3>
        </div>
      )}
    </div>
  );
};

export default MyParticipated;