import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  
  Settings,
  LogOut,
  ChevronLeft,
  List,
  Layers,
  Sliders,
} from 'lucide-react';

// Sidebar Component
export const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      section: 'dashboard',
    },
    {
      title: 'Categories',
      icon: List,
      section: 'categories',
    },
    {
      title: 'Subcategories',
      icon: Layers,
      section: 'subcategories',
    },
    {
      title: 'Products',
      icon: ShoppingBag,
      section: 'products',
    },
    {
      title: 'Customization',
      icon: Sliders,
      section: 'customization',
    },
    {
      title: 'Settings',
      icon: Settings,
      section: 'settings',
    },
  ];

  const sidebarVariants = {
    open: {
      width: '18rem',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      width: '5rem',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className="fixed inset-y-0 left-0 z-50 bg-white border-r"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between">
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">K</span>
                  </div>
                  <span className="text-xl font-bold">Krive</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:block hidden"
            >
              <motion.div
                animate={{ rotate: isOpen ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.section;
                return (
                  <li key={item.section}>
                    <button
                      onClick={() => setActiveSection(item.section)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative w-full ${
                        isActive
                          ? 'text-indigo-600'
                          : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-indigo-50 rounded-lg"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <item.icon className="w-5 h-5 shrink-0" />
                      <AnimatePresence mode="wait">
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="relative whitespace-nowrap"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 mt-auto">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 shrink-0" />
              <AnimatePresence mode="wait">
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap"
                  >
                    Log Out
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};