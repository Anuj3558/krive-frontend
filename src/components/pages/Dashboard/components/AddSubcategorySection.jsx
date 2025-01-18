import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSubcategorySection = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const [subcategoryName, setSubcategoryName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all categories on component load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/categories`, {
          headers: {
            Authorization: "secretkey",
          },
        });
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/subcategories`, {
          headers: {
            Authorization: "secretkey",
          },
        });
        setSubcategories(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch subcategories.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!categoryName || !subcategoryName) {
      setError("All fields are required.");
      return;
    }

    const newSubcategory = {
      categoryName,
      name: subcategoryName,
    };

    setLoading(true);
    setError(null);

    try {
      // Send POST request to the server using Axios
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/addSubcategory`,
        newSubcategory,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "secretkey",
          },
        }
      );

      // Update the local state with the new subcategory
      setSubcategories([
        ...subcategories,
        {
          id: response.data.subcategory._id, // Use the ID returned by the server
          ...newSubcategory,
          categoryName, // Use the selected category name
        },
      ]);

      // Reset the form
      setSubcategoryName("");
      setCategoryName("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add subcategory.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setSubcategories(subcategories.filter((sub) => sub.id !== id));
  };

  return (
    <div className="flex gap-8 p-6">
      {/* Left side - List of Subcategories */}
      <div className="w-1/2 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Added Subcategories</h2>
        <div className="space-y-4">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{subcategory.name}</h3>
                  <p className="text-sm text-gray-500">
                    Category: {subcategory.categoryName}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(subcategory.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {subcategories.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No subcategories added yet
            </p>
          )}
        </div>
      </div>

      {/* Right side - Add New Subcategory Form */}
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add New Subcategory</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subcategory Name
            </label>
            <input
              type="text"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
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
            {loading ? "Adding..." : "Add Subcategory"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategorySection;