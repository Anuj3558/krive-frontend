"use client";
import React, {  useRef } from 'react';
import { motion } from 'framer-motion';
import { heroMale } from '../../../../asstes';

const TestimonialCarousel = () => {
  
  const marqueeRef = useRef(null);
  
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, TechCorp",
      image: "/api/placeholder/300/400",
      quote: "This product has revolutionized our workflow. Highly recommended!"
    },
    {
      name: "Jane Smith",
      role: "Designer, CreativeCo",
      image: "/api/placeholder/300/400",
      quote: "The attention to detail and user experience is unparalleled."
    },
    {
      name: "Alex Johnson",
      role: "Developer, InnovateTech",
      image: "/api/placeholder/300/400",
      quote: "I've never seen a more intuitive and powerful tool. It's a game-changer."
    },
    {
      name: "Emily Brown",
      role: "Marketing Director, GrowthInc",
      image: "/api/placeholder/300/400",
      quote: "Our team's productivity has skyrocketed since we started using this."
    },
    {
      name: "Michael Lee",
      role: "Entrepreneur",
      image: heroMale,
      quote: "This solution has given us a competitive edge in the market."
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const marqueeVariants = {
    animate: {
      x: [0, -50 * duplicatedTestimonials.length],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          
        },
      },
    },
  };

  const TestimonialCard = ({ testimonial }) => (
    <div className=" sm:min-w-96 min-h-72 min-w-96  w-96 py-2 md:min-w-96 lg:w-96  mx-4">
      <div className="bg-white shadow-lg h-full w-full">
        <div className="h-1/2 overflow-hidden ">
          <img
            src={testimonial.image}
            alt={`${testimonial.name} - ${testimonial.role}`}
            className="w-full h-[300px] p-2 object-cover"
          />
        </div>
        <div className="p-4  flex flex-col justify-between">
          <p className="text-gray-700 text-sm sm:text-base md:text-lg overflow-hidden">
            "{testimonial.quote}"
          </p>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{testimonial.name}</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white ">
      <div className="max-w-full mx-auto py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">What Our Clients Say</h1>
          <p className="text-lg sm:text-xl text-gray-600">Trusted by industry leaders worldwide</p>
        </div>
        
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            variants={marqueeVariants}
            animate="animate"
            ref={marqueeRef}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-x-0 top-0 h-32 " />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default TestimonialCarousel;