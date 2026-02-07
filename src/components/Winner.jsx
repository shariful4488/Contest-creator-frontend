import React from 'react';
import { FaCheckCircle, FaTrophy, FaDollarSign, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';

const Winner = () => {
    const recentWinners = [
        {
            name: "Emily Watson",
            prize: "$2,500",
            contest: "Global Design Hunt",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400"
        },
        {
            name: "Ariful Islam",
            prize: "$1,800",
            contest: "Code Sprint 2024",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
        }
    ];

    return (
        <div className="py-24 bg-white relative overflow-hidden font-outfit">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-20 hidden lg:block"></div>

            <div className="container mx-auto px-4 md:px-10 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">       
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                            <FaTrophy /> Join the Hall of Fame
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-secondary uppercase italic leading-[1.1] mt-6">
                            Your <span className="text-primary">Victory</span> <br /> 
                            Starts Right Here.
                        </h2>
                        <p className="text-slate-500 text-lg mt-6 mb-10 max-w-xl mx-auto lg:mx-0">
                            Stop waiting for the perfect moment. Hundreds of creators have already turned their talent into massive rewards. Are you next?
                        </p>


                        <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 mb-10">
                            <div className="text-center lg:text-left">
                                <p className="text-4xl font-black text-secondary italic">1.2k+</p>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Total Winners</p>
                            </div>
                            <div className="text-center lg:text-left border-x border-slate-200 px-8 md:px-12">
                                <p className="text-4xl font-black text-primary italic">$250k</p>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Prizes Given</p>
                            </div>
                        </div>

                        <button className="group btn btn-secondary px-10 py-4 rounded-full font-black uppercase italic tracking-widest hover:bg-primary hover:text-secondary transition-all shadow-xl shadow-secondary/20 flex items-center gap-3 mx-auto lg:mx-0">
                            Start Competing Now <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-6 items-center relative">
                        {recentWinners.map((winner, idx) => (
                            <div 
                                key={idx} 
                                className={`w-full sm:w-64 bg-white rounded-[2.5rem] p-6 shadow-2xl shadow-slate-200 border border-slate-50 transition-transform duration-500 hover:-translate-y-4 ${idx === 1 ? 'sm:mt-16' : ''}`}
                            >
                                <div className="relative mb-6">
                                    <img 
                                        src={winner.img} 
                                        className="w-full aspect-square object-cover rounded-4xl shadow-lg" 
                                        alt={winner.name} 
                                    />
                                    <div className="absolute -bottom-3 -right-3 bg-primary w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-secondary text-xl">
                                        <FaDollarSign />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-secondary">{winner.name}</h4>
                                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-4">{winner.contest}</p>
                                
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Won Prize</p>
                                        <p className="text-xl font-black text-secondary italic leading-none mt-1">{winner.prize}</p>
                                    </div>
                                    <FaCheckCircle className="text-green-500 text-xl" />
                                </div>
                            </div>
                        ))}

                        <div className="hidden xl:block absolute -right-10 top-20 animate-bounce duration-3000">
                             <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
                                    <FaCheckCircle />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-secondary uppercase">Success Verified</p>
                                    <p className="text-[10px] text-slate-400">Join 20k+ Members</p>
                                </div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Winner;