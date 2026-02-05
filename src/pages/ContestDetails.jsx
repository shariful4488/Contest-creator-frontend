import { useLoaderData, useNavigate } from "react-router";
import { FaTrophy, FaUsers, FaTag, FaClock, FaAward, FaRocket, FaPaperPlane, FaUserTie } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ContestDetails = () => {
    const contest = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [timeLeft, setTimeLeft] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const {
        _id, contestName, image, description, prizeMoney, 
        deadline, contestCategory, participationCount, 
        winnerName, winnerImage, creatorName, creatorImage 
    } = contest;

    // পেমেন্ট চেক (এটি আপনার ব্যাকএন্ড অনুযায়ী অ্যাডজাস্ট করবেন)
    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/is-registered?email=${user.email}&contestId=${_id}`)
                .then(res => setIsRegistered(res.data.isRegistered));
        }
    }, [user, _id, axiosPublic]);

    // লাইভ কাউন্টডাউন
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(deadline).getTime();
            const distance = target - now;

            if (distance < 0) {
                setTimeLeft("CONTEST ENDED");
                clearInterval(timer);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${days}d ${hours}h ${mins}m left`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [deadline]);

    // ইমেজ স্লাইডার (মেইন ইমেজ + ২টা থিম ইমেজ)
    const sliderImages = [
        image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
    ];

    const handlePaymentRedirect = () => {
        if (timeLeft === "CONTEST ENDED") return;
        navigate(`/payment/${_id}`, { state: { prizeMoney, contestName } });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-outfit pb-20">
            {/* --- Hero Section with 3 Slides --- */}
            <div className="relative h-[550px] w-full group">
                <Swiper
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    className="h-full w-full"
                >
                    {sliderImages.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="relative h-full w-full">
                                <img src={img} className="w-full h-full object-cover" alt="contest-banner" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Banner Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20 max-w-7xl mx-auto px-6 pointer-events-none">
                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="bg-primary/90 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest shadow-xl">
                            <FaTag className="inline mr-2" /> {contestCategory}
                        </span>
                        <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest">
                            <FaUsers className="inline mr-2" /> {participationCount || 0} Participants
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase drop-shadow-2xl leading-tight">
                        {contestName}
                    </h1>
                </div>
            </div>

            {/* --- Main Content Grid --- */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-16 relative z-20">
                
                {/* Left: Details & Tasks */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Winner Announcement Card */}
                    {winnerName && (
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1 rounded-[40px] shadow-2xl animate-bounce-slow">
                            <div className="bg-white p-8 rounded-[38px] flex items-center gap-8">
                                <div className="relative">
                                    <img src={winnerImage} className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover" alt="winner" />
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full text-white"><FaTrophy /></div>
                                </div>
                                <div>
                                    <p className="text-yellow-600 font-black uppercase tracking-widest text-sm">Contest Winner</p>
                                    <h3 className="text-4xl font-black text-secondary italic uppercase">{winnerName}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-white/50">
                        {/* Creator Info */}
                        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100">
                            <img src={creatorImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="w-14 h-14 rounded-2xl object-cover" alt="creator" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Organized By</p>
                                <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                                    {creatorName} <FaUserTie className="text-primary text-sm" />
                                </h4>
                            </div>
                        </div>

                        <h2 className="text-4xl font-black text-secondary uppercase italic mb-6">
                            Contest <span className="text-primary">Overview</span>
                        </h2>
                        <p className="text-slate-500 text-xl leading-loose font-medium mb-12">
                            {description}
                        </p>

                        {/* Task Submission Section */}
                        {isRegistered && timeLeft !== "CONTEST ENDED" ? (
                            <div className="bg-slate-900 p-10 rounded-[40px] text-white">
                                <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                                    <FaPaperPlane className="text-primary" /> Submit Your Task
                                </h3>
                                <p className="text-slate-400 mb-6 text-sm">Please provide your project links or documentation below.</p>
                                <form className="space-y-4">
                                    <textarea className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white focus:border-primary outline-none min-h-[150px]" placeholder="Link of your work (GitHub, Drive, etc.)"></textarea>
                                    <button className="w-full py-5 bg-primary hover:bg-white hover:text-primary text-white font-black rounded-3xl transition-all uppercase tracking-widest">
                                        Submit Submission
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 bg-slate-50 rounded-[35px] border border-slate-100 flex gap-4">
                                    <FaRocket className="text-primary text-3xl" />
                                    <div>
                                        <h4 className="font-black text-secondary uppercase text-sm">Fast Track</h4>
                                        <p className="text-xs text-slate-400">Review within 48 hours</p>
                                    </div>
                                </div>
                                <div className="p-8 bg-slate-50 rounded-[35px] border border-slate-100 flex gap-4">
                                    <FaAward className="text-orange-500 text-3xl" />
                                    <div>
                                        <h4 className="font-black text-secondary uppercase text-sm">Verified</h4>
                                        <p className="text-xs text-slate-400">Blockchain certificates</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Action Card */}
                <div className="relative">
                    <div className="bg-white p-10 rounded-[50px] shadow-2xl sticky top-24 border border-white">
                        <div className="text-center mb-10">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[4px] mb-2">Winner's Prize</p>
                            <h2 className="text-6xl font-black text-primary italic">${prizeMoney}</h2>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-primary" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase">Deadline</span>
                                </div>
                                <span className={`text-xs font-black ${timeLeft.includes("ENDED") ? "text-red-500" : "text-secondary"}`}>
                                    {timeLeft}
                                </span>
                            </div>
                        </div>

                        {!isRegistered ? (
                            <button 
                                onClick={handlePaymentRedirect}
                                disabled={timeLeft === "CONTEST ENDED"}
                                className="w-full py-6 bg-secondary hover:bg-primary text-white font-black rounded-[30px] shadow-2xl shadow-secondary/20 transition-all active:scale-95 uppercase tracking-widest disabled:bg-slate-300"
                            >
                                {timeLeft === "CONTEST ENDED" ? "Registration Closed" : "Register Now"}
                            </button>
                        ) : (
                            <div className="text-center p-4 bg-green-100 rounded-2xl border border-green-200">
                                <p className="text-green-600 font-black uppercase text-xs italic">✓ You are Registered</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;