import React, { useState } from "react";

export const AddProductSection = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null); // For product image file
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [customizationOptions, setCustomizationOptions] = useState([]);
  const [currentCustomization, setCurrentCustomization] = useState({
    name: "",
    options: [],
  });

  // Handle product image upload
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImage(event.target.result); // Set base64 URL for product image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding a customization option
  const handleAddCustomizationOption = () => {
    if (currentCustomization.name && currentCustomization.options.length > 0) {
      setCustomizationOptions([...customizationOptions, currentCustomization]);
      setCurrentCustomization({ name: "", options: [] });
    }
  };

  // Handle adding an option to a customization
  const handleAddOption = () => {
    const optionName = prompt("Enter option name:");
    const optionPrice = parseFloat(prompt("Enter option price:"));
    if (optionName && !isNaN(optionPrice)) {
      // Create a file input element to allow image upload for the option
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target.result; // Base64 URL for the option image
            setCurrentCustomization((prev) => ({
              ...prev,
              options: [
                ...prev.options,
                { name: optionName, price: optionPrice, image: imageUrl },
              ],
            }));
          };
          reader.readAsDataURL(file);
        }
      };
      fileInput.click();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the product with customization options (e.g., API call)
    console.log("Product:", {
      name: productName,
      price: productPrice,
      image: productImage, // Base64 URL for the product image
      categoryId,
      subcategoryId,
      customizationOptions,
    });
    setProductName("");
    setProductPrice("");
    setProductImage(null);
    setCustomizationOptions([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      {/* Product Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Price
        </label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      {/* Product Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProductImageUpload}
          className="w-full p-2 border rounded-lg"
          required
        />
        {productImage && (
          <div className="mt-2">
            <img
              src={productImage}
              alt="Product Preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Select a category</option>
          <option value="1">Men</option>
          <option value="2">Women</option>
        </select>
      </div>

      {/* Subcategory */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subcategory
        </label>
        <select
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Select a subcategory</option>
          <option value="1">Tops</option>
          <option value="2">Bottoms</option>
        </select>
      </div>

      {/* Customization Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Customization Options
        </label>
        <div className="space-y-4">
          {customizationOptions.map((customization, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-medium">{customization.name}</h3>
              <ul className="mt-2 space-y-2">
                {customization.options.map((option, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={option.image}
                        alt={option.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <span>{option.name}</span>
                    </div>
                    <span>+${option.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="p-4 border rounded-lg">
            <input
              type="text"
              value={currentCustomization.name}
              onChange={(e) =>
                setCurrentCustomization((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Customization Name"
              className="w-full p-2 border rounded-lg mb-2"
            />
            <button
              type="button"
              onClick={handleAddOption}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Option
            </button>
            <button
              type="button"
              onClick={handleAddCustomizationOption}
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Customization
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Add Product
      </button>
    </form>
  );
};