import React from "react";
import { useState } from "react";
export const AddCategorySection = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categorySlug, setCategorySlug] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add logic to save the category (e.g., API call)
      console.log('Category:', { name: categoryName, slug: categorySlug });
      setCategoryName('');
      setCategorySlug('');
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Slug</label>
          <input
            type="text"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Category
        </button>
      </form>
    );
  };