const Winner = () => {
    // আপাতত আমরা ডামি ডাটা ব্যবহার করছি, পরে এটি ডাটাবেস থেকে আসবে
    const winners = [
        {
            id: 1,
            name: "Ariful Islam",
            contest: "Logo Design Masterclass",
            image: "https://i.ibb.co.com/mR70FvK/winner1.jpg", // এখানে আপনার ইমেজলিন্ক দিন
            prize: "$500"
        },
        {
            id: 2,
            name: "Nabil Ahmed",
            contest: "UI/UX Challenge",
            image: "https://i.ibb.co.com/yR0xLzV/winner2.jpg",
            prize: "$350"
        },
        {
            id: 3,
            name: "Sumaiya Jahan",
            contest: "Nature Photography",
            image: "https://i.ibb.co.com/8m4Qk6K/winner3.jpg",
            prize: "$200"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-secondary tracking-tight uppercase">
                        Our Hall of <span className="text-primary italic">Fame</span>
                    </h2>
                    <p className="text-slate-500 mt-3 font-medium">Meet the brilliant minds who conquered our challenges</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {winners.map((winner) => (
                        <div key={winner.id} className="group relative">
                            {/* Card Background Decoration */}
                            <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-300"></div>
                            
                            <div className="relative bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
                                {/* Winner Image */}
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <img 
                                        src={winner.image} 
                                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                                        alt={winner.name} 
                                    />
                                    <div className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    </div>
                                </div>

                                <h4 className="text-2xl font-black text-secondary">{winner.name}</h4>
                                <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">{winner.contest}</p>
                                
                                <div className="mt-6 pt-6 border-t border-slate-50">
                                    <span className="text-xs font-bold text-slate-400 uppercase italic">Prize Won</span>
                                    <p className="text-3xl font-black text-secondary">{winner.prize}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Winner;