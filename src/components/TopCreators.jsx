const TopCreators = () => {
    const creators = [
        { id: 1, name: "Tech Giant Ltd", contests: 12, img: "https://i.ibb.co.com/F0PZ9xG/c1.jpg" },
        { id: 2, name: "Creative Agency", contests: 8, img: "https://i.ibb.co.com/j4q4Xp4/c2.jpg" },
        { id: 3, name: "Soft It", contests: 15, img: "https://i.ibb.co.com/vHq4Xp4/c3.jpg" },
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-black text-secondary mb-12 uppercase">Top <span className="text-primary">Creators</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {creators.map(creator => (
                        <div key={creator.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
                            <img src={creator.img} className="w-16 h-16 rounded-full object-cover" alt="" />
                            <div className="text-left">
                                <h4 className="font-bold text-secondary">{creator.name}</h4>
                                <p className="text-sm text-slate-500">{creator.contests} Contests Hosted</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default TopCreators;