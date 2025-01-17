import React from 'react';
import { logoAnimtion } from '../../asstes';

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Main container */}
      <div className="relative w-96 h-64">
        {/* Brand name with floating effect */}
        <div className="flex justify-center mb-12 relative">
          {['K', 'r', 'i', 'v', 'e'].map((letter, index) => (
            <div
              key={index}
              className="relative"
            >
              <span
                className={`
                  inline-block text-6xl font-bold
                  bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent
                  animate-float
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  textShadow: '0 4px 12px rgba(79, 70, 229, 0.1)'
                }}
              >
                {letter}
              </span>
              {/* Particle effects */}
              <div className="absolute -top-1 left-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-particle opacity-0" 
                style={{ animationDelay: `${index * 0.2}s` }} />
              <div className="absolute -top-2 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-particle-reverse opacity-0" 
                style={{ animationDelay: `${index * 0.3}s` }} />
            </div>
          ))}
        </div>

        {/* Animated vehicle */}
        <div className="absolute bottom-0 w-full">
          <div className="relative animate-vehicle-move">
            <div className="w-24 h-24 relative animate-bounce-smooth">
              {/* Placeholder for logo - replace src with actual image */}
              <img 
                src={logoAnimtion}
                alt="Delivery vehicle"
                className="w-full h-full object-contain"
              />
              
              {/* Energy trail effect */}
              <div className="absolute -left-8 top-1/2 w-8 h-2 animate-trail">
                <div className="w-full h-full bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic road lines */}
        <div className="absolute bottom-8 w-full flex justify-between">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-0.5 w-6 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full animate-road-line"
              style={{
                animationDelay: `${i * 0.1}s`,
                transform: 'rotate(-45deg)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading text with pulse effect */}
      <div className="mt-12 relative">
        <span className="text-lg font-medium text-indigo-600 animate-pulse-fade">
          Loading
        </span>
        <span className="inline-flex ml-1">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-lg text-indigo-600 animate-bounce-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              .
            </span>
          ))}
        </span>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes particle {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          50% { transform: translateY(-20px) scale(1); opacity: 1; }
          100% { transform: translateY(-40px) scale(0); opacity: 0; }
        }
        
        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes vehicle-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes road-line {
          0% { opacity: 0; transform: translateX(20px) rotate(-45deg); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-20px) rotate(-45deg); }
        }
        
        @keyframes pulse-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-particle { animation: particle 2s ease-out infinite; }
        .animate-particle-reverse { animation: particle 2s ease-out infinite reverse; }
        .animate-bounce-smooth { animation: bounce-smooth 2s ease-in-out infinite; }
        .animate-vehicle-move { animation: vehicle-move 4s linear infinite; }
        .animate-road-line { animation: road-line 2s linear infinite; }
        .animate-pulse-fade { animation: pulse-fade 2s ease-in-out infinite; }
        .animate-bounce-dot { animation: bounce-dot 1s ease-in-out infinite; }
        .animate-trail { animation: pulse-fade 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LoadingScreen;