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

  // Fetch all customizations on component load
  useEffect(() => {
    fetchCustomizations();
  }, []);

  // Fetch customizations from the backend
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

  // Add a new option to the list
  const handleAddOption = () => {
    if (optionName && optionImage) {
      setOptions([
        ...options,
        {
          name: optionName,
          image: optionImage, // File object
          preview: URL.createObjectURL(optionImage), // For preview purposes
        },
      ]);
      setOptionName("");
      setOptionImage(null);
    }
  };

  // Handle image file upload
  const handleOptionImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOptionImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate input
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
        formData.append(`options[${index}][name]`, option.name); // Append option name
        formData.append(`options[${index}][image]`, option.image); // Append option image file
      });
  
      // Send POST request to the backend
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
        await fetchCustomizations(); // Refresh the list of customizations
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

  // Delete a customization
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
      await fetchCustomizations(); // Refresh the list of customizations
    } catch (err) {
      setError("Failed to delete customization");
    }
  };

  // Remove an option from the list
  const handleRemoveOption = (indexToRemove) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex gap-8 p-6">
      {/* Left side - List of Customizations */}
      <div className="w-1/2 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Added Customizations</h2>
        <div className="space-y-4">
          {customizations.map((customization) => (
            <div
              key={customization._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{customization.name}</h3>
             
              </div>
              <div className="grid grid-cols-2 gap-2">
                {customization.options.map((option, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                  >
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${option.image}`} // Display the image
                      alt={option.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="text-sm">{option.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {customizations.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No customizations added yet
            </p>
          )}
        </div>
      </div>

      {/* Right side - Add New Customization Form */}
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add New Customization</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customization Name
            </label>
            <input
              type="text"
              value={customizationName}
              onChange={(e) => setCustomizationName(e.target.value)}
              className="w-full p-2 border rounded-lg"
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
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <span>{option.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-500 hover:text-red-700"
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
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleOptionImageUpload}
                className="w-full p-2 border rounded-lg"
              />
              {optionImage && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(optionImage)}
                    alt="Option Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={handleAddOption}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Option
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Customization"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomizationSection;