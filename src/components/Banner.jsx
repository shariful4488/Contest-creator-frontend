import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = ({ onSearch }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.search.value;
        onSearch(text); 
    };

    const slides = [
        {
            title: "Empower Your Creative Vision",
            desc: "Submit your best designs and get recognized by global industry leaders.",
            img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1920",
            btnText: "Graphic Design"
        },
        {
            title: "Code the Future of Tech",
            desc: "Showcase your development skills in the ultimate coding challenge.",
            img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920",
            btnText: "Coding Contest"
        },
        {
            title: "Master Business Strategy",
            desc: "Pitch your ideas and solve real-world problems for a chance to win.",
            img: "https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?q=80&w=1920",
            btnText: "Business Marketing"
        }
    ];

    return (
        <div className="relative w-full h-125 md:h-175">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="relative h-full w-full flex items-center justify-center bg-cover bg-center"
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.img})` }}
                        >
                            <div className="text-center text-white px-4">
                                <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                                    {slide.btnText}
                                </span>
                                <h1 className="text-4xl md:text-7xl font-black uppercase italic leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                                    {slide.desc}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-2xl">
                <form onSubmit={handleSubmit} className="flex bg-white p-2 rounded-full shadow-2xl">
                    <input 
                        name="search"
                        type="text" 
                        placeholder="Search by Category (e.g. Design, Coding)" 
                        className="w-full px-6 py-4 rounded-full border-none focus:ring-0 text-secondary font-bold"
                    />
                    <button className="bg-secondary text-white px-8 py-4 rounded-full font-black uppercase hover:bg-primary transition-all">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Banner;