'use client'

import { motion } from "framer-motion"
import { Heart } from 'lucide-react'
import { useState } from "react"
import { ProductQuickView } from "./ProductQuickView"
import { hero1 } from "../../../../asstes"



const products = [
  {
    id: 1,
    name: "Esprit Ruffle Shirt",
    price: 16.64,
    image: hero1,
    isNew: true,
    category: "Women"
  },
  {
    id: 1,
    name: "Esprit Ruffle Shirt",
    price: 16.64,
    image: hero1,
    isNew: false,
    category: "Women"
  },{
    id: 1,
    name: "Esprit Ruffle Shirt",
    price: 16.64,
    image: hero1,
    isNew: false,
    category: "Women"
  },{
    id: 1,
    name: "Esprit Ruffle Shirt",
    price: 16.64,
    image: hero1,
    isNew: false,
    category: "Women"
  },{
    id: 1,
    name: "Esprit Ruffle Shirt",
    price: 16.64,
    image: hero1,
    isNew: false,
    category: "Women"
  },
  // ... other products remain the same
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const ITEMS_PER_PAGE = 4;

export default function ProductOverview() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        FEATURED PRODUCTS
        <div className=" border-b-[#5f60b9] border-b-4 w-16 mt-2 rounded-full"></div>
      </motion.h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
       
         

        
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {displayedProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            layout
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <div className="aspect-[4/5] flex items-center justify-center bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {product.isNew && (
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  New
                </motion.span>
              )}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity"
              >
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white text-black px-6 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Quick View
                </button>
              </motion.div>
            </div>
            
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
              </div>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Heart size={20} className="text-muted-foreground hover:text-primary transition-colors" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      
      
      <ProductQuickView
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}