import React, { useEffect, useState } from "react";
import axios from "axios";

const AddCategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories when the component mounts
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

    // Validate input
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
      // Send POST request to the server using Axios
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

      // Update the local state with the new category
      setCategories([...categories, response.data.category]);

      // Reset the form
      setCategoryName("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the server
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/categories/${id}`, {
        headers: {
          Authorization: "secretkey",
        },
      });

      // Remove the category from the local state
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="flex gap-8 p-6">
      {/* Left side - List of Categories */}
      <div className="w-1/2 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Added Categories</h2>
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{category.name}</h3>
               
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No categories added yet
            </p>
          )}
        </div>
      </div>

      {/* Right side - Add New Category Form */}
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategorySection;