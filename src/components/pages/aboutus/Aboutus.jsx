import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
const ReviewForm = () => {
  const [formData, setFormData] = useState({
    author: '',
    text: '',
    rating: 5
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.text.length > 100) {
      setError('Review text must not exceed 100 characters');
      return;
    }

    // Here you would typically make an API call
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      author: '',
      text: '',
      rating: 5
    });
    setError('');
    alert('Review submitted successfully!');
  };

  const StarRating = () => (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 ${
              star <= formData.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-md justify-start bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <StarRating />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review (max 100 characters)
          </label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            maxLength={100}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-24"
            required
          />
          <div className="text-sm text-gray-500 mt-1">
            {formData.text.length}/100 characters
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};
const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger child animations for a cascading effect
        delayChildren: 0.2,  // Add a slight delay for starting animations
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 }, // Start off-screen and invisible
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring', // Smooth spring-like motion
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Title */}
      <motion.h1
        className="text-5xl font-bold text-center mt-20 mb-16 text-gray-800"
        variants={fadeInVariants} // Use a fade-in effect for the title
      >
        About Us
      </motion.h1>

      <motion.div className="max-w-7xl mx-auto space-y-24" variants={containerVariants}>
        {/* Section 1: Our Story */}
        <motion.section variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            className="w-full md:w-1/2"
            variants={itemVariants} // Each item has its own entrance animation
          >
            <img
              src="/images/story.jpg"
              alt="Our Story"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div className="w-full md:w-1/2" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Story</h2>
            <p className="text-gray-600 text-lg">
              Founded in 2023, our company has been at the forefront of innovation in the e-commerce industry. 
              We started with a simple idea: to create a platform that connects people with the products they love. 
              Today, we're proud to serve millions of customers worldwide, offering a seamless shopping experience 
              that combines cutting-edge technology with a personal touch.
            </p>
          </motion.div>
        </motion.section>

        {/* Section 2: Our Mission */}
        <motion.section variants={itemVariants} className="flex flex-col md:flex-row-reverse items-center gap-8">
          <motion.div className="w-full md:w-1/2" variants={fadeInVariants}>
            <img
              src="/images/mission.jpg"
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div className="w-full md:w-1/2" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              Our mission is to empower businesses and consumers alike by providing a seamless, 
              user-friendly platform for online shopping. We strive to offer the best products 
              at competitive prices while ensuring the highest standards of customer service. 
              By leveraging the latest technologies and data-driven insights, we aim to 
              revolutionize the e-commerce landscape and set new benchmarks for the industry.
            </p>
          </motion.div>
        </motion.section>

        {/* Section 3: Our Team */}
        <motion.section variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8">
          <motion.div className="w-full md:w-1/2" variants={fadeInVariants}>
            <img
              src="/images/team.jpg"
              alt="Our Team"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div className="w-full md:w-1/2" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Team</h2>
            <p className="text-gray-600 text-lg">
              We're a diverse group of passionate individuals, united by our commitment to excellence. 
              From our developers to our customer support staff, every member of our team plays a crucial 
              role in making our vision a reality. We foster a culture of innovation, collaboration, and 
              continuous learning, ensuring that we're always at the cutting edge of e-commerce solutions.
            </p>
          </motion.div>
        </motion.section>

        {/* Section 4: Our Values */}
        <motion.section variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg">
          <motion.h2
            className="text-3xl font-semibold mb-6 text-gray-800 text-center"
            variants={fadeInVariants}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Customer First", description: "We always prioritize our customers' needs and satisfaction." },
              { title: "Innovation", description: "We continuously strive to improve and innovate our services." },
              { title: "Integrity", description: "We conduct our business with the highest standards of ethics and transparency." },
              { title: "Sustainability", description: "We're committed to environmentally friendly practices in all our operations." }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 p-6 rounded-lg shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Contact Us */}
        <motion.section variants={fadeInVariants} className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          <p className="text-gray-600 text-lg mb-6">
            We'd love to hear from you! Whether you have a question about our products, 
            need help with an order, or just want to say hello, don't hesitate to reach out.
          </p>
<ReviewForm />
          <motion.button
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >

            Get in Touch
          </motion.button>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
