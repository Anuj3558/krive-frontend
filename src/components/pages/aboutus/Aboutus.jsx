import React from 'react';
import { motion } from 'framer-motion';

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
