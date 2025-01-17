import React from "react";
import { useState } from "react";
export const AddSubcategorySection = () => {
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subcategorySlug, setSubcategorySlug] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add logic to save the subcategory (e.g., API call)
      console.log('Subcategory:', {
        categoryId,
        name: subcategoryName,
        slug: subcategorySlug,
      });
      setSubcategoryName('');
      setSubcategorySlug('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select a category</option>
            {/* Populate with categories from the database */}
            <option value="1">Men</option>
            <option value="2">Women</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subcategory Name</label>
          <input
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subcategory Slug</label>
          <input
            type="text"
            value={subcategorySlug}
            onChange={(e) => setSubcategorySlug(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Subcategory
        </button>
      </form>
    );
  };