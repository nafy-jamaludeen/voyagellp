import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  animationType?: "fade-in" | "fade-up" | "slide-left" | "slide-right" | "scale-up";
  delayMs?: number;
  threshold?: number;
  key?: any;
}

export default function AnimatedSection({
  children,
  id,
  className = "",
  animationType = "fade-up",
  delayMs = 0,
  threshold = 0.15,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can unobserve if we only want animate-once behavior (standard for luxury sites)
          observer.unobserve(currentRef);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // triggers slightly before entry to look smoother
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Map of animation classes
  const getAnimationClasses = (): string => {
    switch (animationType) {
      case "fade-in":
        return isVisible 
          ? "opacity-100 transition-all duration-1000 ease-out" 
          : "opacity-0";
      
      case "slide-left":
        return isVisible 
          ? "opacity-100 translate-x-0 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
          : "opacity-0 -translate-x-16";
      
      case "slide-right":
        return isVisible 
          ? "opacity-100 translate-x-0 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
          : "opacity-0 translate-x-16";
      
      case "scale-up":
        return isVisible 
          ? "opacity-100 scale-100 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
          : "opacity-0 scale-90";
      
      case "fade-up":
      default:
        return isVisible 
          ? "opacity-100 translate-y-0 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
          : "opacity-0 translate-y-12";
    }
  };

  return (
    <div
      ref={elementRef}
      id={id}
      className={`${className} ${getAnimationClasses()}`}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
