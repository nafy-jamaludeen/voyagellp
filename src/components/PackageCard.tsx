import { TravelPackage } from "../types";
import { Star, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

interface PackageCardProps {
  item: TravelPackage;
  index: number;
  onBookNow: (packageName: string) => void;
}

export default function PackageCard({ item, index, onBookNow }: PackageCardProps) {
  return (
    <div
      id={`package-card-${item.id}`}
      className="group relative flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl border border-gray-100"
      style={{
        animationDelay: `${index * 200}ms`
      }}
    >
      {/* Luxury Rating Tag over Image */}
      <div className="absolute top-4 right-4 z-10 glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
        <Star className="h-3.5 w-3.5 fill-secondary text-secondary animate-pulse" />
        <span className="font-sans text-xs font-bold text-primary tracking-wide">
          {item.rating.toFixed(2)}
        </span>
      </div>

      {/* Destination Image Area */}
      <div className="relative h-64 lg:h-72 overflow-hidden bg-gray-200">
        <img
          src={item.image}
          alt={`Discover ${item.title}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        {/* Subtle dark gradient overlay over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85"></div>
        {/* Location tag in bottom corner of image */}
        <div className="absolute bottom-4 left-6 flex items-center gap-1.5 text-white bg-primary/70 backdrop-blur-md py-1 px-3.5 rounded-full border border-white/10">
          <MapPin className="h-3 w-3 text-secondary-light" />
          <span className="text-[10px] tracking-widest font-sans font-semibold uppercase">
            {item.location}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-sans font-bold tracking-widest uppercase bg-primary/5 text-primary border border-primary/5 py-1 px-2.5 rounded-none"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h3 className="font-display text-xl lg:text-2xl font-bold text-primary group-hover:text-secondary-dark transition-colors duration-300 leading-tight mb-2">
            {item.title}
          </h3>

          {/* Duration */}
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
            <Clock className="h-3.5 w-3.5 text-secondary-dark" />
            <span className="tracking-wide font-medium">{item.duration}</span>
          </div>

          <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Highlights Checklist */}
          <div className="border-t border-gray-100 pt-5 mb-6">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-primary/70 mb-3 block">
              Signature Inclusions
            </h4>
            <ul className="space-y-2.5">
              {item.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  <span className="leading-tight font-sans text-[11px] font-medium text-gray-800">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Pricing & CTA */}
        <div className="border-t border-gray-100 pt-5 flex items-center justify-between gap-4 mt-auto">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.15em] font-sans font-extrabold text-gray-400">
              Inquire From
            </span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-display text-2xl font-black text-primary">
                ${item.price}
              </span>
              {item.originalPrice && (
                <span className="text-xs text-gray-400 font-sans line-through">
                  ${item.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            id={`book-now-${item.id}`}
            onClick={() => onBookNow(item.location)}
            className="flex items-center gap-1.5 bg-primary hover:bg-secondary text-white hover:text-primary font-sans text-[11px] font-heavy tracking-widest uppercase px-5 py-3 rounded-none transition-all duration-300 shadow-md hover:shadow-lg border border-primary hover:border-secondary font-semibold"
          >
            Request Rate
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
