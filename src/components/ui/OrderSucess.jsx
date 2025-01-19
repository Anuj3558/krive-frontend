import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccess = ({ onClose }) => {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#22c55e', '#000000', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg p-8 max-w-md w-full"
      >
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              damping: 10,
              stiffness: 100,
              delay: 0.2 
            }}
            className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-green-500" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Order Confirmed!</h2>
            <p className="text-gray-600">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>Check your email for order details</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={onClose}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderSuccess;

