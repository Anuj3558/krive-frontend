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

// Page Transition Wrapper Component
const PageTransition = ({ children }) => (
  <div
    className="transition-all duration-500 ease-in-out transform"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    {children}
  </div>
);

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
          path="/aboutus"
          element={
            <PageTransition>
              <Helmet>
                <title>About Us - Krive</title>
                <meta
                  name="description"
                  content="Learn more about Krive and our mission to deliver customizable fashion tailored to your needs."
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
                <title>Contact Us - Krive</title>
                <meta
                  name="description"
                  content="Get in touch with us for inquiries, support, or general questions."
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
                <title>Dashboard - Krive</title>
                <meta
                  name="description"
                  content="Access your personal dashboard for managing your orders and preferences."
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
