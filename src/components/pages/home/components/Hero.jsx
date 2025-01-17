import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { hero1, hero2, hero3, heroKid, heroMale, heroWonen } from '../../../../asstes';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const slides = [
    {
      id: 1,
      image: hero1,
      title: "CUSTOMIZE YOUR STYLE",
      subtitle: "Design Your Perfect Outfit",
      buttonText: "START CUSTOMIZING"
    },
    {
      id: 2,
      image: hero2,
      title: "TRENDING COLLECTIONS",
      subtitle: "Explore the Latest Fashion",
      buttonText: "SHOP NOW"
    },
    {
      id: 3,
      image: hero3,
      title: "EXCLUSIVE OFFERS",
      subtitle: "Limited Time Discounts",
      buttonText: "GRAB DEALS"
    }
  ];

  const categories = [
    {
      id: 1,
      title: "Women's Fashion",
      image: heroWonen
    },
    {
      id: 2,
      title: "Men's Apparel",
      image: heroMale
    },
    {
      id: 3,
      title: "Kids' Clothing",
      image: heroKid
    }
  ];

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, );

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 750);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 750);
    }
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Main Hero Image */}
      <div className={`absolute inset-0 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover lg:object-contain md:pt-16 lg:pt-24"
            />
            <div className="absolute inset-0 bg-[#5f60b9]/60 lg:bg-[#5f60b9]/60" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[100svh] flex flex-col justify-center items-center mb-12 text-center text-white">
        <div className={`overflow-hidden transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-2 sm:mb-4 transition-transform duration-700 ease-in-out ${
              isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            {slides[currentSlide].subtitle}
          </h2>
        </div>
        <div className={`overflow-hidden transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 transition-transform duration-700 ease-in-out delay-100 ${
              isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            {slides[currentSlide].title}
          </h1>
        </div>
        <button 
          className={`bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-400 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {slides[currentSlide].buttonText}
        </button>
      </div>

      {/* Category Preview */}
      <div className={`absolute bottom-4 sm:bottom-6 lg:bottom-8 left-0 right-0 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className={`relative h-32 sm:h-40 lg:h-48 group overflow-hidden cursor-pointer transition-all duration-1000`}
                style={{ transitionDelay: `${1200 + index * 200}ms` }}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-base sm:text-lg lg:text-xl font-semibold transform transition-transform duration-300 group-hover:scale-110 ">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;