import React from 'react';

const CTAButton = () => {
  return (
    <div className="text-center py-12 bg-white">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Ready to create your unique style?</h3>
      <a href='/shop'>
      <button className="bg-[#5f60b9] from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
        Order Now
      </button>
      </a>
    </div>
  );
};

export default CTAButton;

