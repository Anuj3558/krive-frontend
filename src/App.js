import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/ui/LogoAnimaiton';
import Navbar from './components/ui/Navbar';
import HomePage from './components/pages/home/Homepage';
import ShopPage from './components/pages/shop/ShopPage';
import Aboutus from './components/pages/aboutus/Aboutus';
import CustomizationPage from './components/customization/Customization';
import NotFoundPage from './components/pages/NotFoundPage';
import Footer from './components/ui/Footer';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Contact from './components/pages/contact/Contact';
import { LogIn } from 'lucide-react';
import AuthPage from './components/ui/Login';
import AlterationForm from './components/pages/alteration/Alteration';
import FabricDesigner from './components/pages/shop/FabricDesigner';
import CustomizationOptions from './components/pages/shop/CustomizationOptions';

// Loading Animation Component
const PageLoadingAnimation = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
  >
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-[#5f60b9] border-t-transparent rounded-full animate-spin"></div>
      <p className='text-[#5f60b9]'>Thread & Trend</p>
      <span className="mt-4 text-xl font-semibold text-[#5f60b9]">Loading...</span>
    </div>
  </motion.div>
);

// Enhanced Page Transition Wrapper Component
const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <PageLoadingAnimation key="loading" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoadingScreenWithRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <LoadingScreen />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/login';

  return (
    <div className="App relative">
      <ScrollToTop />
      <Helmet>
        <title>Thread & Trend - Premium Custom Fashion & Tailoring Services</title>
        <meta
          name="description"
          content="Thread & Trend offers bespoke tailoring services, custom clothing alterations, and personalized fashion solutions. Create your perfect look with our expert artisans."
        />
        <meta
          name="keywords"
          content="custom tailoring, bespoke clothing, fashion alterations, personalized fashion, made-to-measure, clothing customization, premium tailoring, sustainable fashion"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.threadandtrend.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {!isDashboard && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Welcome to Thread & Trend</title>
                  <meta
                    name="description"
                    content="Crafting your perfect style experience - Loading..."
                  />
                </Helmet>
                <LoadingScreenWithRedirect />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <PageTransition>
                <Helmet>
                  <title>Home - Thread & Trend | Custom Fashion Solutions</title>
                  <meta
                    name="description"
                    content="Discover made-to-measure fashion with Thread & Trend. Create personalized clothing that fits perfectly and expresses your unique style."
                  />
                </Helmet>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/shop"
            element={
              <PageTransition>
                <Helmet>
                  <title>Custom Clothing Shop | Thread & Trend</title>
                  <meta
                    name="description"
                    content="Explore our collection of customizable clothing. Choose from premium fabrics and design elements to create your perfect outfit."
                  />
                </Helmet>
                <CustomizationOptions />
              </PageTransition>
            }
          />
          <Route
            path="/aboutus"
            element={
              <PageTransition>
                <Helmet>
                  <title>About Thread & Trend | Our Tailoring Philosophy</title>
                  <meta
                    name="description"
                    content="Discover our commitment to sustainable fashion and precision tailoring. Thread & Trend combines traditional craftsmanship with modern design."
                  />
                </Helmet>
                <Aboutus />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Helmet>
                  <title>Contact Our Fashion Experts | Thread & Trend</title>
                  <meta
                    name="description"
                    content="Get personalized fashion advice or schedule a consultation with our tailoring experts. We're here to help create your perfect look."
                  />
                </Helmet>
                <Contact />
              </PageTransition>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <Helmet>
                  <title>Client Dashboard | Thread & Trend</title>
                  <meta
                    name="description"
                    content="Manage your custom orders, track alterations, and view your fashion profile. Your personalized style hub."
                  />
                </Helmet>
                <Dashboard />
              </PageTransition>
            }
          />
          <Route
            path="/alteration"
            element={
              <PageTransition>
                <Helmet>
                  <title>Premium Alteration Services | Thread & Trend</title>
                  <meta
                    name="description"
                    content="Expert clothing alterations and tailoring services. Perfect fit guaranteed for all garments including formal wear, dresses, and traditional attire."
                  />
                  <meta
                    name="keywords"
                    content="clothing alterations, premium tailoring, garment adjustment, bespoke alterations, dress modifications, suit tailoring, sustainable fashion care"
                  />
                  <meta property="og:title" content="Professional Alteration Services | Thread & Trend" />
                  <meta property="og:description" content="Precision alterations for perfect fit and renewed style" />
                  <link rel="canonical" href="https://www.threadandtrend.com/alteration" />
                </Helmet>
                <AlterationForm/>
              </PageTransition>
            }
          />
          <Route
            path="/shop/customization"
            element={
              <PageTransition>
                <Helmet>
                  <title>Custom Clothing Design Studio | Thread & Trend</title>
                  <meta
                    name="description"
                    content="Design your perfect garment with our 3D customization studio. Mix fabrics, patterns, and styles to create unique pieces."
                  />
                </Helmet>
                <ShopPage/>
              </PageTransition>
            }
          />
          <Route
            path="/shop/fabric-designer"
            element={
              <PageTransition>
                <Helmet>
                  <title>Digital Fabric Designer | Thread & Trend</title>
                  <meta
                    name="description"
                    content="Create custom fabric patterns with our digital design tool. Bring your unique textile visions to life."
                  />
                </Helmet>
                <FabricDesigner/>
              </PageTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PageTransition>
                <Helmet>
                  <title>Client Portal Login | Thread & Trend</title>
                  <meta
                    name="description"
                    content="Access your personalized fashion profile and order management system."
                  />
                </Helmet>
                <AuthPage/>
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <Helmet>
                  <title>Page Not Found | Thread & Trend</title>
                  <meta
                    name="description"
                    content="The style path you're looking for doesn't exist. Let's help you find the perfect fit."
                  />
                </Helmet>
                <NotFoundPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;