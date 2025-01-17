import React from 'react';
import { Facebook, Instagram, } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">CATEGORIES</h3>
            <ul className="space-y-2">
              <li><a href="/home" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="/home" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="/home" className="hover:text-white transition-colors">Shoes</a></li>
              <li><a href="/home" className="hover:text-white transition-colors">Watches</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li><a href="/home" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="/home" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="/home" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="/home" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">GET IN TOUCH</h3>
            <p className="mb-4">
              Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
            </p>
            <div className="flex space-x-4">
              <a href="/home" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="/home" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="/home" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.312 16.455c-.146.066-.301.106-.456.106-.614 0-1.012-.378-1.012-.957 0-.223.082-.446.247-.669.165-.223.406-.424.723-.602.317-.177.723-.365 1.219-.562.496-.198.903-.415 1.219-.652.317-.237.558-.514.723-.832.165-.317.247-.691.247-1.122 0-.819-.297-1.477-.892-1.975-.594-.498-1.385-.747-2.371-.747-.658 0-1.242.124-1.753.372-.512.249-.914.598-1.208 1.047-.294.45-.441.973-.441 1.569 0 .496.127.907.381 1.233.254.326.618.489 1.094.489.412 0 .738-.113.978-.338.241-.226.361-.521.361-.887 0-.317-.101-.592-.304-.825-.203-.233-.523-.349-.959-.349-.201 0-.378.039-.533.117l.025-.127c.101-.488.324-.87.67-1.147.346-.277.783-.415 1.309-.415.592 0 1.059.169 1.401.507.342.339.513.79.513 1.355 0 .354-.071.666-.213.938-.142.271-.342.498-.599.68-.257.183-.564.353-.921.51-.357.158-.738.329-1.142.513-.404.185-.774.394-1.107.629-.334.236-.604.51-.812.825-.208.316-.312.689-.312 1.122 0 .41.122.77.365 1.08.244.31.574.548.99.714.417.166.88.249 1.389.249.72 0 1.358-.171 1.914-.512.555-.341.987-.81 1.295-1.407.308-.597.462-1.287.462-2.071 0-.41-.061-.8-.183-1.17-.122-.37-.305-.701-.548-.993-.244-.291-.55-.52-.919-.686z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">NEWSLETTER</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="email@example.com"
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <img src="/api/placeholder/40/25" alt="PayPal" className="h-6" />
            <img src="/api/placeholder/40/25" alt="Visa" className="h-6" />
            <img src="/api/placeholder/40/25" alt="Mastercard" className="h-6" />
            <img src="/api/placeholder/40/25" alt="American Express" className="h-6" />
            <img src="/api/placeholder/40/25" alt="Discover" className="h-6" />
          </div>

          {/* Copyright */}
          <div className="text-sm text-center">
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;