import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shirt, Palette, ScissorsSquare } from 'lucide-react';

const CustomizationOptions = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "I have Design but no Fabric",
      description: "Share your design and browse our fabric selection",
      icon: <Palette className="w-12 h-12" />,
      path: "/shop/fabric-designer"
    },
    {
      title: "I need Both",
      description: "Explore our complete collection of designs and fabrics",
      icon: <ScissorsSquare className="w-12 h-12" />,
      path: "/shop/customization"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">How would you like to customize?</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {options.map((option) => (
            <div
              key={option.title}
              onClick={() => navigate(option.path)}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer text-center"
            >
              <div className="flex justify-center mb-6 text-gray-800">
                {option.icon}
              </div>
              <h2 className="text-xl font-semibold mb-4">{option.title}</h2>
              <p className="text-gray-600">{option.description}</p>
            </div>
         
        ))}
         </div>
      </div>
    </div>
  );
};

export default CustomizationOptions;