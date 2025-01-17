import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet'; // Added Helmet for SEO
import { hero1 } from '../../../asstes';

const products = [
  {
    id: 1,
    name: 'Esprit Ruffle Shirt',
    price: 16.64,
    image: hero1,
    isNew: true,
    category: 'Women',
    customizationOptions: {
      Material: {
        Cotton: { price: '+₹1000' },
        Silk: { price: '+₹2000' },
        Linen: { price: '+₹1500' }
      },
      Sleeve: {
        'Full Sleeve': { price: '+₹200' },
        'Half Sleeve': { price: '+₹150' },
        'Sleeveless': { price: '+₹100' }
      },
      Neck: {
        'Round Neck': { price: '+₹100' },
        'V-Neck': { price: '+₹100' },
        'Collar': { price: '+₹150' }
      }
    }
  },
  {
    id: 2,
    name: 'Casual T-Shirt',
    price: 12.99,
    image: hero1,
    isNew: false,
    category: 'Men',
    customizationOptions: {
      Material: {
        Cotton: { price: '+₹1000' },
        Polyester: { price: '+₹800' }
      },
      Sleeve: {
        'Full Sleeve': { price: '+₹200' },
        'Half Sleeve': { price: '+₹150' }
      }
    }
  }
];

const ITEMS_PER_PAGE = 8;

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedOptions({});
  };

  const handleOptionSelect = (category, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option
    }));
  };

  const ImageCard = ({ title, image, isSelected, onClick, price }) => (
    <motion.div 
      onClick={onClick}
      className={`
        cursor-pointer bg-white overflow-hidden shadow-md
        transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : ''}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {price && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 text-sm">
            {price}
          </div>
        )}
      </div>
      <div className={`p-4 ${isSelected ? 'bg-blue-50' : ''}`}>
        <h4 className="font-medium text-gray-900">{title}</h4>
      </div>
    </motion.div>
  );

  return (
    <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-32">
      {/* Helmet for SEO */}
      

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-8"
      >
        SHOP
      </motion.h1>

      {/* Category Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {['All Products', 'Women', 'Men'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                activeCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
      </div>

      {/* Product Grid */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {displayedProducts
          .filter(
            (product) =>
              activeCategory === 'All Products' || product.category === activeCategory
          )
          .map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              layout
              whileHover={{ y: -8 }}
              className="group relative"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <div className="aspect-[4/5] flex items-center justify-center bg-gray-100">
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {product.isNew && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    New
                  </motion.span>
                )}
              </div>

              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-sm sm:text-base">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">${product.price.toFixed(2)}</p>
                </div>
                <motion.button 
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={20} className="text-muted-foreground hover:text-primary transition-colors" />
                </motion.button>
              </div>
            </motion.div>
          ))}
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center gap-2 mt-12"
      >
        <motion.button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        {generatePageNumbers().map((page, index) => (
          <motion.button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors text-sm sm:text-base ${
              currentPage === page
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
            whileHover={typeof page === 'number' ? { scale: 1.1 } : {}}
            whileTap={typeof page === 'number' ? { scale: 0.9 } : {}}
          >
            {page}
          </motion.button>
        ))}

        <motion.button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </motion.div>

      {/* Customization Popover */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg overflow-hidden w-full max-w-4xl relative max-h-[90vh] overflow-y-auto"
            >
              <motion.button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
                <div className="relative aspect-square bg-gray-100 rounded-lg">
                  <img
                    src={selectedProduct.image || '/placeholder.svg'}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">{selectedProduct.name}</h2>
                  <p className="text-lg sm:text-xl font-semibold mb-6">${selectedProduct.price.toFixed(2)}</p>
                  <div className="space-y-6">
                    {Object.entries(selectedProduct.customizationOptions).map(([category, options]) => (
                      <div key={category}>
                        <h3 className="font-medium mb-2">{category}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(options).map(([optionName, optionData]) => (
                            <motion.div key={optionName}>
                              <ImageCard
                                title={optionName}
                                image={optionData.image}
                                price={optionData.price}
                                isSelected={selectedOptions[category] === optionName}
                                onClick={() => handleOptionSelect(category, optionName)}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <motion.button 
                      className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShopPage;