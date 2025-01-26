"use client"

import React from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"



const FabricTypesPopover = ({ 
  selectedFabric, 
  onClose, 
  onSelectType 
}) => {
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
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{selectedFabric.name} Types</h2>
            <p className="text-gray-600">{selectedFabric.description}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
          {selectedFabric.types.map((type) => (
            <div
              key={type.id}
              onClick={() => onSelectType(type)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
            >
              <div className="aspect-square">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${type.image}` || "/placeholder.svg"}
                  alt={type.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">{type.name}</h3>
                <p className="text-gray-600">$ {type.price}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FabricTypesPopover