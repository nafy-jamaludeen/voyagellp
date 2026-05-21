import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import AnimatedSection from "./components/AnimatedSection";
import StatCounter from "./components/StatCounter";
import PackageCard from "./components/PackageCard";
import TestimonialCarousel from "./components/TestimonialCarousel";
import ContactForm from "./components/ContactForm";

import { TRAVEL_PACKAGES, GALLERY_ITEMS, STATS } from "./data";
import {
  Crown,
  Plane,
  ShieldCheck,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ChevronUp,
  MapPin,
  Camera,
  Compass,
  Phone,
  Clock,
  ExternalLink,
  Upload,
  Heart,
  Trash2,
  Image
} from "lucide-react";

interface UserMemory {
  id: string;
  name: string;
  location: string;
  text: string;
  image: string;
  date: string;
  likes: number;
}

const PRESET_MEMORIES: UserMemory[] = [
  {
    id: "mem-1",
    name: "Arjun R & College Group",
    location: "Himachal College Trip (Manali & Kasol)",
    text: "Unbelievable moments during our final year college trip arranged by Voyage Adventures. From campfire star gazing in Kasol to mountain treks together in Manali, we felt fully protected and cared for throughout. High quality stays!",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=800",
    date: "2 years ago",
    likes: 42
  },
  {
    id: "mem-2",
    name: "Zindrilla Vincent",
    location: "Rishikesh & Ganga River Rafting",
    text: "Special thanks to Mr. Harshak who felt like an elder brother on the road. We conquered the Ganga river rapids, had peaceful walks, and got the best local food. Highly recommended!",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    date: "3 months ago",
    likes: 28
  },
  {
    id: "mem-3",
    name: "Bainy Babu",
    location: "Jaisalmer Golden Dunes",
    text: "Our desert camp was nothing short of spectacular! Riding camels under the brilliant twilight sky of Rajasthan. Everything was so beautifully taken care of.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
    date: "3 months ago",
    likes: 31
  }
];

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollYAndDirection, setScrollYAndDirection] = useState({ y: 0, rotation: 0 });
  
  // Custom interactive Memories Feed state
  const [memories, setMemories] = useState<UserMemory[]>(() => {
    const local = localStorage.getItem("voyage_custom_memories");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        return PRESET_MEMORIES;
      }
    }
    return PRESET_MEMORIES;
  });

  useEffect(() => {
    localStorage.setItem("voyage_custom_memories", JSON.stringify(memories));
  }, [memories]);

  // User Memory Form controllers
  const [memName, setMemName] = useState("");
  const [memLocation, setMemLocation] = useState("");
  const [memText, setMemText] = useState("");
  const [memImage, setMemImage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Convert uploaded image file securely to Base64 String for state and localstorage persistence
  const handleImageFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setMemImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleLikeMemory = (id: string) => {
    if (likedIds.includes(id)) {
      // Unlike
      setLikedIds(likedIds.filter(item => item !== id));
      setMemories(prev => prev.map(m => m.id === id ? { ...m, likes: m.likes - 1 } : m));
    } else {
      // Like
      setLikedIds([...likedIds, id]);
      setMemories(prev => prev.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
    }
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  const handleSubmitMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memName || !memText) {
      alert("Please provide at least your name and a brief memory text.");
      return;
    }

    const defaultImages = [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598325257121-fe299e4b7747?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
    ];
    
    // Choose selected image file/preset, fallback randomly
    const finalImage = memImage || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const newMem: UserMemory = {
      id: `custom-${Date.now()}`,
      name: memName,
      location: memLocation || "Pristine Expeditions",
      text: memText,
      image: finalImage,
      date: "Just now",
      likes: 1
    };

    setMemories([newMem, ...memories]);
    
    // Reset form states
    setMemName("");
    setMemLocation("");
    setMemText("");
    setMemImage("");
  };

  // Smooth scroll back to top and scroll progress handler
  useEffect(() => {
    const handleScrollEffects = () => {
      // Toggle back to top button visibility
      if (window.scrollY > 600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Track scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 105; // offset slightly for aesthetic margin at end
        setScrollProgress(Math.min(progress, 100));
      }

      // Track vertical position & rotation for custom compass/plane scroll indicator
      setScrollYAndDirection({
        y: window.scrollY,
        rotation: window.scrollY * 0.18 // Spins as the user scrolls
      });
    };

    window.addEventListener("scroll", handleScrollEffects);
    return () => window.removeEventListener("scroll", handleScrollEffects);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Safe handler to pass down when user wants to book a package
  const handleBookNow = (packageName: string) => {
    setSelectedDestination(packageName);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Why choose us luxury feature boxes definition
  const whyUsFeatures = [
    {
      id: "feat-1",
      icon: <Crown className="h-8 w-8 text-secondary" />,
      title: "Five-Star Opulence Only",
      description: "We strictly secure accommodations with five-star or diamond ratings, audited by our boutique interior curation board."
    },
    {
      id: "feat-2",
      icon: <Plane className="h-8 w-8 text-secondary" />,
      title: "Private Transit Alignments",
      description: "From luxury local yacht charters to customized commercial terminal fast-tracks, your transit is private and pristine."
    },
    {
      id: "feat-3",
      icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
      title: "Consummate Protection",
      description: "Fully guarded operations, flexible deposit returns, and active 24/7 intelligence support throughout foreign soils."
    },
    {
      id: "feat-4",
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Bespoke Itinerary Curations",
      description: "Every excursion is handcrafted individually for your exact party. Zero canned plans, zero rigid schedules."
    }
  ];

  return (
    <div className="relative min-h-screen font-sans selection:bg-secondary selection:text-primary" id="home">
      {/* Dynamic Header & Floating Buttons */}
      <Navbar />
      <WhatsAppButton />

      {/* 1. HERO SECTION & PARALLAX BACKGROUND */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background wrapper */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920"
            alt="Luxury Travel Haven Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 select-none pointer-events-none brightness-[0.4]"
          />
        </div>

        {/* Hero Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-primary/65 to-luxury-bg z-10 pointer-events-none"></div>

        {/* Hero content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 text-center text-white pt-24 pb-12 flex flex-col items-center">
          
          {/* Subtle Golden Subheader Tag */}
          <div className="animate-fade-in p-1 mb-6">
            <span className="text-secondary tracking-[0.4em] uppercase text-xs font-bold font-sans inline-block px-5 py-2.5 bg-primary/40 backdrop-blur-md rounded-none border border-secondary/20 shadow-xl">
              Unrivaled Journeys, Handcrafted for You
            </span>
          </div>

          {/* Animated Headline Text which fades in on load */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-4xl text-shadow-md select-none">
            Escape the Ordinary. <br />
            <span className="text-secondary-light font-display italic font-medium">Bespoke Curation</span> Awaits.
          </h1>

          {/* Subtext with vertical offset animation container */}
          <p className="font-sans text-white/80 text-sm sm:text-base lg:text-xl font-light tracking-wide max-w-2xl mb-12 leading-relaxed select-none">
            Welcome to Voyage Adventures LLP. We engineer tailor-made premium expeditions for group tours, college trips, family escapes, and custom spiritual sanctuaries.
          </p>

          {/* Main Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 min-w-[200px]">
            <a
              id="hero-cta-book-now"
              href="#packages"
              className="w-full sm:w-auto bg-secondary lg:hover:bg-secondary-dark text-primary lg:hover:text-white font-sans text-xs tracking-[0.2em] font-extrabold uppercase px-8 py-4 rounded-none transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl border border-secondary font-semibold"
            >
              Curated Packages
            </a>
            <a
              id="hero-cta-view-packages"
              href="#contact"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-sans text-xs tracking-[0.2em] font-extrabold uppercase px-8 py-4 rounded-none transition-all duration-300 transform hover:-translate-y-1 border border-white/40 font-semibold"
            >
              Consult Broker
            </a>
          </div>

          {/* Golden Scroll Down Indicator Vector */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-85 select-none">
            <span className="text-[9px] uppercase tracking-[0.3em] text-secondary font-bold">Scroll Down</span>
            <div className="w-[1.5px] h-8 bg-secondary-light"></div>
          </div>
        </div>
      </header>

      {/* 2. POPULAR PACKAGES SECTION */}
      <section id="packages" className="py-24 lg:py-32 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <AnimatedSection animationType="slide-left">
                <span className="text-secondary tracking-[0.3em] uppercase text-xs font-bold block mb-3">
                  Signature Destinations
                </span>
                <h2 className="font-display text-3xl lg:text-5xl font-black text-primary leading-tight">
                  Our Selected Micro-Tours
                </h2>
                <div className="w-20 h-1 bg-secondary mt-5"></div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animationType="slide-right">
              <p className="text-gray-500 font-sans text-xs lg:text-sm tracking-wide leading-relaxed max-w-md pt-2">
                Every listed trajectory stands actively designed by our regional coordinators. Browse individual private schedules or consult our office to generate a fully customized passage.
              </p>
            </AnimatedSection>
          </div>

          {/* Staggered 6-Card Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {TRAVEL_PACKAGES.map((item, index) => (
              <AnimatedSection
                key={item.id}
                id={`package-section-wrapper-${index}`}
                animationType="fade-up"
                delayMs={index * 150} // 150ms incremental stagger delays
              >
                <PackageCard
                  item={item}
                  index={index}
                  onBookNow={handleBookNow}
                />
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE US & LIVE STAT COUNTERS SECTION */}
      <section id="why-choose-us" className="relative py-24 lg:py-32 bg-primary text-white overflow-hidden">
        {/* Abstract design elements inside background */}
        <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.03] bg-[length:50px_50px] bg-[radial-gradient(#d4a017_1px,transparent_1px)] z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header Row */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <AnimatedSection animationType="slide-left">
              <span className="text-secondary tracking-[0.3em] uppercase text-xs font-bold block mb-3">
                Voyage Custom Standards
              </span>
              <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-white">
                Designed to Exceed Expectations
              </h2>
              <div className="w-16 h-1 bg-secondary mx-auto mt-6"></div>
            </AnimatedSection>
          </div>

          {/* Feature Highlight Boxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {whyUsFeatures.map((feat, idx) => (
              <AnimatedSection
                key={feat.id}
                id={`feature-wrapper-${idx}`}
                animationType="scale-up"
                delayMs={idx * 100}
              >
                <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-secondary/40 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
                  <div className="mb-6 p-4 rounded-full bg-secondary/10 self-start text-secondary border border-secondary/20">
                    {feat.icon}
                  </div>
                  <h3 className="font-display text-lg lg:text-xl font-bold text-white mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-white/70 text-xs lg:text-sm leading-relaxed font-light font-sans">
                    {feat.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Interactive Counter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 bg-black/20 p-8 rounded-2xl border border-white/5 shadow-inner">
            {STATS.map((stat) => (
              <StatCounter
                key={stat.id}
                id={stat.id}
                targetValue={stat.targetValue}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. GALLERY MASONRY SECTION */}
      <section id="gallery" className="py-24 lg:py-32 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header Rows */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <AnimatedSection animationType="slide-left">
                <span className="text-secondary tracking-[0.3em] uppercase text-xs font-bold block mb-3">
                  Visual Journeys
                </span>
                <h2 className="font-display text-3xl lg:text-5xl font-black text-primary">
                  The Sanctuary Chronicles
                </h2>
                <div className="w-20 h-1 bg-secondary mt-5"></div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animationType="slide-right">
              <p className="text-gray-500 text-xs lg:text-sm tracking-wide leading-relaxed max-w-md pt-2">
                Unedited captures of actual villa perspectives, sunset charters, and deep valleys registered by our private traveling members.
              </p>
            </AnimatedSection>
          </div>

          {/* Responsive Bento Box Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {GALLERY_ITEMS.map((item, idx) => (
              <AnimatedSection
                key={item.id}
                id={`gallery-item-wrapper-${idx}`}
                animationType="fade-up"
                delayMs={idx * 120}
                className={`${
                  item.cols === 2 ? "sm:col-span-2" : "col-span-1"
                }`}
              >
                <div className="group relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] sm:aspect-[16/10] bg-gray-200 border border-gray-100">
                  
                  {/* Gallery Zoom Img from center */}
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />

                  {/* Dark Elegant overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6 lg:p-8">
                    <span className="text-secondary tracking-[0.25em] uppercase text-[10px] font-bold block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-display text-white text-lg lg:text-xl font-bold leading-tight">
                      {item.title}
                    </h4>
                  </div>

                  {/* Camera Indicator Icon top right corner */}
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md text-primary z-20 group-hover:bg-secondary group-hover:text-primary transition-colors duration-300 pointer-events-none">
                    <Camera className="h-4 w-4 stroke-[1.5]" />
                  </div>

                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS & REVIEWS SECTION */}
      <section id="testimonials" className="py-24 lg:py-32 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <AnimatedSection animationType="slide-left">
              <span className="text-secondary tracking-[0.3em] uppercase text-xs font-bold block mb-3">
                Prestige Endorsements
              </span>
              <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-primary">
                Words from Our Global Members
              </h2>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">
                Uncompromising feedback regarding our bespoke formulations
              </p>
              <div className="w-16 h-1 bg-secondary mx-auto mt-6"></div>
            </AnimatedSection>
          </div>

          <AnimatedSection animationType="scale-up" threshold={0.15}>
            <TestimonialCarousel />
          </AnimatedSection>

        </div>
      </section>

      {/* VOYAGER FIELD DIARIES & TRAVEL PHOTO SUBMISSION */}
      <section id="community-diaries" className="py-24 lg:py-32 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <AnimatedSection animationType="slide-left">
                <span className="text-secondary tracking-[0.3em] uppercase text-xs font-bold block mb-3">
                  Community Live Logs
                </span>
                <h2 className="font-display text-3xl lg:text-5xl font-black text-primary">
                  Voyagers' Field Diaries
                </h2>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-2">
                  Read live shared moments & post your own travel photos with text
                </p>
                <div className="w-20 h-1 bg-secondary mt-5"></div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animationType="slide-right">
              <div className="p-4 bg-primary text-white rounded-xl text-center self-start border border-white/10 shadow-lg font-mono">
                <span className="block text-2xl font-bold text-secondary">5.0 ★ Rating</span>
                <span className="text-[10px] tracking-widest uppercase text-white/75">From 179+ Active Reviews</span>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Drag & Drop Share Form Column */}
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
              <h3 className="font-display text-xl lg:text-2xl font-bold text-primary mb-2">
                Share Your Adventure
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-6">
                Tell the community about your latest college trip, family route, or special custom tour landmarks!
              </p>

              <form onSubmit={handleSubmitMemory} className="space-y-5">
                <div>
                  <label id="lbl-mem-name" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Your Name
                  </label>
                  <input
                    id="mem-name-input"
                    type="text"
                    required
                    value={memName}
                    onChange={(e) => setMemName(e.target.value)}
                    placeholder="e.g. Arjun R"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label id="lbl-mem-loc" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Traveled Destination
                  </label>
                  <input
                    id="mem-loc-input"
                    type="text"
                    value={memLocation}
                    onChange={(e) => setMemLocation(e.target.value)}
                    placeholder="e.g. Goa Beach Camp, Himachal Peaks"
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:border-secondary transition-all"
                  />
                </div>

                <div>
                  <label id="lbl-mem-text" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Your Experience / Story
                  </label>
                  <textarea
                    id="mem-text-input"
                    required
                    rows={4}
                    value={memText}
                    onChange={(e) => setMemText(e.target.value)}
                    placeholder="Describe food, convenience, support, or unexpected joyful highlights of the trip..."
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:border-secondary transition-all resize-none"
                  />
                </div>

                {/* Drag and Drop File Selection Area */}
                <div>
                  <label id="lbl-mem-file" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Upload Travel Photo
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("drag-drop-file")?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      dragActive ? "border-secondary bg-secondary/5" : "border-gray-200 hover:border-secondary/50"
                    }`}
                  >
                    <input
                      id="drag-drop-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    
                    {memImage ? (
                      <div className="relative group">
                        <img
                          src={memImage}
                          alt="Uploaded memory preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 rounded-b-lg text-white text-[10px]">
                          Click or drag to replace image
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-2">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-xs font-medium text-gray-600">
                          Drag & drop travel image here
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Or click to browse storage files
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  id="btn-publish-memory"
                  type="submit"
                  className="w-full py-3.5 bg-primary hover:bg-secondary text-white hover:text-primary tracking-widest text-xs uppercase font-extrabold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Image className="h-4 w-4" />
                  Publish My Story
                </button>
              </form>
            </div>

            {/* Right: Live Logs Feed Grid Column */}
            <div className="lg:col-span-7 space-y-8">
              <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                Recent Field Updates ({memories.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin">
                {memories.map((mem) => (
                  <div key={mem.id} className="bg-white rounded-2xl shadow-md border border-gray-100/80 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={mem.image}
                        alt={mem.location}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[9px] text-secondary tracking-widest uppercase font-mono">
                        {mem.location}
                      </div>

                      {mem.id.startsWith("custom-") && (
                        <button
                          id={`del-mem-${mem.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMemory(mem.id);
                          }}
                          className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-colors"
                          title="Delete story"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-primary font-display block">
                            {mem.name}
                          </span>
                          <span className="text-[9px] text-gray-400 font-medium">
                            {mem.date}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed italic line-clamp-4 font-light">
                          "{mem.text}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-50">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4a017]">
                          ★★★★★ Perfect 5.0
                        </span>
                        
                        <button
                          id={`like-mem-${mem.id}`}
                          onClick={() => handleLikeMemory(mem.id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold py-1 px-2.5 rounded-full transition-all ${
                            likedIds.includes(mem.id)
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${likedIds.includes(mem.id) ? "fill-red-600 text-red-600" : "text-gray-400"}`} />
                          <span>{mem.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CONTACT / BOOKING FORM SECTION */}
      <section id="contact" className="py-24 lg:py-32 bg-luxury-bg">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimatedSection animationType="slide-left">
              <span className="text-secondary tracking-[0.3em] uppercase text-xs font-bold block mb-3">
                Inquire With Us
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-primary">
                Secure Your Tailored Passage
              </h2>
              <div className="w-16 h-1 bg-secondary mx-auto mt-4"></div>
            </AnimatedSection>
          </div>

          <AnimatedSection animationType="fade-up">
            <ContactForm
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
            />
          </AnimatedSection>

        </div>
      </section>

      {/* 7. FOOTER SECTION */}
      <footer className="bg-primary-dark text-white pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand details */}
            <div className="space-y-6">
              <a href="#home" className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-full text-primary">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-display text-lg lg:text-xl font-bold tracking-widest uppercase block text-white">
                    Voyage Adventures
                  </span>
                  <span className="text-[8px] tracking-[0.3em] uppercase text-slate-400 block -mt-1 leading-none">
                    VOYAGE ADVENTURES LLP
                  </span>
                </div>
              </a>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Crafting exceptional group adventures, unforgettable college journeys, custom family vacation expeditions, and spiritual guides with dedicated customer supports.
              </p>
              {/* Social Media Link with animations */}
              <div className="flex gap-4.5 pt-2">
                {[
                  { icon: <Instagram className="h-4.5 w-4.5" />, href: "https://instagram.com" },
                  { icon: <Facebook className="h-4.5 w-4.5" />, href: "https://facebook.com" },
                  { icon: <Twitter className="h-4.5 w-4.5" />, href: "https://twitter.com" },
                  { icon: <Linkedin className="h-4.5 w-4.5" />, href: "https://linkedin.com" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white/5 hover:bg-secondary hover:text-primary rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-white/5"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Exclusive Collections */}
            <div>
              <h4 className="font-display text-sm tracking-[0.2em] uppercase font-bold text-secondary mb-6">
                Elite Expeditions
              </h4>
              <ul className="space-y-3 font-sans text-xs">
                <li>
                  <a href="#packages" className="text-slate-400 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group">
                    Velaa Private Isle (Maldives)
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#packages" className="text-slate-400 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group">
                    Heavenly Valleys (Kashmir)
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#packages" className="text-slate-400 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group">
                    Desert Sovereign (Dubai)
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#packages" className="text-slate-400 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group">
                    Emerald Mist (Munnar)
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigation Quick Links */}
            <div>
              <h4 className="font-display text-sm tracking-[0.2em] uppercase font-bold text-secondary mb-6">
                Navigation Directory
              </h4>
              <ul className="space-y-3 font-sans text-xs">
                {["Home", "Destinations", "Why Choose Us", "Gallery", "Testimonials", "Inquire"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link === "Why Choose Us" ? "why-choose-us" : link.toLowerCase().replace(" ", "-")}`}
                      className="text-slate-400 hover:text-secondary transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <span>&mdash;</span> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Luxury Concierge Office details */}
            <div className="space-y-4">
              <h4 className="font-display text-sm tracking-[0.2em] uppercase font-bold text-secondary mb-2">
                Voyage Contact Office
              </h4>
              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-slate-400 leading-relaxed">
                    Km mall, Ring Road,<br /> Tirur, Kerala 676101
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-secondary shrink-0" />
                  <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">09746999778</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sub Footer copyright statement */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
            <p className="font-sans text-center md:text-left select-none">
              &copy; {new Date().getFullYear()} Voyage Adventures LLP. All rights reserved.
            </p>
            <div className="flex gap-6 select-none">
              <span className="hover:text-white transition-colors cursor-pointer">Code of Conduct</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms & Agreements</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating back to top button anchor option */}
      {/* FIXED TOP SCROLL PROGRESS TRAVEL TRACKER */}
      <div 
        id="scroll-progress-container"
        className="fixed top-0 left-0 w-full h-[6px] bg-primary/25 backdrop-blur-xs z-50 pointer-events-none select-none"
      >
        <div 
          id="scroll-progress-bar"
          className="h-full bg-gradient-to-r from-secondary-light via-secondary to-luxury-gold transition-all duration-75 relative" 
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Flying plane at the tip of progress */}
          {scrollProgress > 0 && (
            <div 
              id="scroll-traveling-plane"
              className="absolute right-0 top-1/2 -mr-2 text-secondary filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-transform duration-75"
              style={{ transform: "translateY(-50%) rotate(90deg)" }}
            >
              <Plane className="h-4.5 w-4.5 fill-secondary stroke-primary stroke-[2]" />
            </div>
          )}
        </div>
      </div>

      {/* ROTATING TRAVEL COMPASS TRACKER BADGE */}
      <div 
        id="floating-scroll-compass"
        className={`fixed bottom-24 right-6 z-40 bg-white/95 backdrop-blur-md text-primary p-3 rounded-full shadow-2xl border border-gray-100 transition-all duration-500 hover:scale-115 flex items-center justify-center pointer-events-none ${
          scrollProgress > 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{ transform: `rotate(${scrollYAndDirection.rotation}deg)` }}
        title="Adventure Voyage Compass"
      >
        <Compass className="h-6 w-6 text-secondary" />
      </div>

      <button
        id="back-to-top-button"
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-40 bg-primary/90 hover:bg-secondary text-white hover:text-primary p-3 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 border border-white/10 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll back to top of page"
      >
        <ChevronUp className="h-5 w-5 animate-pulse" />
      </button>

    </div>
  );
}
