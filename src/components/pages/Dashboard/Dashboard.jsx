import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Slidebar';
import  AddCategorySection  from './components/Addcategory';
import AddCustomizationSection from './components/AddCustomizationSection';
import  {AddProductSection} from "./components/AddProductSection"
import  AddSubcategorySection  from './components/AddSubcategorySection';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100 mt-16">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <main className="flex-1 ml-[5rem] lg:ml-[18rem] p-8">
        <AnimatePresence mode="wait">
          {activeSection === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
              <p>Welcome to the admin dashboard. Use the sidebar to manage categories, products, and more.</p>
            </motion.div>
          )}

          {activeSection === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-4">Categories Management</h1>
              <AddCategorySection />
            </motion.div>
          )}

          {activeSection === 'subcategories' && (
            <motion.div
              key="subcategories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-4">Subcategories Management</h1>
              <AddSubcategorySection />
            </motion.div>
          )}

          {activeSection === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-4">Products Management</h1>
              <AddProductSection />
            </motion.div>
          )}

          {activeSection === 'customization' && (
            <motion.div
              key="customization"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-4">Customization Options</h1>
              <AddCustomizationSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;