import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { featureKidsParty, FeatureKurta, featurePlatedSkirt, FeaturePlazo, TraditionalLengh } from '../../../../asstes';

// Skeleton Loading Component
const SkeletonCard = ({ isLarge = false }) => (
  <div className={`relative overflow-hidden rounded-lg ${isLarge ? 'h-96' : 'h-80'}`}>
    <div className="absolute inset-0 bg-gray-200 animate-pulse">
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" 
        style={{
          backgroundSize: '400% 100%',
          animation: 'shimmer 2.5s infinite linear'
        }}
      />
    </div>
    <div className="absolute bottom-8 left-8 space-y-4">
      <div className="h-8 w-48 bg-gray-300 rounded animate-pulse" />
      <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
      <div className="h-10 w-24 bg-gray-300 rounded animate-pulse" />
    </div>
  </div>
);

const ProductCard = ({ title, subtitle, image, isLarge = false, delay = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        delay: delay + 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay + 0.4
      }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "#000000dd",
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView && imageLoaded ? "visible" : "hidden"}
      className={`relative overflow-hidden rounded-lg shadow-2xl group ${
        isLarge ? 'h-96' : 'h-80'
      }`}
    >
      <AnimatePresence>
        {!imageLoaded && <SkeletonCard isLarge={isLarge} />}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={imageLoaded ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#5f60b9]/80 via-[#5f60b9]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={inView && imageLoaded ? "visible" : "hidden"}
          className="space-y-2"
        >
          <h2 className="text-3xl font-bold text-white drop-shadow-lg transform transition-transform duration-300 group-hover:translate-x-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/90 drop-shadow-md transform transition-transform duration-300 group-hover:translate-x-2">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.a 
          href="/shop"
          variants={buttonVariants}
          initial="hidden"
          animate={inView && imageLoaded ? "visible" : "hidden"}
          whileHover="hover"
          whileTap="tap"
          className="self-start"
        >
          <button className="px-6 py-2 bg-black text-white rounded-md shadow-lg transform transition-all duration-300 hover:shadow-xl">
            SHOP NOW
          </button>
        </motion.a>
      </div>
    </motion.div>
  );
};

const ProductCategories = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-16 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <SkeletonCard isLarge />
            <SkeletonCard isLarge />
          </>
        ) : (
          <>
            <ProductCard
              title="Designer Kurta"
              isLarge
              delay={0}
              image={FeatureKurta}
            />
            <ProductCard
              title="Western Dress"
              isLarge
              delay={0.2}
              image={featurePlatedSkirt}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <ProductCard
              title="Kids' Party Wear"
              delay={0.4}
              image={featureKidsParty}
            />
            <ProductCard
              title="Traditional Lehenga"
              delay={0.5}
              image={TraditionalLengh}
            />
            <ProductCard
              title="Cotton Palazzo Set"
              delay={0.6}
              image={FeaturePlazo
              }
            />
          </>
        )}
      </div>
    </motion.section>
  );
};

export default ProductCategories;