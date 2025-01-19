import React from 'react';
import { motion } from 'framer-motion';
import { FaTshirt, FaPencilAlt, FaShoppingCart, FaRuler, FaTruck } from 'react-icons/fa';

const steps = [
  { icon: FaTshirt, text: 'Select Item' },
  { icon: FaPencilAlt, text: 'Customize' },
  { icon: FaShoppingCart, text: 'Place Order' },
  { icon: FaRuler, text: 'Measurements' },
  { icon: FaTruck, text: 'Delivery' },
];

const WorkflowSection= () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="w-24 h-24 bg-[#5f60b9] rounded-full flex items-center justify-center text-white text-4xl mb-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <step.icon />
              </motion.div>
              <p className="text-lg font-semibold text-center">{step.text}</p>
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block w-16 h-1 bg-[#5f60b9]/50 mt-4"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;

