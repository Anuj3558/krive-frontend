import React, { useEffect, useState } from "react";
import axios from "axios";

const AddCategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/categories`,
          {
            headers: {
              Authorization: "secretkey",
            },
          }
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    const newCategory = {
      name: categoryName,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/addCategory`,
        newCategory,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "secretkey",
          },
        }
      );

      setCategories([...categories, response.data.category]);
      setCategoryName("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/categories/${id}`, {
        headers: {
          Authorization: "secretkey",
        },
      });
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-6">
      {/* Categories List Section */}
      <div className="w-full lg:w-1/2">
        <div className="bg-gray-50 p-4 lg:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Added Categories</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white p-3 lg:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-500 text-center text-sm lg:text-base">
                  No categories added yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Category Form Section */}
      <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Add New Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter category name"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-200
                text-sm lg:text-base font-medium"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategorySection;