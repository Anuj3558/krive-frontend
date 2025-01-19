import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/ui/LogoAnimaiton';
import Navbar from './components/ui/Navbar';
import HomePage from './components/pages/home/Homepage';
import ShopPage from './components/pages/shop/ShopPage';
import CustomizationPage from './components/customization/Customization';
import NotFoundPage from './components/pages/NotFoundPage';
import Footer from "./components/ui/Footer";
import Dashboard from './components/pages/Dashboard/Dashboard';

// Page Transition Loading Component
const PageTransitionLoader = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
  </div>
);

// Page Transition Wrapper Component
const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <PageTransitionLoader />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Loading Screen with enhanced transitions
const LoadingScreenWithRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <LoadingScreen />
    </div>
  );
};

// ScrollToTop component
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

// Main content component that uses location
const AppContent = () => {
  const location = useLocation();

  return (
    <div className="App relative">
      <ScrollToTop />
      <Helmet>
        <title>Krive - Best Online Tailor & Darzi Services in Indore</title>
        <meta
          name="description"
          content="Krive offers the best online tailor and darzi services in Indore."
        />
      </Helmet>

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Loading - Krive</title>
                  <meta
                    name="description"
                    content="Welcome to Krive. Please wait while we load your experience."
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
                  <title>Home - Krive</title>
                  <meta
                    name="description"
                    content="Welcome to Krive, your one-stop destination for customisable and personalised fashion."
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
                  <title>Shop - Krive</title>
                  <meta
                    name="description"
                    content="Shop the latest fashion trends at Krive."
                  />
                </Helmet>
                <ShopPage />
              </PageTransition>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <Helmet>
                  <title>Dashboard - Krive</title>
                  <meta
                    name="description"
                    content="Manage your Krive account and orders."
                  />
                </Helmet>
                <Dashboard />
              </PageTransition>
            }
          />

          <Route
            path="/customization"
            element={
              <PageTransition>
                <Helmet>
                  <title>Customization - Krive</title>
                  <meta
                    name="description"
                    content="Customise your clothing with Krive."
                  />
                </Helmet>
                <CustomizationPage />
              </PageTransition>
            }
          />

          <Route
            path="*"
            element={
              <PageTransition>
                <Helmet>
                  <title>Page Not Found - Krive</title>
                  <meta
                    name="description"
                    content="The page you are looking for does not exist."
                  />
                </Helmet>
                <NotFoundPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;