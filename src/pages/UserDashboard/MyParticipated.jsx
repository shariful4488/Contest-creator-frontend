import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyParticipated = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  // ১. ডেটা ফেচিং এবং সর্টিং (Upcoming Deadline অনুযায়ী)
  const { data: participations = [], isLoading, refetch } = useQuery({
    queryKey: ["my-participations", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/my-participations/${user?.email}`);
      
      // রিকোয়ারমেন্ট: ডেডলাইন অনুযায়ী সর্ট করা
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
      input: "textarea",
      inputLabel: "Provide your project/task link (GitHub/Drive)",
      inputPlaceholder: "Paste your link here...",
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
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Task submitted successfully.", "success");
          refetch(); 
        }
      } catch (error) {
        Swal.fire("Error", "Submission failed. Try again.", "error");
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
    <div className="p-4 md:p-8">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800">My Participated Contests</h2>
        <p className="text-gray-500 mt-2">Track your registrations and submit your work.</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
        <table className="table w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-700">
              <th>#</th>
              <th>Contest Name</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Transaction ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {participations.length > 0 ? (
              participations.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50 border-b last:border-0">
                  <td>{index + 1}</td>
                  <td className="font-bold text-gray-800">{item.contestName}</td>
                  <td>
                    <div className="badge badge-success text-white px-3 font-semibold">
                      {item.status}
                    </div>
                  </td>
                  <td className="text-sm font-medium text-gray-600">
                    {item.deadline ? new Date(item.deadline).toLocaleDateString() : "TBA"}
                  </td>
                  <td className="font-mono text-xs text-blue-600">
                    {item.transactionId}
                  </td>
                  <td>
                    {/* সাবমিটেড হয়ে গেলে বাটন চেঞ্জ হবে */}
                    {item.submittedTask ? (
                      <button
                        disabled
                        className="btn btn-success btn-sm rounded-lg text-white disabled:bg-green-500 disabled:text-white disabled:opacity-70"
                      >
                        Submitted
                      </button>
                    ) : (
                      <button
                        onClick={() => handleTaskSubmit(item._id)}
                        className="btn btn-primary btn-sm rounded-lg shadow-sm"
                      >
                        Submit Task
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-20 text-gray-400">
                  You haven't participated in any contests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParticipated;