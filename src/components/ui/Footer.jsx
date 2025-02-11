import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/60 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Categories Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-white text-3xl font-bold">Thread & Trend</h2>
            </div>
            <h3 className="text-white text-lg font-bold mb-4">CATEGORIES</h3>
            <ul className="space-y-2">
              <li><a href="/shop?category=Women's" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="/shop?category=Men's" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="/shop?category=Kid's" className="hover:text-white transition-colors">Kids</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/aboutus" className="hover:text-white transition-colors">About</a></li>
              
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">GET IN TOUCH</h3>
            <p className="mb-4">
              Any questions? Let us know at our store in Thread & Trend, Pune or call us on (+91) 98765 43210
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 flex flex-col items-center space-y-4">
         

          {/* Copyright */}
          <div className="text-sm text-center">
            © {new Date().getFullYear()} Thread & Trend. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

