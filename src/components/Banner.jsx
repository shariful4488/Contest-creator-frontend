// import { useState } from "react";

// const Banner = () => {
//     const [search, setSearch] = useState("");

//     const handleSearch = () => {
//         // এই ফাংশনটি আমরা পরে ডাটাবেস থেকে সার্চ করার জন্য ব্যবহার করব
//         console.log("Searching for category:", search);
//     };

//     return (
//         <div className="relative min-h-[550px] md:min-h-[650px] flex items-center justify-center bg-secondary overflow-hidden">
//             {/* Background Aesthetic Shapes */}
//             <div className="absolute inset-0 z-0">
//                 <div className="absolute top-[-10%] left-[-5%] w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
//                 <div className="absolute bottom-[-10%] right-[-5%] w-72 md:w-96 h-72 md:h-96 bg-accent/20 rounded-full blur-[100px]"></div>
//                 {/* Grid Pattern Overlay */}
//                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
//             </div>

//             <div className="relative z-10 container mx-auto px-6 text-center">
//                 {/* Badge */}
//                 <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
//                     <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">The Ultimate Contest Arena</span>
//                 </div>

//                 {/* Main Heading */}
//                 <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase mb-6">
//                     Win the <span className="text-primary italic">Contest</span> <br />
//                     Lead the <span className="underline decoration-accent underline-offset-8">World</span>
//                 </h1>

//                 {/* Subtitle */}
//                 <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium mb-10 font-outfit">
//                     Join thousands of creators, developers, and designers. 
//                     Showcase your talent, win amazing prizes, and get recognized globally.
//                 </p>
//                 <div className="max-w-3xl mx-auto">
//                     <div className="group relative flex flex-col md:flex-row items-center bg-white p-2 rounded-2xl md:rounded-[2rem] shadow-2xl transition-all focus-within:ring-4 ring-primary/20">
//                         <div className="flex-1 flex items-center w-full px-4">
//                             <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                             <input
//                                 type="text"
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 placeholder="Search by Contest Type (e.g. Image Design, Coding...)"
//                                 className="w-full bg-transparent py-4 md:py-5 px-4 text-secondary outline-none font-bold text-base md:text-lg placeholder-slate-400"
//                             />
//                         </div>
//                         <button 
//                             onClick={handleSearch}
//                             className="w-full md:w-auto bg-secondary hover:bg-slate-800 text-white px-10 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg"
//                         >
//                             Search
//                         </button>
//                     </div>

//                     <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
//                         <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Trending:</span>
//                         {['Business', 'Medical', 'Gaming', 'Creative'].map((tag) => (
//                             <button key={tag} className="text-xs font-bold text-slate-300 hover:text-primary transition-colors border-b border-white/10 hover:border-primary">
//                                 #{tag}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;