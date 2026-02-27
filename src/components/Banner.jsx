import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.search.value.trim();
    if (text) onSearch(text);
  };

  const slides = [
    {
      title: "Unleash Creativity",
      desc: "Compete in design challenges and showcase your talent to industry leaders.",
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1920",
      tag: "Graphic Design"
    },
    {
      title: "Build the Future",
      desc: "Solve real-world problems and prove your skills in coding contests.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920",
      tag: "Coding Contest"
    },
    {
      title: "Pitch Bold Ideas",
      desc: "Compete with sharp minds worldwide and win recognition for your strategies.",
      img: "https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?q=80&w=1920",
      tag: "Business Marketing"
    }
  ];

  return (
    <section className="relative w-full h-[65vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${slide.img})`
              }}
            >
              <div className="text-center text-white px-6 max-w-3xl animate-fadeIn">
                <span className="bg-primary text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block shadow-lg">
                  {slide.tag}
                </span>
                <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-200 max-w-xl mx-auto mb-10 font-medium">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Search Bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-md p-2 rounded-2xl md:rounded-full border border-white/20 shadow-2xl"
        >
          <label htmlFor="search" className="sr-only">Search Contests</label>
          <div className="flex-1 w-full relative">
            <input
              id="search"
              name="search"
              type="text"
              required
              autoComplete="off"
              placeholder="Search by Contest Category..."
              className="w-full bg-white px-8 py-4 rounded-xl md:rounded-full border-none focus:ring-4 focus:ring-primary/30 text-slate-800 font-bold placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto mt-2 md:mt-0 md:ml-2 bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl md:rounded-full font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl"
          >
            Search
          </button>
        </form>
        <p className="text-white/60 text-center mt-4 text-xs font-bold uppercase tracking-widest hidden md:block">
          Explore Over 500+ Active Contests Worldwide
        </p>
      </div>
    </section>
  );
};

export default Banner;
