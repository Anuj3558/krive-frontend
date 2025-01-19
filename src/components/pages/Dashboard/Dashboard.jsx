import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Slidebar';
import  AddCategorySection  from './components/Addcategory';
import AddCustomizationSection from './components/AddCustomizationSection';
import  {AddProductSection} from "./components/AddProductSection"
import  AddSubcategorySection  from './components/AddSubcategorySection';
import DashboardOverview from './DashboardIveriew';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      navigate('/login'); // Redirect to login page if token is not present
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100 ">
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
             <DashboardOverview />
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