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
  X, 
  Folder,
  FolderOpen,
  Feather
} from 'lucide-react';

export const Sidebar = ({ 
  activeSection, 
  setActiveSection, 
  isOpen, 
  setIsOpen,
  isMobile 
}) => {
  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, section: 'dashboard' },
    { title: 'Categories', icon: List, section: 'categories' },
    { title: 'Subcategories', icon: Layers, section: 'subcategories' },
    { title: 'Products', icon: ShoppingBag, section: 'products' },
    { title: 'Customization', icon: Sliders, section: 'customization' },
    { title: 'Alteration Requests', icon: Settings, section: 'alteration' },
    { title: 'Fabric Categories', icon: Folder, section: 'fabricCategory' },
    { title: 'Fabric Subcategories', icon: FolderOpen, section: 'fabricSubcategory' },
    { title: 'Fabrics', icon: Feather, section: 'fabric' },
];

  const sidebarVariants = {
    open: { 
      width: isMobile ? '100%' : '18rem',
      x: 0,
      transition: { type: 'spring', stiffness: 400, damping: 40 } 
    },
    closed: { 
      width: isMobile ? '100%' : '5rem',
      x: isMobile ? '-100%' : 0,
      transition: { type: 'spring', stiffness: 400, damping: 40 } 
    },
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r ${
          isMobile ? 'w-[280px]' : ''
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <AnimatePresence mode="wait">
              {(isOpen || isMobile) && (
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
            
            {isMobile ? (
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
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
            )}
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.section;
                return (
                  <li key={item.section}>
                    <button
                      onClick={() => handleNavigation(item.section)}
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
                            damping: 30 
                          }}
                        />
                      )}
                      <item.icon className="w-5 h-5 shrink-0" />
                      <AnimatePresence mode="wait">
                        {(isOpen || isMobile) && (
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

          <div className="p-4 mt-auto">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 shrink-0" />
              <AnimatePresence mode="wait">
                {(isOpen || isMobile) && (
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