import React, { useState, useEffect } from "react"
import axios from "axios"
import { notification } from "antd"

const AddFabric = () => {
  const [name, setName] = useState("")
  const [subcategoryId, setSubcategoryId] = useState("")
  const [subcategories, setSubcategories] = useState([])
  const [types, setTypes] = useState([{ name: "", image: null }])
  const [isLoading, setIsLoading] = useState(false)

  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(  `${process.env.REACT_APP_BACKEND_URL}/client/fabric-subcategories`)
        setSubcategories(response?.data?.subcategories)
      } catch (error) {
        api.error({
          message: "Error",
          description: "Error fetching subcategories. Please refresh the page."
        })
      }
    }
    fetchSubcategories()
  }, [api])

  const handleTypeChange = (index, field, value) => {
    const newTypes = [...types]
    if (field === "image") {
      newTypes[index] = { ...newTypes[index], [field]: value.target.files[0] }
    } else {
      newTypes[index] = { ...newTypes[index], [field]: value }
    }
    setTypes(newTypes)
  }

  const addType = () => {
    // Prevent adding new type if current type is incomplete
    const lastType = types[types.length - 1]
    if (!lastType.name || !lastType.image) {
      api.warning({
        message: "Incomplete Type",
        description: "Please complete the current fabric type before adding a new one."
      })
      return
    }
    setTypes([...types, { name: "", image: null }])
  }

  const removeType = (index) => {
    const newTypes = types.filter((_, i) => i !== index)
    setTypes(newTypes)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate last type
    const lastType = types[types.length - 1]
    if (!lastType.name || !lastType.image) {
      api.warning({
        message: "Incomplete Type",
        description: "Please complete all fabric types before submitting."
      })
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("subcategory", subcategoryId)

    types.forEach((type, index) => {
      formData.append(`types[${index}][name]`, type.name)
      formData.append(`types[${index}][image]`, type.image)
    })

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/add-fabric`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      
      api.success({
        message: "Success",
        description: "Fabric added successfully!"
      })

      // Reset form
      setName("")
      setSubcategoryId("")
      setTypes([{ name: "", image: null }])
    } catch (error) {
      api.error({
        message: "Error",
        description: "Failed to add fabric. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 sm:px-6 lg:px-8">
      {contextHolder}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold text-white">Add Fabric</h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Fabric Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 p-3 border-black block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                Subcategory *
              </label>
              <select
                id="subcategory"
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)}
                required
                className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fabric Types *</h3>
              {types.map((type, index) => (
                <div key={index} className="flex flex-wrap -mx-2 mb-4 bg-gray-50 p-4 rounded-md">
                  <div className="w-full sm:w-1/2 px-2 mb-2">
                    <label htmlFor={`type-name-${index}`} className="block text-xs font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      id={`type-name-${index}`}
                      value={type.name}
                      onChange={(e) => handleTypeChange(index, "name", e.target.value)}
                      required
                      className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-2">
                    <label htmlFor={`type-image-${index}`} className="block text-xs font-medium text-gray-700">
                      Image *
                    </label>
                    <input
                      type="file"
                      id={`type-image-${index}`}
                      onChange={(e) => handleTypeChange(index, "image", e)}
                      accept="image/*"
                      required
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100"
                    />
                  </div>
                  {index > 0 && (
                    <div className="w-full px-2 mt-2">
                      <button
                        type="button"
                        onClick={() => removeType(index)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addType}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Type
              </button>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
              >
                {isLoading ? "Adding..." : "Add Fabric"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddFabric