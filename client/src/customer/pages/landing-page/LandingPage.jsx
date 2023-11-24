import { useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import Features from "./Features";
import Header from "./Header";
import Reviews from "./Reviews";
import Overview from "./Overview";
import QuickLinks from "../../components/quick-links/QuickLinks";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 300,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="flex">
        <QuickLinks />
        <div className="bg-gradient from-white dark:from-black to-light dark:tog-dark w-full flex flex-col">
          <Header />
          <Reviews />
          <Features />
          <Overview />
        </div>
      </div>
      <p></p>
      <Footer />
    </div>
  );
};

export default LandingPage;
