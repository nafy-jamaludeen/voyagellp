import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  id: string;
  targetValue: number;
  suffix?: string;
  label: string;
  key?: any;
}

export default function StatCounter({ id, targetValue, suffix = "", label }: StatCounterProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCounting();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(currentRef);

    const startCounting = () => {
      const duration = 2000; // Animation duration in ms
      const frameRate = 1000 / 60; // 60 FPS
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counterTimer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        
        // Easing function - easeOutQuad
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.min(
          Math.floor(easeProgress * targetValue),
          targetValue
        );

        setValue(currentValue);

        if (frame >= totalFrames) {
          setValue(targetValue);
          clearInterval(counterTimer);
        }
      }, frameRate);
    };

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [targetValue]);

  // Format number with thousand separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\n))/g, ",");
  };

  return (
    <div
      ref={elementRef}
      id={id}
      className="text-center p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl hover:border-secondary/40 transition-colors duration-500 flex flex-col items-center justify-center min-h-[160px]"
    >
      <div className="font-display text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight mb-2 select-none flex items-center justify-center">
        <span>{formatNumber(value)}</span>
        <span className="text-secondary/90 ml-0.5 font-sans font-light text-3xl">{suffix}</span>
      </div>
      <div className="text-white/60 text-xs lg:text-sm tracking-widest uppercase font-medium mt-1 leading-relaxed max-w-[200px]">
        {label}
      </div>
    </div>
  );
}
