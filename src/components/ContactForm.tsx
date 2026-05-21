import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Send, CheckCircle2, Phone, Calendar, User, Compass, HelpCircle } from "lucide-react";

interface ContactFormProps {
  selectedDestination: string;
  setSelectedDestination: (dest: string) => void;
}

export default function ContactForm({ selectedDestination, setSelectedDestination }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

  // Sync prop changes with input fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const destinationsList = [
    "Maldives",
    "Kashmir, India",
    "Dubai, UAE",
    "Switzerland & Italy",
    "Munnar, Kerala",
    "Makkah & Madinah (Umrah)",
    "Other Custom Sanctuary"
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionRecord = {
      name: formData.name,
      phone: formData.phone,
      destination: selectedDestination || "Other Custom Sanctuary",
      date: formData.date
    };

    setLastSubmittedData(submissionRecord);

    // Simulate luxury API submission with loading animation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setFormData({
        name: "",
        phone: "",
        date: "",
      });
      setSelectedDestination("");
    }, 2000);
  };

  return (
    <div className="relative bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100 min-h-[580px]">
      
      {/* Visual / Information Side Banner */}
      <div className="md:w-[40%] bg-primary p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl transform translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-secondary-light">
            Private Passage Gate
          </span>
          <h3 className="font-display text-3xl font-bold mt-2 mb-6 leading-tight">
            Curate Your Next Expedition
          </h3>
          <p className="text-white/80 text-xs lg:text-sm leading-relaxed mb-8 font-light">
            Enter your desired trajectory, and our Elite concierge specialists will formulate a customized travel itinerary corresponding to your absolute criteria.
          </p>
        </div>

        {/* Benefits List */}
        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2 bg-white/10 rounded-full text-secondary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold tracking-wide font-sans">
              24/7 dedicated personal butler concierge
            </span>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2 bg-white/10 rounded-full text-secondary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold tracking-wide font-sans">
              Tailored gourmet dining alignments
            </span>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2 bg-white/10 rounded-full text-secondary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold tracking-wide font-sans">
              Private charter alignments available
            </span>
          </div>
        </div>

        {/* Signature Line */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-light">
            Voyage Adventures LLP
          </span>
          <span className="text-xs text-white tracking-widest font-mono">
            09746999778
          </span>
        </div>
      </div>

      {/* Main Interactive Form Area */}
      <div className="flex-1 p-8 lg:p-12 relative flex flex-col justify-center">
        
        {/* Real-time Success Notification Modal */}
        {isSuccess && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center animate-fade-in transition-all duration-500">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-200">
              <CheckCircle2 className="h-9 w-9 text-green-500" />
            </div>
            <h4 className="font-display text-2xl font-bold text-primary mb-2">
              Booking Confirmed!
            </h4>
            <p className="text-gray-600 text-sm max-w-sm leading-relaxed mb-6">
              Your customized travel corridor request has been securely registered! Our expert travel coordinators will contact you directly on your phone shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs justify-center">
              <button
                id="success-modal-dismiss-btn"
                onClick={() => setIsSuccess(false)}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white tracking-widest text-xs uppercase font-bold transition-all duration-300 w-full"
              >
                Return to Site
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8" id="expedition-inquiry-form">
          
          {/* Header */}
          <div className="mb-2">
            <h4 className="font-display text-2xl font-bold text-primary">
              Personal Credentials & Path
            </h4>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Please declare your basic requirements securely below
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Name Input with Perfect Floating Label */}
            <div className="relative group/input">
              <User className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within/input:text-secondary-dark transition-colors duration-300" />
              <input
                type="text"
                name="name"
                id="form-input-name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="peer block w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-slate-200 focus:border-secondary focus:outline-none transition-all duration-300 text-sm text-primary font-medium"
                placeholder=" "
              />
              <label
                htmlFor="form-input-name"
                className="absolute left-10 top-3 text-slate-400 text-sm transition-all duration-300 pointer-events-none origin-[0] transform -translate-y-5.5 scale-85 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5.5 peer-focus:scale-85 peer-focus:text-secondary-dark"
              >
                Full Gentleman/Madame Name
              </label>
            </div>

            {/* Phone Input with Perfect Floating Label */}
            <div className="relative group/input">
              <Phone className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within/input:text-secondary-dark transition-colors duration-300" />
              <input
                type="tel"
                name="phone"
                id="form-input-phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="peer block w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-slate-200 focus:border-secondary focus:outline-none transition-all duration-300 text-sm text-primary font-medium"
                placeholder=" "
              />
              <label
                htmlFor="form-input-phone"
                className="absolute left-10 top-3 text-slate-400 text-sm transition-all duration-300 pointer-events-none origin-[0] transform -translate-y-5.5 scale-85 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5.5 peer-focus:scale-85 peer-focus:text-secondary-dark"
              >
                Secure Phone Number
              </label>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Destination Selection Grid Dropdown */}
            <div className="relative group/input">
              <Compass className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within/input:text-secondary-dark transition-colors duration-300 z-10" />
              <select
                name="destination"
                id="form-input-destination"
                required
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-slate-200 focus:border-secondary focus:outline-none transition-all duration-300 text-sm text-primary font-medium appearance-none relative"
              >
                <option value="" disabled className="text-slate-400">
                  Select Chosen Sanctuary
                </option>
                {destinationsList.map((dest) => (
                  <option key={dest} value={dest} className="text-slate-800 font-sans">
                    {dest}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-4 pointer-events-none text-slate-400">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Travel Date Picker Input Form */}
            <div className="relative group/input">
              <Calendar className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400 group-focus-within/input:text-secondary-dark transition-colors duration-300" />
              <input
                type="date"
                name="date"
                id="form-input-date"
                required
                value={formData.date}
                onChange={handleInputChange}
                onFocus={(e) => (e.target.type = "date")}
                className="block w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-slate-200 focus:border-secondary focus:outline-none transition-all duration-300 text-sm text-primary font-medium"
              />
            </div>

          </div>

          {/* Form Action Controls with Staggered Options */}
          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            
            {/* Primary Submit Button */}
            <button
              type="submit"
              id="form-submit-btn"
              disabled={isSubmitting}
              className="w-full sm:flex-1 relative flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-primary-light text-white font-sans text-xs tracking-widest font-bold uppercase py-4 px-8 rounded-none transition-all duration-300 border border-primary font-semibold shadow-lg hover:shadow-2xl overflow-hidden min-h-[50px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Credentials...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 text-secondary-light" />
                  Book Elite Inquiries
                </>
              )}
            </button>

            {/* Instant WhatsApp Quick Connection in form */}
            <a
              id="form-whatsapp-quick-connect"
              href="https://wa.me/919746999778"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs tracking-widest font-bold uppercase py-4 px-6 transition-all duration-300 border border-[#25D366] font-semibold"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.707 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Quick Chat
            </a>

          </div>

        </form>
      </div>

    </div>
  );
}
