import React from "react";
import { useState } from "react";
export const AddCustomizationSection = () => {
    const [customizationName, setCustomizationName] = useState('');
    const [options, setOptions] = useState([]);
    const [optionName, setOptionName] = useState('');
    const [optionPrice, setOptionPrice] = useState('');
  
    const handleAddOption = () => {
      if (optionName && optionPrice) {
        setOptions([...options, { name: optionName, price: optionPrice }]);
        setOptionName('');
        setOptionPrice('');
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add logic to save the customization (e.g., API call)
      console.log('Customization:', {
        name: customizationName,
        options,
      });
      setCustomizationName('');
      setOptions([]);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customization Name</label>
          <input
            type="text"
            value={customizationName}
            onChange={(e) => setCustomizationName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Options</label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{option.name}</span>
                <span>${option.price}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
              placeholder="Option Name"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="number"
              value={optionPrice}
              onChange={(e) => setOptionPrice(e.target.value)}
              placeholder="Option Price"
              className="w-full p-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddOption}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Option
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Customization
        </button>
      </form>
    );
  };