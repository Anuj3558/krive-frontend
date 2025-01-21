import React, { useState, useEffect } from "react"
import axios from "axios"

const AddSubcategorySection = () => {
  const [subcategories, setSubcategories] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [subcategoryName, setSubcategoryName] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchSubcategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/categories`, {
        headers: { Authorization: "secretkey" },
      })
      setCategories(response.data)
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }

  const fetchSubcategories = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/subcategories`, {
        headers: { Authorization: "secretkey" },
      })
      setSubcategories(response.data)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch subcategories.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!categoryName || !subcategoryName) {
      setError("All fields are required.")
      return
    }

    const newSubcategory = { categoryName, name: subcategoryName }
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/addSubcategory`, newSubcategory, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "secretkey",
        },
      })

      setSubcategories([
        ...subcategories,
        {
          id: response.data.subcategory._id,
          ...newSubcategory,
          categoryName,
        },
      ])

      setSubcategoryName("")
      setCategoryName("")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add subcategory.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-6">
      {/* Subcategories List Section */}
      <div className="w-full lg:w-1/2">
        <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Added Subcategories</h2>
          <div className="space-y-3">
            {subcategories.map((subcategory) => (
              <div 
                key={subcategory.id} 
                className="bg-white p-3 lg:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{subcategory.name}</h3>
                    <p className="text-sm text-gray-500">Category: {subcategory.categoryName}</p>
                  </div>
                </div>
              </div>
            ))}
            {subcategories.length === 0 && (
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-500 text-center">No subcategories added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Subcategory Form Section */}
      <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Add New Subcategory</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory Name</label>
              <input
                type="text"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                placeholder="Enter subcategory name"
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
              {loading ? "Adding..." : "Add Subcategory"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddSubcategorySection