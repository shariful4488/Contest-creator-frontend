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
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="mb-8 text-center sm:text-left border-l-4 border-primary pl-4">
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-tight">
          My <span className="text-primary">Participations</span>
        </h2>
        <p className="text-gray-500 mt-1 text-sm md:text-base">Track your registrations and submit your work.</p>
      </div>

      {participations.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead className="bg-gray-900 text-white hidden md:table-header-group">
                <tr>
                  <th className="py-5 pl-6 font-bold uppercase text-xs">#</th>
                  <th className="font-bold uppercase text-xs">Contest Name</th>
                  <th className="font-bold uppercase text-xs text-center">Status</th>
                  <th className="font-bold uppercase text-xs">Deadline</th>
                  <th className="font-bold uppercase text-xs">TrxID</th>
                  <th className="font-bold uppercase text-xs text-center pr-6">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {participations.map((item, index) => (
                  <tr key={item._id} className="hover:bg-blue-50/30 transition-colors flex flex-col md:table-row py-4 md:py-0 px-6 md:px-0 relative">
                    <td className="md:table-cell md:pl-6 py-2 md:py-6">
                      <span className="md:hidden font-bold text-gray-400 mr-2">#{index + 1}</span>
                      <span className="hidden md:inline font-medium text-gray-500">{index + 1}</span>
                    </td>

                    <td className="md:table-cell py-1 md:py-6">
                      <div className="font-black text-gray-800 text-lg md:text-base leading-tight">
                        {item.contestName}
                      </div>
                    </td>

                    <td className="md:table-cell md:text-center py-2 md:py-6">
                      <div className={`badge badge-md gap-2 border-none py-3 px-4 text-white font-bold text-[10px] uppercase tracking-wider
                        ${item.status === 'Completed' ? 'bg-indigo-500' : 'bg-green-500'}`}>
                        {item.status}
                      </div>
                    </td>

                    <td className="md:table-cell py-1 md:py-6">
                      <div className="flex flex-col">
                        <span className="md:hidden text-[10px] uppercase text-gray-400 font-bold">Deadline:</span>
                        <span className="text-sm font-semibold text-gray-600 italic">
                          {item.deadline ? new Date(item.deadline).toLocaleDateString() : "TBA"}
                        </span>
                      </div>
                    </td>

                    <td className="md:table-cell py-1 md:py-6">
                       <div className="flex flex-col">
                        <span className="md:hidden text-[10px] uppercase text-gray-400 font-bold">Transaction ID:</span>
                        <span className="font-mono text-[10px] md:text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-md w-fit">
                          {item.transactionId}
                        </span>
                      </div>
                    </td>

                    <td className="md:table-cell py-4 md:py-6 md:text-center md:pr-6">
                      {item.submittedTask ? (
                        <button
                          disabled
                          className="btn btn-sm w-full md:w-auto bg-gray-100 text-gray-400 border-none cursor-not-allowed"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Submitted
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTaskSubmit(item._id)}
                          className="btn btn-sm w-full md:w-auto btn-primary shadow-lg shadow-blue-200 rounded-lg hover:scale-105 transition-transform"
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
        <div className="bg-white rounded-3xl p-16 text-center shadow-inner border border-dashed border-gray-200">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-400">No Contests Found!</h3>
          <p className="text-gray-400 mt-2">You haven't participated in any contests yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyParticipated;