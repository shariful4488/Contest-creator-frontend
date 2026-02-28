import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure"; 
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "./CountdownTimer";
import { FaTrophy, FaUsers, FaInfoCircle, FaStar, FaArrowLeft } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ContestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [activeTab, setActiveTab] = useState('description');
    const navigate = useNavigate();

    // ডাটা ফেচিং (শুধুমাত্র লগইন ইউজারদের জন্য Secure API)
    const { data: contest = {}, isLoading, isError } = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    // একই ক্যাটাগরির অন্যান্য কনটেস্ট
    const { data: relatedContests = [] } = useQuery({
        queryKey: ['related-contests', contest?.category],
        enabled: !!contest?.category,
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-contests?category=${contest.category}&size=4`);
            return res.data.contests.filter(c => c._id !== id);
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div className="py-20 text-center font-black uppercase text-error">Contest not found or Access Denied!</div>;

    const {
        _id, contestName, image, gallery = [], contestDescription, 
        price, prizeMoney, participationCount, contestDeadline, 
        winnerName, winnerImage, category
    } = contest;

    const allImages = [image, ...(gallery || [])].filter(Boolean);
    const isDeadlineOver = contestDeadline ? new Date() > new Date(contestDeadline) : false;

    return (
        <div className="bg-[#FBFCFE] min-h-screen font-outfit pb-20">
            {/* Header / Back Button */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold uppercase text-[10px] tracking-[0.2em] transition-all">
                    <FaArrowLeft /> Back to Explore
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* --- Left Column: Media & Content --- */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Image Slider */}
                    <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-slate-100">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 4000 }}
                            className="rounded-[2rem] overflow-hidden aspect-video shadow-inner"
                        >
                            {allImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={img} className="w-full h-full object-cover" alt="Contest" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="flex border-b border-slate-100">
                            {['description', 'specifications', 'reviews'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        
                        <div className="p-8 md:p-10">
                            {activeTab === 'description' && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h3 className="text-2xl font-black text-secondary uppercase italic leading-none">Contest Overview</h3>
                                    <p className="text-slate-500 leading-relaxed text-lg">{contestDescription}</p>
                                </div>
                            )}

                            {activeTab === 'specifications' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                                    <InfoCard label="Category" value={category} />
                                    <InfoCard label="Participation" value={`${participationCount || 0} People`} />
                                    <InfoCard label="Difficulty" value="Intermediate" />
                                    <InfoCard label="Platform" value="ContestHub Official" />
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="text-center py-10 opacity-40 animate-fadeIn">
                                    <FaStar className="text-5xl mx-auto mb-4 text-orange-300" />
                                    <p className="font-black uppercase tracking-widest text-xs">No reviews yet for this contest</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Sidebar Actions --- */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-primary/10 sticky top-10">
                        <div className="mb-6">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Total Prize Pool</span>
                            <h2 className="text-5xl font-black text-secondary mt-1">${prizeMoney}</h2>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Entry Fee</span>
                                <span className="text-xl font-black text-primary">${price}</span>
                            </div>
                        </div>

                        {/* Deadline Timer */}
                        <div className="mb-8 p-6 bg-secondary rounded-[2rem] text-white">
                            <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-3 text-center">Registration Closing In</p>
                            <CountdownTimer deadline={contestDeadline} />
                        </div>

                        {/* Action Button */}
                        {winnerName ? (
                             <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                                <img src={winnerImage} className="w-12 h-12 rounded-full border-2 border-emerald-500" alt="" />
                                <div>
                                    <p className="text-[8px] font-black text-emerald-600 uppercase">Winner Announced</p>
                                    <p className="font-black text-secondary">{winnerName}</p>
                                </div>
                             </div>
                        ) : (
                            <Link to={`/payment/${_id}`} state={{ price, name: contestName }} className="w-full block">
                                <button 
                                    disabled={isDeadlineOver}
                                    className="btn btn-primary btn-block h-20 rounded-[1.5rem] text-white font-black uppercase tracking-widest shadow-lg shadow-primary/30 disabled:bg-slate-200"
                                >
                                    {isDeadlineOver ? "Entry Closed" : "Enroll Now"}
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Related Items */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-secondary uppercase italic ml-2">You might also like</h4>
                        {relatedContests.map(item => (
                            <Link to={`/contest/${item._id}`} key={item._id} className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-slate-100 hover:border-primary/30 transition-all group">
                                <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                                <div className="flex-1">
                                    <p className="font-bold text-secondary text-xs truncate uppercase">{item.contestName}</p>
                                    <p className="text-[10px] font-black text-primary">${item.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component for Specifications
const InfoCard = ({ label, value }) => (
    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="font-black text-secondary text-sm">{value}</span>
    </div>
);

export default ContestDetails;