import React from 'react';

const TopCreators = () => {
    
    const creators = [
        {
            id: 1,
            name: "Alexander Vance",
            role: "Senior Tech Organizer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500",
            contests: 45,
            rating: "4.9"
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            role: "Creative Arts Director",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500",
            contests: 38,
            rating: "5.0"
        },
        {
            id: 3,
            name: "David Miller",
            role: "Business Strategist",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500",
            contests: 32,
            rating: "4.8"
        }
    ];

    return (
        <div className="py-24 bg-white font-outfit">
            <div className="container mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="text-left">
                        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Expert Panel</span>
                        <h2 className="text-4xl md:text-5xl font-black text-secondary italic uppercase mt-2">
                            Top <span className="text-primary">Creators</span>
                        </h2>
                    </div>
                    <p className="max-w-md text-slate-400 font-medium md:text-right">
                        The visionary minds behind the most impactful contests on our platform.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {creators.map((creator) => (
                        <div key={creator.id} className="group relative">
                            <div className="bg-slate-50 rounded-[2.5rem] p-8 pt-20 transition-all duration-500 hover:bg-secondary hover:shadow-2xl hover:shadow-secondary/30 group-hover:-translate-y-4">
                                
                                <div className="absolute -top-10 left-10">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-4xl overflow-hidden border-8 border-white shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                        <img 
                                            src={creator.image} 
                                            alt={creator.name} 
                                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-2xl font-black text-secondary group-hover:text-white transition-colors">
                                        {creator.name}
                                    </h3>
                                    <p className="text-primary font-bold text-sm mb-6 uppercase tracking-widest">
                                        {creator.role}
                                    </p>

                                    <div className="flex justify-between items-center bg-white/50 group-hover:bg-white/10 p-4 rounded-2xl backdrop-blur-sm transition-colors">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 group-hover:text-white/50 uppercase">Created</p>
                                            <p className="text-xl font-black text-secondary group-hover:text-white">{creator.contests} Contests</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 group-hover:text-white/50 uppercase">Rating</p>
                                            <p className="text-xl font-black text-primary italic">★ {creator.rating}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <div className="w-12 h-12 rounded-full border border-slate-200 group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopCreators;