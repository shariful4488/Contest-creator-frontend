import React from 'react';
import { FaUserPlus, FaGamepad, FaTrophy } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Create Account",
            desc: "Join our community of creators and thinkers in just a few clicks.",
            icon: <FaUserPlus />,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            id: 2,
            title: "Join Contest",
            desc: "Choose from various categories and submit your best creative work.",
            icon: <FaGamepad />,
            bgColor: "bg-purple-50",
            iconColor: "text-purple-500"
        },
        {
            id: 3,
            title: "Win & Earn",
            desc: "Get recognized by experts and win exciting prize money and badges.",
            icon: <FaTrophy />,
            bgColor: "bg-orange-50",
            iconColor: "text-orange-500"
        }
    ];

    return (
        <section className="py-24 bg-white font-outfit">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase italic tracking-tight">
                        How It <span className="text-primary">Works</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-100 -z-10"></div>

                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center text-center group">
                            <div className={`w-20 h-20 ${step.bgColor} ${step.iconColor} rounded-[2rem] flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-white outline outline-4 outline-slate-50`}>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-black text-secondary mb-3 italic uppercase">
                                {step.id}. {step.title}
                            </h3>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;