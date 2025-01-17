import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CustomizationPage = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [details, setDetails] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});

  const categories = {
    Women: {
      image: '/api/placeholder/400/400',
      subcategories: {
        Indian: {
          image: '/api/placeholder/400/400',
          items: {
            Blouse: {
              image: '/api/placeholder/400/400',
              options: {
                Material: {
                  Cotton: {
                    image: '/api/placeholder/400/400',
                    price: '₹1000'
                  },
                  Silk: {
                    image: '/api/placeholder/400/400',
                    price: '₹2000'
                  },
                  Linen: {
                    image: '/api/placeholder/400/400',
                    price: '₹1500'
                  }
                },
                Sleeve: {
                  'Full Sleeve': {
                    image: '/api/placeholder/400/400',
                    price: '+₹200'
                  },
                  'Half Sleeve': {
                    image: '/api/placeholder/400/400',
                    price: '+₹150'
                  },
                  'Sleeveless': {
                    image: '/api/placeholder/400/400',
                    price: '+₹100'
                  }
                },
                Neck: {
                  'Round Neck': {
                    image: '/api/placeholder/400/400',
                    price: '+₹100'
                  },
                  'V-Neck': {
                    image: '/api/placeholder/400/400',
                    price: '+₹100'
                  },
                  'Collar': {
                    image: '/api/placeholder/400/400',
                    price: '+₹150'
                  }
                }
              }
            },
            Kurti: {
              image: '/api/placeholder/400/400',
              options: {
                Material: {
                  Cotton: {
                    image: '/api/placeholder/400/400',
                    price: '₹1200'
                  },
                  Silk: {
                    image: '/api/placeholder/400/400',
                    price: '₹2200'
                  }
                },
                Design: {
                  Floral: {
                    image: '/api/placeholder/400/400',
                    price: '+₹300'
                  },
                  Plain: {
                    image: '/api/placeholder/400/400',
                    price: '+₹200'
                  }
                }
              }
            }
          }
        },
        Western: {
          image: '/api/placeholder/400/400',
          items: {
            Dress: {
              image: '/api/placeholder/400/400',
              options: {
                Material: {
                  Polyester: {
                    image: '/api/placeholder/400/400',
                    price: '₹2000'
                  },
                  Silk: {
                    image: '/api/placeholder/400/400',
                    price: '₹3000'
                  }
                },
                Design: {
                  Floral: {
                    image: '/api/placeholder/400/400',
                    price: '+₹500'
                  },
                  Solid: {
                    image: '/api/placeholder/400/400',
                    price: '+₹300'
                  }
                }
              }
            }
          }
        }
      }
    },
    Men: {
      image: '/api/placeholder/400/400',
      subcategories: {
        Top: {
          image: '/api/placeholder/400/400',
          items: {
            Kurta: {
              image: '/api/placeholder/400/400',
              options: {
                Material: {
                  Cotton: {
                    image: '/api/placeholder/400/400',
                    price: '₹1500'
                  },
                  Silk: {
                    image: '/api/placeholder/400/400',
                    price: '₹2500'
                  }
                },
                Collar: {
                  'Mandarin': {
                    image: '/api/placeholder/400/400',
                    price: '+₹250'
                  },
                  'Stand Collar': {
                    image: '/api/placeholder/400/400',
                    price: '+₹200'
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setSubcategory('');
    setDetails('');
    setSelectedOptions({});
  };

  const handleSubcategorySelect = (selectedSubcategory) => {
    setSubcategory(selectedSubcategory);
    setDetails('');
    setSelectedOptions({});
  };

  const handleDetailsSelect = (selectedDetail) => {
    setDetails(selectedDetail);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Clothing Designer</h1>
          <p className="text-lg text-gray-600">Create your perfect outfit with our customization options</p>
        </motion.div>

        {/* Category Selection */}
        <motion.div 
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(categories).map(([cat, catData]) => (
              <motion.div key={cat} variants={itemVariants}>
                <ImageCard
                  title={cat}
                  image={catData.image}
                  isSelected={category === cat}
                  onClick={() => handleCategorySelect(cat)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Subcategory Selection */}
        {category && (
          <motion.div 
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Style</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Object.entries(categories[category].subcategories).map(([sub, subData]) => (
                <motion.div key={sub} variants={itemVariants}>
                  <ImageCard
                    title={sub}
                    image={subData.image}
                    isSelected={subcategory === sub}
                    onClick={() => handleSubcategorySelect(sub)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Details Selection */}
        {subcategory && (
          <motion.div 
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Item</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Object.entries(categories[category].subcategories[subcategory].items).map(([item, itemData]) => (
                <motion.div key={item} variants={itemVariants}>
                  <ImageCard
                    title={item}
                    image={itemData.image}
                    isSelected={details === item}
                    onClick={() => handleDetailsSelect(item)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Customization Options */}
        {details && (
          <motion.div 
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Customize Your Design</h2>
            <div className="space-y-12">
              {Object.entries(categories[category].subcategories[subcategory].items[details].options).map(([optionCategory, options]) => (
                <div key={optionCategory}>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">{optionCategory}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Object.entries(options).map(([optionName, optionData]) => (
                      <motion.div key={optionName} variants={itemVariants}>
                        <ImageCard
                          title={optionName}
                          image={optionData.image}
                          price={optionData.price}
                          isSelected={selectedOptions[optionCategory] === optionName}
                          onClick={() => handleOptionSelect(optionCategory, optionName)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Summary */}
        {Object.keys(selectedOptions).length > 0 && (
          <motion.div 
            className="bg-white shadow-lg p-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Selections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Basic Details</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <span className="font-medium w-32">Category:</span> {category}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="font-medium w-32">Style:</span> {subcategory}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="font-medium w-32">Item:</span> {details}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Customizations</h3>
                <ul className="space-y-2">
                  {Object.entries(selectedOptions).map(([category, option]) => (
                    <li key={category} className="flex items-center text-gray-600">
                      <span className="font-medium w-32">{category}:</span> {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomizationPage;

