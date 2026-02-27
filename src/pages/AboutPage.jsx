import React from 'react';
import { motion } from "framer-motion"; 
import { FaUsers, FaTrophy, FaRocket, FaGlobe } from "react-icons/fa";

const AboutPage = () => {
    const stats = [
        { id: 1, icon: <FaUsers />, count: "50K+", label: "Active Users" },
        { id: 2, icon: <FaTrophy />, count: "1.2K+", label: "Contests Hosted" },
        { id: 3, icon: <FaRocket />, count: "500+", label: "Daily Entries" },
        { id: 4, icon: <FaGlobe />, count: "25+", label: "Countries" },
    ];

    return (
        <div className="font-outfit bg-base-100">
            <section className="relative py-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                        We Empower <span className="text-primary">Creativity</span>
                    </h1>
                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
                        Our platform is designed for dreamers, doers, and winners. We connect talent with opportunities through competitive excellence.
                    </p>
                </div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                            alt="Team working" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase italic">
                            Our <span className="text-primary">Story</span>
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Founded in 2024, our mission is to build the world's most transparent and engaging contest platform. We believe that everyone has a unique skill that deserves recognition.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Whether you're a designer, coder, or writer, we provide the stage for you to shine, compete with the best, and win rewards that truly matter.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <button className="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/30">Learn More</button>
                            <button className="btn btn-outline border-primary text-primary rounded-2xl px-8 hover:bg-primary hover:border-primary">Our Values</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map(stat => (
                            <div key={stat.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 text-center shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="text-primary text-3xl flex justify-center mb-4">{stat.icon}</div>
                                <h3 className="text-4xl font-black text-secondary tracking-tighter">{stat.count}</h3>
                                <p className="text-slate-500 font-bold uppercase text-xs mt-2 tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase italic">
                        Why Choose <span className="text-primary">Our Platform?</span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="p-10 bg-white rounded-[2rem] border-2 border-slate-100 hover:border-primary/20 transition-all group">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                            <FaTrophy />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Secure Payments</h4>
                        <p className="text-slate-500">All prize distributions are handled securely via Stripe with 100% transparency.</p>
                    </div>
                    <div className="p-10 bg-white rounded-[2rem] border-2 border-slate-100 hover:border-primary/20 transition-all group">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                            <FaUsers />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Expert Mentors</h4>
                        <p className="text-slate-500">Get your work reviewed by industry experts and gain valuable feedback to grow.</p>
                    </div>
                    <div className="p-10 bg-white rounded-[2rem] border-2 border-slate-100 hover:border-primary/20 transition-all group">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                            <FaRocket />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Fast Paced</h4>
                        <p className="text-slate-500">No long waiting periods. We process contest results within the shortest time possible.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;