// Import necessary dependencies and components
import { useEffect } from "react";
import Footer from "../../Components/Footer";
import Features from "./Features/Features";
import Header from "./Header/Header";
import Reviews from "./Reviews/Reviews";
import Overview from "./Overview";
import QuickLinks from "../../Components/Quick-links/QuickLinks";
import AOS from "aos"; // Import AOS (Animate On Scroll) library
import "aos/dist/aos.css"; // Import AOS styles

// Define the LandingPage component
function LandingPage() {
  // useEffect hook to initialize AOS and refresh it
  useEffect(() => {
    AOS.init({
      once: true, // Set animation to occur only once
      duration: 300, // Set animation duration to 300 milliseconds
    });
    AOS.refresh(); // Refresh AOS
  }, []);

  // Render the LandingPage component
  return (
    <>
      {/* Container for the entire landing page */}
      <div className="flex">
        {/* QuickLinks component for navigation */}
        <QuickLinks />
        {/* Main content area with a gradient background */}
        <div className="bg-gradient from-white dark:from-black to-light dark:tog-dark w-full flex flex-col">
          {/* Header component */}
          <Header />
          {/* Reviews component */}
          <Reviews />
          {/* Features component */}
          <Features />
          {/* Overview component */}
          <Overview />
        </div>
      </div>
      {/* Footer component */}
      <Footer />
    </>
  );
}

// Export the LandingPage component as the default export
export default LandingPage;
