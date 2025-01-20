import React from "react";
import { motion } from "framer-motion";
import {
  alteration,
  alteration1,
  alteration2,
  alteration3,
  alteration4,
  alteration5,
} from "../../../asstes";

const ImageGallery = () => {
  const images = [
    alteration,
    alteration1,
    alteration2,
    alteration3,
    alteration4,
    alteration5,
  ];

  // Function to generate random sizes for the images
  const getRandomSize = () => {
    const sizes = ["row-span-1", "row-span-2", "col-span-1", "col-span-2"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((src, index) => {
        const randomSize = getRandomSize(); // Get a random size for each image
        return (
          <motion.div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg ${randomSize}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={src || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0"
              whileHover={{ opacity: 1 }}
            >
              {/* Optional: Add hover content like a button or text */}
              <button className="text-white text-lg font-semibold">
                View More
              </button>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImageGallery;