"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

const CustomerDetailsForm = ({ 
  fabricTypeId, 
  onSubmit, 
  onClose 
}) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!name || !phone || !email || !address) {
      alert("Please fill all fields")
      return
    }

    const customerDetails = {
      name,
      phone,
      email,
      address,
      fabricTypeId
    }

    onSubmit(customerDetails)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Customer Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              required
              rows={3}
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-black py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CustomerDetailsForm