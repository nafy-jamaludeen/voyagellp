import { TravelPackage, Testimonial, GalleryItem, StatItem } from "./types";

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: "maldives-luxury",
    title: "Velaa Private Isle Retreat",
    location: "Maldives",
    duration: "6 Days, 5 Nights",
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800",
    tags: ["Ultra Luxury", "Honeymoon", "Private Island"],
    highlights: ["Overwater Private Villa", "Michelin-star dining", "Private yacht transfer"],
    description: "Soak in ultimate luxury in your personal overwater villa suspended over crystalline waters, boasting direct lagoon access, dedicated butler service, and Michelin-class gastronomical delights."
  },
  {
    id: "kashmir-paradise",
    title: "Heaven on Earth Expedition",
    location: "Kashmir, India",
    duration: "7 Days, 6 Nights",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
    tags: ["Nature", "Cultural heritage", "Premium Escape"],
    highlights: ["Luxury Houseboat in Dal Lake", "Gondola ride in Gulmarg", "Pristine Pahalgam valleys"],
    description: "Unravel Jammu and Kashmir's pristine alpine beauty. Glide in a handcrafted royal houseboat, traverse vibrant saffron fields, and take a dramatic skyward Gondola ride over snow-peaked passes."
  },
  {
    id: "dubai-opulence",
    title: "The Golden Dune Sovereign",
    location: "Dubai, UAE",
    duration: "5 Days, 4 Nights",
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    tags: ["Shopping", "Sovereign Luxury", "Desert Safari"],
    highlights: ["Burj Khalifa VIP Sky Lounge", "Ultra Luxury Desert Glamping", "Helicopter skyline tour"],
    description: "A tailored passage through futuristic architectural wonders, private dune-bashing, signature fine-dining high above the clouds, and world-class resort experiences."
  },
  {
    id: "europe-alpine",
    title: "Alpine Spires & Riviera Sojourn",
    location: "Switzerland & Italy",
    duration: "10 Days, 9 Nights",
    price: 3499,
    originalPrice: 4190,
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
    tags: ["Grand Tour", "Scenic Trains", "Riviera VIP"],
    highlights: ["Glacier Express First Class", "Lake Como private boat charter", "Swiss Alps luxury chalets"],
    description: "Cross the snow-framed Swiss heights in panoramic luxury trains before sweeping down to Lake Como for classic sunshine, private speedboat tours, and historical villas."
  },
  {
    id: "munnar-estate",
    title: "Emerald Mist Sanctuary",
    location: "Munnar, Kerala",
    duration: "4 Days, 3 Nights",
    price: 999,
    originalPrice: 1249,
    rating: 4.75,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
    tags: ["Bespoke Wellness", "Tea Highlands", "Eco-Luxury"],
    highlights: ["Bespoke Tea-Estate Villa", "Private naturalist treks", "Ayurvedic Spa treatments"],
    description: "Rejuvenate inside pristine cloud-shrouded tea plantations. Absorb nature in standard heritage estates, enjoy curated single-origin tasting tours, and discover restorative traditional spa masterclasses."
  },
  {
    id: "umrah-premium",
    title: "Royal Spiritual Passageway",
    location: "Makkah & Madinah",
    duration: "8 Days, 7 Nights",
    price: 1599,
    originalPrice: 1999,
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800",
    tags: ["Spiritual", "Elite Accommodation", "Haram View"],
    highlights: ["5-Star Haram-facing suite", "Private VIP transport guide", "Historical Ziyarat sites tour"],
    description: "An elegant, completely-focused journey of faith. Live in full spiritual view of the Kaaba, supported by seamless airport fast-tracks and state-of-the-art chauffeurs."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Zindrilla Vincent",
    role: "Verified Explorer",
    location: "3 months ago",
    text: "I recently completed a 14-day trip with Adventure Voyage, covering Gujarat, Rajasthan, Agra, Rishikesh, Himachal (Kasol, Grahan, Manali) and Delhi, and it turned out to be one of the most memorable journeys I've had. What made this trip truly special was that the guide and founder, Mr. Harshak, accompanied us throughout. He wasn't just a guide; he felt like a brother and a good friend on the road. From planning the itinerary to managing every small detail, he made sure everything was arranged according to our comfort and convenience. The trip was a perfect blend of adventure, exploration, and smooth coordination. We never had to worry about anything, everything was thoughtfully planned and well executed. Grateful for such a wonderful experience and the memories made along the way. Highly recommend Adventure Voyage for anyone looking for a well organised and heartfelt travel experience.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250"
  },
  {
    id: "t2",
    name: "Bainy Babu",
    role: "Adventure Enthusiast",
    location: "3 months ago",
    text: "Our journey with Adventure Voyage was truly unforgettable, with everything handled so smoothly that we could enjoy each moment without a single worry. Traveling through beautiful places like Ahmedabad, Jaisalmer, Agra, Delhi, Rishikesh, Manali and kasol felt perfectly planned, with comfortable stays, great food, and a well-balanced itinerary. A heartfelt thanks to our guide, whose kindness, care, and constant support made us feel safe and valued throughout the trip. His warm nature made the journey feel less like a tour and more like a family experience. These memories will stay with us forever. ♥️💯",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
  },
  {
    id: "t3",
    name: "Afeefa Farzana",
    role: "Scenic Route Traveler",
    location: "3 months ago",
    text: "Our journey with Adventure Voyage was truly unforgettable and beautifully organized from beginning to end. The food was delicious and felt like home, the stay was comfortable and peaceful, and every small detail was thoughtfully arranged. Our guide Harshak was incredibly supportive, friendly, and always made sure we felt safe and connected throughout the trip. Each experience was filled with joy and meaningful moments that brought everyone closer together. This tour was not just a vacation, but a heartfelt memory we will cherish forever.Thank you team adventure voyage and special thank you for Harshak 🫂😊",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
  },
  {
    id: "t4",
    name: "Arjun R",
    role: "College Trip Coordinator",
    location: "2 years ago",
    text: "I wanted to take a moment to express my heartfelt gratitude for the incredible travel experience you provided. From the moment we reached out to plan our college trip until the day we returned home, your agency exceeded our expectations in every way. Your attention to detail in crafting a personalized itinerary was truly impressive. I felt like you understood our travel preferences and interests perfectly. The accommodations you arranged were not only comfortable but also conveniently located, allowing us to make the most of our time at each destination. What truly stood out was your commitment to ensuring my safety and peace of mind throughout the journey. Your 24/7 support was invaluable, especially when I encountered some unexpected travel delays. Your team's quick and efficient response made all the difference. Overall, our college trip was nothing short of spectacular, thanks to your expertise and professionalism. I can't wait to plan my next adventure with your agency. Please accept my heartfelt thanks and know that I'll be singing your praises to friends and family looking for exceptional travel experiences.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Sanctuary Cove Ocean View",
    category: "Tropical",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    cols: 2
  },
  {
    id: "gal-2",
    title: "Alpine Ascent Luxury Chalet",
    category: "Winter",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=600",
    cols: 1
  },
  {
    id: "gal-3",
    title: "Sunset over Sacred Spires",
    category: "Spiritual",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600",
    cols: 1
  },
  {
    id: "gal-4",
    title: "High-Dune Safari Campfire",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600",
    cols: 2
  },
  {
    id: "gal-5",
    title: "Serene Highlands Mist Path",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&q=80&w=600",
    cols: 1
  },
  {
    id: "gal-6",
    title: "Dal Lake Shikara Morning",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=600",
    cols: 1
  }
];

export const STATS: StatItem[] = [
  { id: "stat-1", label: "Satisfied Customers Reviews", targetValue: 179, suffix: "+" },
  { id: "stat-2", label: "Perfect Customer Rating", targetValue: 5, suffix: ".0 Rating" },
  { id: "stat-3", label: "Years of Travel Crafting", targetValue: 12, suffix: "+" },
  { id: "stat-4", label: "Successfully Completed Expeditions", targetValue: 350, suffix: "+" }
];
