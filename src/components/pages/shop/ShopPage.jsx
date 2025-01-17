import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { hero1 } from '../../../asstes';

// Categories and products data remain the same as in your original code
// ... (keep the categories and products arrays as they were)
const categories = [
    {
      name: 'Men',
      slug: 'men',
      subcategories: [
        { name: 'Tops', slug: 'tops' },
        { name: 'Bottoms', slug: 'bottoms' },
        { name: 'Outerwear', slug: 'outerwear' },
        { name: 'Accessories', slug: 'accessories' }
      ]
    },
    {
      name: 'Women',
      slug: 'women',
      subcategories: [
        { name: 'Tops', slug: 'tops' },
        { name: 'Bottoms', slug: 'bottoms' },
        { name: 'Dresses', slug: 'dresses' },
        { name: 'Accessories', slug: 'accessories' }
      ]
    },
    {
      name: 'Kids',
      slug: 'kids',
      subcategories: [
        { name: 'Boys', slug: 'boys' },
        { name: 'Girls', slug: 'girls' },
        { name: 'Babies', slug: 'babies' },
        { name: 'Accessories', slug: 'accessories' }
      ]
    }
  ];
  const products = [
    {
      id: '1',
      name: 'Classic Shirt',
      price: 29.99,
      image: hero1,
      isNew: true,
      category: 'Men',
      subcategory: 'Shirts', // Added subcategory
      customizationOptions: [
        {
          name: 'Color',
          options: [
            { name: 'White', price: 0, image: hero1 },
            { name: 'Blue', price: 2, image: hero1 }
          ]
        },
        {
          name: 'Size',
          options: [
            { name: 'S', price: 0, image: hero1 },
            { name: 'M', price: 0, image: hero1 },
            { name: 'L', price: 2, image: hero1 }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Esprit Ruffle Shirt',
      price: 16.64,
      image: hero1,
      isNew: true,
      category: 'Women',
      subcategory: 'Shirts', // Added subcategory
      customizationOptions: [
        {
          name: 'Material',
          options: [
            { name: 'Cotton', price: 0, image: hero1 },
            { name: 'Silk', price: 20, image: hero1 },
            { name: 'Linen', price: 15, image: hero1 }
          ]
        },
        {
          name: 'Sleeve',
          options: [
            { name: 'Full Sleeve', price: 2, image: hero1 },
            { name: 'Half Sleeve', price: 1.5, image: hero1 },
            { name: 'Sleeveless', price: 1, image: hero1 }
          ]
        },
        {
          name: 'Neck',
          options: [
            { name: 'Round Neck', price: 1, image: hero1 },
            { name: 'V-Neck', price: 1, image: hero1 },
            { name: 'Collar', price: 1.5, image: hero1 }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Casual T-Shirt',
      price: 12.99,
      image: hero1,
      isNew: false,
      category: 'Men',
      subcategory: 'T-Shirts', // Added subcategory
      customizationOptions: [
        {
          name: 'Material',
          options: [
            { name: 'Cotton', price: 0, image: hero1 },
            { name: 'Polyester', price: 2, image: hero1 }
          ]
        },
        {
          name: 'Sleeve',
          options: [
            { name: 'Full Sleeve', price: 2, image: hero1 },
            { name: 'Half Sleeve', price: 1.5, image: hero1 }
          ]
        }
      ]
    }
  ];
const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Keep all your existing handler functions
  // ... (handlePageChange, generatePageNumbers, handleProductClick, etc.)
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

  const handleOrderFormChange = (e) => {
    setOrderForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceOrder = () => {
    // Here you would typically send the order data to your backend
    console.log('Order placed:', {
      user: orderForm,
      product: selectedProduct,
      selectedOptions
    });
    // Reset form and close popover
    setOrderForm({ name: '', email: '', phone: '', location: '' });
    setSelectedProduct(null);
  };

  const ImageCard = ({ title, image, isSelected, onClick, price }) => (
    <motion.div 
      onClick={onClick}
      className={`
        cursor-pointer bg-white overflow-hidden  shadow-md rounded-lg
        transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : ''}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
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
    <div className="min-h-screen bg-gray-50 ">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center my-16 sm:text-left"
        >
          SHOP
        </motion.h1>

        {/* Category and Subcategory Filters */}
        <div className="flex flex-col w-full gap-4 mb-8">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
            <motion.button
              onClick={() => {
                setActiveCategory('All Products');
                setSelectedCategory(null);
                setSelectedSubcategory(null);
              }}
              className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                activeCategory === 'All Products'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Products
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category.slug}
                onClick={() => {
                  setActiveCategory(category.name);
                  setSelectedCategory(category);
                  setSelectedSubcategory(null);
                }}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  activeCategory === category.name
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Subcategories */}
          <AnimatePresence>
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap justify-center sm:justify-start items-center gap-2"
              >
                {selectedCategory.subcategories.map((subcategory) => (
                  <motion.button
                    key={subcategory.slug}
                    onClick={() => setSelectedSubcategory(subcategory)}
                    className={`px-3 py-1.5 rounded-full text-sm border ${
                      selectedSubcategory?.slug === subcategory.slug
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {subcategory.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {displayedProducts
            .filter((product) => {
              if (activeCategory === 'All Products') return true;
              if (!selectedSubcategory) return product.category === activeCategory;
              return (
                product.category === activeCategory &&
                product.subcategory === selectedSubcategory.slug
              );
            })
            .map((product) => (
              <motion.div
                key={product.id}
                layout
                className="group relative"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
                  <div className="aspect-square relative">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                    <p className="text-gray-600 text-sm">${product.price.toFixed(2)}</p>
                  </div>
                  <motion.button 
                    className="p-2 rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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

        {/* Product Customization Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-20 p-10 bg-black bg-opacity-50"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white z-10 p-4 border-b">
                  <motion.button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute right-4 p-2 rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <h2 className="text-xl sm:text-2xl font-bold pr-12">{selectedProduct.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={selectedProduct.image || '/placeholder.svg'}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-6">
                    <p className="text-2xl font-bold">${selectedProduct.price.toFixed(2)}</p>
                    
                    {selectedProduct.customizationOptions.map((category) => (
                      <div key={category.name}>
                        <h3 className="font-medium mb-4">{category.name}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {category.options.map((option) => (
                            <ImageCard
                              key={option.name}
                              title={option.name}
                              image={option.image}
                              price={option.price > 0 ? `+$${option.price.toFixed(2)}` : ''}
                              isSelected={selectedOptions[category.name] === option.name}
                              onClick={() => handleOptionSelect(category.name, option.name)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}

                    <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        value={orderForm.name}
                        onChange={handleOrderFormChange}
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-lg"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        value={orderForm.email}
                        onChange={handleOrderFormChange}
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={orderForm.phone}
                        onChange={handleOrderFormChange}
                        placeholder="Phone Number"
                        className="w-full p-3 border rounded-lg"
                        required
                      />
                      <textarea
                        name="location"
                        value={orderForm.location}
                        onChange={handleOrderFormChange}
                        placeholder="Delivery Address"
                        className="w-full p-3 border rounded-lg min-h-[100px]"
                        required
                      />
                      <motion.button 
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Place Order
                      </motion.button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default ShopPage;

