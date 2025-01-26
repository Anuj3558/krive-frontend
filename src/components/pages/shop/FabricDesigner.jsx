import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ChevronRight, Check } from "lucide-react";
import axios from "axios";
import { notification } from "antd"; // Import Ant Design notification
import FabricTypesPopover from "./FabricTypesPopover";
import CustomerDetailsForm from "./CustomerDetailsForm";
import OrderSuccess from "../../ui/OrderSucess";

const FabricDesigner = () => {
  const [fabricData, setFabricData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [selectedFabricType, setSelectedFabricType] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Ant Design notification hook
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchFabrics = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/client/getallfabrics`);
        setFabricData(response?.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching fabrics:", error);
        setError("Failed to load fabrics. Please try again later.");
        setIsLoading(false);
        api.error({
          message: "Error",
          description: "Failed to load fabrics. Please try again later.",
        });
      }
    };

    fetchFabrics();
  }, [api]);

  const resetSelection = (level) => {
    switch (level) {
      case "category":
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setSelectedFabric(null);
        setSelectedFabricType(null);
        break;
      case "subcategory":
        setSelectedSubcategory(null);
        setSelectedFabric(null);
        setSelectedFabricType(null);
        break;
      case "fabric":
        setSelectedFabric(null);
        setSelectedFabricType(null);
        break;
      default:
        break;
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFabricTypeSelect = (fabricType) => {
    setSelectedFabricType(fabricType);
    setSelectedFabric(null);
    setShowCustomerForm(true);
  };

  const handleCustomerSubmit = async (customerDetails) => {
    if (!uploadedImage) {
      api.warning({
        message: "Warning",
        description: "Please upload an image before submitting.",
      });
      return;
    }

    try {
      // Convert base64 image to blob
      const response = await fetch(uploadedImage);
      const blob = await response.blob();

      // Create FormData object
      const formData = new FormData();

      // Append customer details
      Object.keys(customerDetails).forEach((key) => {
        formData.append(key, customerDetails[key]);
      });

      // Append image file
      formData.append("designImage", blob, "design_image.jpg");

      // Append fabric type ID
      formData.append("fabricTypeId", selectedFabricType.id);

      // Send multipart form data
      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/client/submit-mydesign-order`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.status === 201) {
        api.success({
          message: "Success",
          description: "Order submitted successfully!",
        });
        resetSelection("category");
        setShowSuccess(true);
        setUploadedImage(null);
        setShowCustomerForm(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      api.error({
        message: "Error",
        description: "Failed to submit order. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="animate-pulse text-2xl text-gray-600">Loading Fabric Designer...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 text-red-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Oops!</h2>
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 py-28">
      {contextHolder} {/* Render Ant Design notification context */}
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 flex-grow">Fabric Designer</h1>
            <div className="flex items-center space-x-2 text-gray-600">
              {selectedCategory && <span>{selectedCategory.category}</span>}
              {selectedSubcategory && (
                <>
                  <ChevronRight className="w-5 h-5" />
                  <span>{selectedSubcategory.name}</span>
                </>
              )}
              {selectedFabric && (
                <>
                  <ChevronRight className="w-5 h-5" />
                  <span>{selectedFabric.name}</span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image Upload Column */}
            <div className="md:col-span-1 border-r pr-8 border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Design</h2>
              <div className="space-y-4">
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <div
                    className={`w-full h-64 border-2 rounded-lg flex items-center justify-center transition-all ${
                      uploadedImage
                        ? "border-green-500 bg-green-50"
                        : "border-dashed border-gray-300 hover:border-black"
                    }`}
                  >
                    {uploadedImage ? (
                      <>
                        <img
                          src={uploadedImage}
                          alt="Uploaded fabric"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute bg-green-500 text-white rounded-full p-2">
                          <Check className="w-6 h-6" />
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Click to upload your design</p>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {uploadedImage && (
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="w-full text-sm text-red-600 hover:text-red-800 text-center"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            {/* Selection Columns */}
            <div className="md:col-span-2">
              {/* Category Selection */}
              {!selectedCategory && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Category</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {fabricData.map((category) => (
                      <motion.button
                        key={category.category}
                        onClick={() => setSelectedCategory(category)}
                        className={`p-4 rounded-lg text-left transition-all shadow-md ${
                          selectedCategory?.category === category.category
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100 border border-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category.category}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Subcategory Selection */}
              {selectedCategory && !selectedSubcategory && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Select {selectedCategory.category} Subcategory
                    </h2>
                    <button
                      onClick={() => resetSelection("category")}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      Reset Category
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedCategory.subcategories.map((subcategory) => (
                      <motion.button
                        key={subcategory.name}
                        onClick={() => setSelectedSubcategory(subcategory)}
                        className={`p-4 rounded-lg text-left transition-all shadow-md ${
                          selectedSubcategory?.name === subcategory.name
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100 border border-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {subcategory.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fabric Selection */}
              {selectedSubcategory && !selectedFabric && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Select {selectedSubcategory.name} Fabric
                    </h2>
                    <button
                      onClick={() => resetSelection("subcategory")}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      Reset Subcategory
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSubcategory.fabrics.map((fabric) => (
                      <motion.div
                        key={fabric.id}
                        onClick={() => setSelectedFabric(fabric)}
                        className={`p-4 rounded-lg cursor-pointer transition-all shadow-md ${
                          selectedFabric?.id === fabric.id
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100 border border-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <h3 className="font-bold text-center">{fabric.name}</h3>
                        <p className="text-sm text-center text-gray-500">{fabric.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Popover Components */}
        <AnimatePresence>
          {selectedFabric && (
            <FabricTypesPopover
              selectedFabric={selectedFabric}
              onClose={() => setSelectedFabric(null)}
              onSelectType={handleFabricTypeSelect}
            />
          )}

          {showCustomerForm && selectedFabricType && (
            <CustomerDetailsForm
              fabricTypeId={selectedFabricType.id}
              onSubmit={handleCustomerSubmit}
              onClose={() => {
                setShowCustomerForm(false);
                setSelectedFabricType(null);
              }}
            />
          )}
        </AnimatePresence>
        {showSuccess && <OrderSuccess onClose={() => setShowSuccess(false)} />}
      </div>
    </div>
  );
};

export default FabricDesigner;