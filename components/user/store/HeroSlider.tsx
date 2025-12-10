"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SLIDES } from "@/data/mock-data";
import Link from 'next/link';

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-gray-100 overflow-hidden group">
       {/* Slides */}
       {SLIDES.map((slide, index) => (
         <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
         >
           <div 
             className="absolute inset-0 w-full h-full bg-cover bg-center"
             style={{ backgroundImage: `url(${slide.image})` }}
           ></div>
           <div className="absolute inset-0 bg-black/20"></div>
           
           <div className="absolute inset-0 flex items-center justify-center text-center px-4">
             <div className={`bg-white/95 backdrop-blur-sm p-8 md:p-14 max-w-3xl shadow-2xl border-2 border-[#8B1E1E]/10 transform transition-all duration-700 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-[#8B1E1E]"></div>
                  <span className="text-[#8B1E1E] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                    {slide.subtitle}
                  </span>
                  <div className="h-[1px] w-8 bg-[#8B1E1E]"></div>
                </div>
                <h2 className="text-3xl md:text-6xl font-serif font-medium text-gray-900 mb-6 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-gray-600 mb-8 font-light text-base md:text-lg leading-relaxed max-w-lg mx-auto hidden md:block">
                  {slide.desc}
                </p>
                <Link href="/shop" className="flex items-center justify-center w-fit bg-[#8B1E1E] text-white px-8 py-3 md:px-10 md:py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#6b1616] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-[#8B1E1E]/30 flex items-center gap-2 mx-auto">
                  {slide.btn} <ArrowRight size={16} />
                </Link>
             </div>
           </div>
         </div>
       ))}

       {/* Navigation Buttons */}
       <button 
         onClick={prevSlide}
         className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white text-gray-800 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hidden md:block"
       >
         <ChevronLeft size={24} />
       </button>
       <button 
         onClick={nextSlide}
         className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white text-gray-800 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hidden md:block"
       >
         <ChevronRight size={24} />
       </button>

       {/* Dots */}
       <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/50 ${currentSlide === idx ? 'bg-[#8B1E1E] w-8' : 'bg-white hover:bg-gray-200'}`}
            />
          ))}
       </div>
    </div>
  );
};