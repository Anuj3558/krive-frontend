import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "./components/Hero";
import ProductCategories from "./components/Categories";
import ProductOverview from "./components/Overview";
import ReviewForm from "./components/Review";
import { Cat, Workflow } from "lucide-react";
import WorkflowSection from "./components/WorkFlowSection";
import ReviewsMarquee from "./components/reelsSection";
import CTAButton from "./components/CTA";

const HomePage = () => {
  return (
    <>
      {/* SEO Optimization using Helmet */}
      <Helmet>
        <title>Best Online Tailor & Darzi in Indore | Customisable Fashion</title>
        <meta
          name="description"
          content="Discover the best online tailor and darzi services in Indore. Customisable and personalised fashion for men, women, and kids. Affordable alteration services at home."
        />
        <meta
          name="keywords"
          content="Online darzi, Online tailor, Darzi in Indore, Tailor in Indore, Best darzi in Indore, Best tailor in Indore, Best online tailor, Best online darzi, Online fabrics, Customisable fashion, Personalised fashion, Online fashion, Online fashion designer, Online fashion designer in Indore"
        />
        <meta property="og:title" content="Best Online Tailor & Darzi in Indore | Customisable Fashion" />
        <meta
          property="og:description"
          content="Discover the best online tailor and darzi services in Indore. Customisable and personalised fashion for men, women, and kids. Affordable alteration services at home."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yourwebsite.com" />
        <meta property="og:image" content="https://www.yourwebsite.com/logo.png" />
      </Helmet>

      <div className="">
        <HeroSection />
       
        <ProductCategories />
        <WorkflowSection />
        <ProductOverview />
    <ReviewsMarquee />
    <CTAButton />
      
        {/* Add other components as needed */}
      </div>
    </>
  );
};

export default HomePage;