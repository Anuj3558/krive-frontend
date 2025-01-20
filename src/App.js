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

// Loading Animation Component
const PageLoadingAnimation = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
  >
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-[#5f60b9] border-t-transparent rounded-full animate-spin"></div>
      <p className='text-[#5f60b9]'>Krive</p>
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
    }, 1000); // 1 second loading animation

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
        <title>Krive - Best Online Tailor & Darzi Services in Indore</title>
        <meta
          name="description"
          content="Krive offers the best online tailor and darzi services in Indore."
        />
      </Helmet>

      {!isDashboard && <Navbar />}

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
            path="/alteration"
            element={
              <PageTransition>
                <Helmet>
                  <title>Clothing Alterations & Tailoring Services | Krive</title>
                  <meta
                    name="description"
                    content="Professional clothing alteration services in Indore. Expert tailoring for all garments including suits, dresses, pants, and traditional wear. Same-day alterations available."
                  />
                  <meta
                    name="keywords"
                    content="clothing alterations, garment alterations, tailoring services, dress alterations, suit alterations, pants hemming, size adjustment, clothing repair, seamstress services, professional tailor, same day alterations, traditional wear alterations, Indore tailor"
                  />
                  {/* Additional meta tags for SEO */}
                  <meta property="og:title" content="Clothing Alterations & Tailoring Services | Krive" />
                  <meta property="og:description" content="Professional clothing alteration services in Indore. Expert tailoring for all garments." />
                  <meta name="twitter:title" content="Clothing Alterations & Tailoring Services | Krive" />
                  <link rel="canonical" href="https://www.krive.com/alteration" />
                </Helmet>
                <AlterationForm/>
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
            path="/Login"
            element={
              <PageTransition>
                <Helmet>
                  <title>Login Krive</title>
                 
                </Helmet>
                < AuthPage/>
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