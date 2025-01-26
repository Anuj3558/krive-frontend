import React, { useState, useEffect } from 'react';
import { hero1, hero2, hero3, heroKid, heroMale, heroWonen } from '../../../../asstes';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

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
      title: "Women's",
      image: heroWonen,
      category: "Women's" // Add category value for query parameter
    },
    {
      id: 2,
      title: "Men's",
      image: heroMale,
      category: "Men's" // Add category value for query parameter
    },
    {
      id: 3,
      title: "Kid's",
      image: heroKid,
      category: "Kid's" // Add category value for query parameter
    }
  ];

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  },);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 750);
    }
  };

 

  // Function to handle category click
  const handleCategoryClick = (category) => {
    navigate(`/shop/customization?category=${encodeURIComponent(category)}`);
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
              className="w-full h-full object-contain bg-no-repeat lg:object-contain md:pt-16 lg:pt-24"
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
        <a href='/shop'>
          <button 
            className={`bg-black hover:bg-gray-800 mb-28 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-400 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {slides[currentSlide].buttonText}
          </button>
        </a>
      </div>

      {/* Category Preview */}
      <div className={`absolute bottom-0 left-0 right-0 
        transition-all duration-1000 delay-700 transform
        pb-4 xs:pb-6 sm:pb-8 md:pb-10 lg:pb-12
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className={`relative cursor-pointer overflow-hidden rounded-lg
                  transition-all duration-500 ease-out transform
                  h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 xl:h-48
                  hover:scale-[1.02] hover:shadow-xl
                  ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${1000 + index * 200}ms` }}
                onClick={() => handleCategoryClick(category.category)}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 
                    group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 
                  transition-opacity duration-300 hover:bg-black/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-semibold transition-all duration-300 transform
                    text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl
                    hover:scale-110">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;