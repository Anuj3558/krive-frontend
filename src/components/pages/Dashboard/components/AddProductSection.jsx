import React, { useState, useEffect } from "react"
import axios from "axios"
import { notification } from "antd"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus } from "lucide-react"

export const AddProductSection = () => {

  const [isMobileView, setIsMobileView] = useState(false)

  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState("")
  const [productImage, setProductImage] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [subcategoryId, setSubcategoryId] = useState("")
  const [selectedCustomizations, setSelectedCustomizations] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [customizationOptions, setCustomizationOptions] = useState([])

  useEffect(() => {
    fetchCategories()
    fetchSubcategories()
    fetchCustomizations()
    fetchProducts()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/categories`)
      setCategories(response.data)
    } catch (err) {
      console.error("Error fetching categories:", err)
      notification.error({
        message: "Error",
        description: "Failed to fetch categories.",
      })
    }
  }

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/subcategories`)
      setSubcategories(response.data)
    } catch (err) {
      console.error("Error fetching subcategories:", err)
      notification.error({
        message: "Error",
        description: "Failed to fetch subcategories.",
      })
    }
  }

  const fetchCustomizations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/customizations`)
      setCustomizationOptions(response.data)
    } catch (err) {
      console.error("Error fetching customizations:", err)
      notification.error({
        message: "Error",
        description: "Failed to fetch customizations.",
      })
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/products`)
      setProducts(response.data)
    } catch (err) {
      console.error("Error fetching products:", err)
      notification.error({
        message: "Error",
        description: "Failed to fetch products.",
      })
    }
  }

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProductImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", productName)
    formData.append("categoryId", categoryId)
    formData.append("subcategoryId", subcategoryId)
    formData.append("customizations", JSON.stringify(selectedCustomizations))
    if (productImage) {
      const blob = await fetch(productImage).then((res) => res.blob())
      formData.append("image", blob, "product-image.png")
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/addProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data) {
        notification.success({
          message: "Success",
          description: "Product added successfully!",
        })
        fetchProducts()
        resetForm()
      }
    } catch (err) {
      console.error("Error adding product:", err)
      notification.error({
        message: "Error",
        description: "Failed to add product.",
      })
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/deleteProduct/${productId}`)
      notification.info({
        message: "Deleted",
        description: "Product has been removed.",
      })
      fetchProducts()
    } catch (err) {
      console.error("Error deleting product:", err)
      notification.error({
        message: "Error",
        description: "Failed to delete product.",
      })
    }
    setShowDeleteConfirm(null)
  }

  const resetForm = () => {
    setProductName("")
    setProductImage(null)
    setCategoryId("")
    setSubcategoryId("")
    setSelectedCustomizations([])
  }

  const handleCustomizationChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value)
    setSelectedCustomizations(values)
  }


  // ... (keep all the existing fetch and handler functions)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-4 md:gap-6 max-w-7xl mx-auto">
        {/* Products List Section */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Products</h2>
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="mb-4"
                >
                  <div className="bg-white border rounded-lg p-3 md:p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-4">
                        {product.image && (
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
                            alt={product.name}
                            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold text-sm md:text-base">{product.name}</h3>
                          <p className="text-gray-600 text-sm">${product.price}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setShowDeleteConfirm(product._id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 size={isMobileView ? 16 : 20} />
                        </button>
                        {showDeleteConfirm === product._id && (
                          <div className="absolute right-0 top-8 w-48 md:w-64 bg-white border rounded-lg shadow-lg p-3 md:p-4 z-10">
                            <p className="text-sm mb-3">Are you sure you want to delete this product?</p>
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-2 md:px-3 py-1 text-xs md:text-sm text-gray-600 hover:text-gray-800"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="px-2 md:px-3 py-1 text-xs md:text-sm bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Add Product Form Section */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProductImageUpload}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                  required
                />
                {productImage && (
                  <div className="mt-2">
                    <img
                      src={productImage || "/placeholder.svg"}
                      alt="Product Preview"
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                  <select
                    value={subcategoryId}
                    onChange={(e) => setSubcategoryId(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                    required
                  >
                    <option value="">Select a subcategory</option>
                    {subcategories
                      .filter((subcategory) => subcategory.category._id === categoryId)
                      .map((subcategory) => (
                        <option key={subcategory._id} value={subcategory._id}>
                          {subcategory.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customizations</label>
                <select
                  multiple
                  value={selectedCustomizations}
                  onChange={handleCustomizationChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base"
                  size={isMobileView ? 3 : 4}
                >
                  {customizationOptions.map((customization) => (
                    <option key={customization._id} value={customization._id}>
                      {customization.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
              >
                <Plus size={isMobileView ? 16 : 20} />
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductSection