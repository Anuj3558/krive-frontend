import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Your Company</title>
        <meta
          name="description"
          content="Get in touch with us for inquiries, support, or general questions."
        />
      </Helmet>

      <motion.div
        className="min-h-screen bg-gray-50 py-28  px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Page Title */}
        <motion.h1
          className="text-5xl font-bold text-center mb-16 text-gray-800"
          variants={itemVariants}
        >
          Contact Us
        </motion.h1>

        {/* Contact Section */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          variants={containerVariants}
        >
          {/* Get in Touch Section */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg space-y-6"
            variants={itemVariants}
          >
            <motion.h2
              className="text-3xl font-semibold text-gray-800"
              variants={itemVariants}
            >
              Get in Touch
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg"
              variants={itemVariants}
            >
              We'd love to hear from you! Whether you have a question about our services or just want to say hi, feel free to reach out.
            </motion.p>
            <motion.div
              className="space-y-4"
              variants={itemVariants}
            >
              <p className="text-gray-800">
                📧 Email:{" "}
                <a
                  href="mailto:contact@yourdomain.com"
                  className="text-blue-600 hover:underline"
                >
                  contact@yourdomain.com
                </a>
              </p>
              <p className="text-gray-800">
                📞 Phone:{" "}
                <a
                  href="tel:+123456789"
                  className="text-blue-600 hover:underline"
                >
                  +1 234 567 89
                </a>
              </p>
              <p className="text-gray-800">
                📍 Address: 123 Main Street, Your City, Your Country
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <form className="space-y-6">
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="text-center">
                <motion.button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;
