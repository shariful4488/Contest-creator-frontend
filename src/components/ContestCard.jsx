import { Link } from "react-router"; 

const ContestCard = ({ contest }) => {
   
    const { _id, contestName, image, participationCount, description, prizeMoney, contestCategory } = contest;

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden font-outfit h-full flex flex-col">
            {/* Image Section */}
            <div className="relative h-60 overflow-hidden">
                <img 
                    src={image} 
                    alt={contestName} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                {/* Prize Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-secondary uppercase shadow-lg border border-white/50">
                    ${prizeMoney || '00'}
                </div>
                {/* Category Badge */}
                {contestCategory && (
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {contestCategory}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-xl uppercase tracking-wider">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        {participationCount || 0} Joined
                    </span>
                </div>

                <h3 className="text-xl font-black text-secondary mb-3 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {contestName}
                </h3>
                
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed flex-grow">
                    {description}
                </p>

                {/* Action Button */}
                <Link to={`/contest-details/${_id}`} className="mt-auto">
                    <button className="w-full py-4 bg-secondary group-hover:bg-primary text-white font-bold rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-primary/40 active:scale-95 uppercase text-xs tracking-widest">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContestCard;