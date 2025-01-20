import React, { useState } from 'react';
import axios from 'axios';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import OrderSuccess from '../../ui/OrderSucess';

const { Dragger } = Upload;

const AlterationForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    instruction: '',
    userDetails: {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Updated file handling logic
  const handleFileChange = ({ file }) => {
    // Only process when the file is selected, not when upload starts/finishes
    if (file.status === 'removed') {
      setFormData(prev => ({
        ...prev,
        image: null
      }));
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      message.error('You can only upload image files!');
      return;
    }

    // Validate file size (5MB)
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
      return;
    }

    // Set the file directly in form data
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      message.error('Please upload an image');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    const data = new FormData();
    data.append('image', formData.image);
    data.append('instruction', formData.instruction);
    data.append('userDetails', JSON.stringify(formData.userDetails));

    try {
      console.log(formData)
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/client/alteration`,
        data
      );
      
      setSuccess(true);
      setFormData({
        image: null,
        instruction: '',
        userDetails: {
          name: '',
          email: '',
          phone: '',
          address: ''
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-16 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Place Your Order</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <Dragger
                name="image"
                multiple={false}
                onChange={handleFileChange}
                beforeUpload={() => false}
                showUploadList={true}
                maxCount={1}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Only a single image file (less than 5MB) is allowed.</p>
              </Dragger>
            </div>

            <div>
              <label htmlFor="instruction" className="block text-sm font-medium text-gray-700 mb-2">
                Instructions
              </label>
              <textarea
                id="instruction"
                name="instruction"
                value={formData.instruction}
                onChange={handleInputChange}
                placeholder="Enter your instructions"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              />
            </div>

            {/* User Details Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">User Details</h3>
              
              <div>
                <label htmlFor="userDetails.name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="userDetails.name"
                  name="userDetails.name"
                  value={formData.userDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="userDetails.email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="userDetails.email"
                  name="userDetails.email"
                  value={formData.userDetails.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="userDetails.phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="userDetails.phone"
                  name="userDetails.phone"
                  value={formData.userDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="userDetails.address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  id="userDetails.address"
                  name="userDetails.address"
                  value={formData.userDetails.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
            >
              {loading ? 'Submitting...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>

      {success && <OrderSuccess onClose={() => setSuccess(false)} />}
    </div>
  );
};

export default AlterationForm;