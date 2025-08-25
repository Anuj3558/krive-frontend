import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCustomizationSection = () => {
  const [customizations, setCustomizations] = useState([]);
  const [customizationName, setCustomizationName] = useState("");
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState("");
  const [optionImage, setOptionImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchCustomizations();
    
    // Add responsive handler
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keep all the existing fetch and handler functions...
  const fetchCustomizations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/customizations`,
        {
          headers: {
            Authorization: "secretkey",
          },
        }
      );
      setCustomizations(response.data);
    } catch (err) {
      console.error("Error fetching customizations:", err);
      setError("Failed to fetch customizations");
    }
  };

  const handleAddOption = () => {
    if (optionName && optionImage) {
      setOptions([
        ...options,
        {
          name: optionName,
          image: optionImage,
          preview: URL.createObjectURL(optionImage),
        },
      ]);
      setOptionName("");
      setOptionImage(null);
    }
  };

  const handleOptionImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOptionImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customizationName || options.length === 0) {
      setError("Customization name and at least one option are required.");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("name", customizationName);
      
      options.forEach((option, index) => {
        formData.append(`options[${index}][name]`, option.name);
        formData.append(`options[${index}][image]`, option.image);
      });
      
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/addcustomization`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "secretkey",
          },
        }
      );
      
      if (response.data) {
        await fetchCustomizations();
        setCustomizationName("");
        setOptions([]);
        setError(null);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.response?.data?.error || "Failed to add customization");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomization = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/customization/${id}`,
        {
          headers: {
            Authorization: "secretkey",
          },
        }
      );
      await fetchCustomizations();
    } catch (err) {
      setError("Failed to delete customization");
    }
  };

  const handleRemoveOption = (indexToRemove) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* List of Customizations */}
        <div className="w-full lg:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Added Customizations</h2>
          <div className="space-y-4">
            {customizations.map((customization) => (
              <div
                key={customization._id}
                className="bg-gray-50 p-3 md:p-4 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-sm md:text-base">{customization.name}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {customization.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-white rounded"
                    >
                      <img
                        src={option.image}
                        alt={option.name}
                        className="w-6 h-6 md:w-8 md:h-8 object-cover rounded"
                      />
                      <span className="text-xs md:text-sm">{option.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {customizations.length === 0 && (
              <p className="text-gray-500 text-center py-4 text-sm md:text-base">
                No customizations added yet
              </p>
            )}
          </div>
        </div>

        {/* Add New Customization Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Add New Customization</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customization Name
                </label>
                <input
                  type="text"
                  value={customizationName}
                  onChange={(e) => setCustomizationName(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 border rounded-lg"
                    >
                      <img
                        src={option.preview}
                        alt={option.name}
                        className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-sm md:text-base">
                        <span>{option.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="text-red-500 hover:text-red-700 text-sm md:text-base px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    value={optionName}
                    onChange={(e) => setOptionName(e.target.value)}
                    placeholder="Option Name"
                    className="w-full p-2 border rounded-lg text-sm md:text-base"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOptionImageUpload}
                    className="w-full p-2 border rounded-lg text-sm md:text-ba  se"
                  />
                  {optionImage && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(optionImage)}
                        alt="Option Preview"
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm md:text-base"
                  >
                    Add Option
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm md:text-base">{error}</p>}

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm md:text-base"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Customization"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomizationSection;