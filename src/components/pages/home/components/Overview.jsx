import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductOverview = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/client/products`);
        setProducts(productsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProductClick = (product) => {
    navigate(`/shop?name=${encodeURIComponent(product.name)}`);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center my-16 sm:text-left"
        >
          FEATURED PRODUCTS
          <div className="border-b-[#5f60b9] border-b-4 w-16 mt-2 rounded-full"></div>
        </motion.h1>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {displayedProducts.map((product) => (
            <motion.div
              key={product._id}
              layout
              className="group relative"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md cursor-pointer">
                <div className="aspect-square relative">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}` || '/placeholder.svg'}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {product.isNew && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    New
                  </motion.span>
                )}
              </div>

              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-sm sm:text-base line-clamp-1">{product.name}</h3>
                </div>
                <motion.button
                  className="p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle wishlist functionality here
                  }}
                >
                  <Heart size={20} className="text-gray-600 hover:text-black transition-colors" />
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
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
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
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default ProductOverview;