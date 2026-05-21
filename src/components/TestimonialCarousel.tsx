import { useState, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "../data";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Infinite sliding loop
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative max-w-5xl mx-auto px-4" id="testimonial-slider-container">
      {/* Decorative Quote Icon */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-[0.06] pointer-events-none text-primary">
        <Quote className="h-32 w-32 rotate-180" />
      </div>

      {/* Slide Container */}
      <div className="relative min-h-[360px] md:min-h-[280px] overflow-hidden flex items-center justify-center">
        {TESTIMONIALS.map((testimonial, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={testimonial.id}
              id={`testimonial-slide-${idx}`}
              className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 scale-100 translate-x-0 z-10"
                  : idx < activeIndex
                  ? "opacity-0 scale-95 -translate-x-8 -z-10 pointer-events-none"
                  : "opacity-0 scale-95 translate-x-8 -z-10 pointer-events-none"
              }`}
            >
              <div className="text-center max-w-3xl px-6 md:px-12 flex flex-col items-center">
                {/* Visual Frame for Avatar */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-secondary animate-spin" style={{ animationDuration: "16s" }}></div>
                  <div className="p-1">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-xl border-4 border-white"
                    />
                  </div>
                  {/* Luxury Signature Star */}
                  <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1 border-2 border-white shadow-md">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>

                {/* Review Message */}
                <p className="font-display text-base md:text-xl md:leading-relaxed text-slate-700 italic select-none">
                  "{testimonial.text}"
                </p>

                {/* Speaker Identity Info */}
                <div className="mt-6 flex flex-col items-center">
                  <span className="font-display text-sm md:text-base font-bold tracking-widest text-primary uppercase">
                    {testimonial.name}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase font-medium text-slate-400 mt-1">
                    {testimonial.role} &mdash; <span className="text-secondary-dark">{testimonial.location}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Sliding Left/Right Arrows */}
      <div className="absolute top-[40%] translate-y-[-50%] left-0 z-20">
        <button
          id="testimonial-prev-arrow"
          onClick={prevSlide}
          className="p-3 bg-white hover:bg-primary border border-gray-100 hover:border-primary text-primary hover:text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute top-[40%] translate-y-[-50%] right-0 z-20">
        <button
          id="testimonial-next-arrow"
          onClick={nextSlide}
          className="p-3 bg-white hover:bg-primary border border-gray-100 hover:border-primary text-primary hover:text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots Indicators */}
      <div className="flex justify-center items-center gap-3 mt-4" id="testimonial-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            id={`testimonial-dot-${i}`}
            onClick={() => {
              if (isAnimating) return;
              setActiveIndex(i);
            }}
            className={`h-2 transition-all duration-500 rounded-full focus:outline-none ${
              i === activeIndex
                ? "w-8 bg-secondary"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
