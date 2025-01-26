import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"
import { Sidebar} from "./components/Slidebar"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import DashboardOverview from "./DashboardIveriew"
import AddCategorySection from "./components/Addcategory"
import AddSubcategorySection from "./components/AddSubcategorySection"
import AddProductSection from "./components/AddProductSection"
import AddCustomizationSection from "./components/AddCustomizationSection"
import AlterationRequests from "./Alteration"
import AddFabricCategory from "./components/AddFabricCategory"
import AddFabricSubcategory from "./components/AddFabricSubcategory"
import AddFabric from "./components/AddFabric"

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) {
      navigate("/login")
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      setIsOpen(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [navigate])

  const sectionComponents = {
    dashboard: {
      component: DashboardOverview,
      title: "Dashboard Overview",
    },
    categories: {
      component: AddCategorySection,
      title: "Categories Management",
    },
    subcategories: {
      component: AddSubcategorySection,
      title: "Subcategories Management",
    },
    products: {
      component: AddProductSection,
      title: "Products Management",
    },
    customization: {
      component: AddCustomizationSection,
      title: "Customization Options",
    },
    alteration: {
      component: AlterationRequests,
      title: "Alteration Requests",
    },
    fabricCategory: {
      component: AddFabricCategory,
      title: "Add Fabric Category",
    },
    fabricSubcategory: {
      component: AddFabricSubcategory,
      title: "Add Fabric Subcategory",
    },
    fabric: {
      component: AddFabric,
      title: "Add Fabric",
    },
  }

  const ActiveComponent = sectionComponents[activeSection]?.component

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isMobile={isMobile}
      />

      <div
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : isOpen ? "18rem" : "5rem",
          width: "100%",
        }}
      >
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button onClick={() => setIsOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <h1 className="text-xl font-bold">{sectionComponents[activeSection]?.title}</h1>
            </div>
          </div>
        </header>

        <main className="p-6">
          <AnimatePresence mode="wait">
            {ActiveComponent && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <ActiveComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

