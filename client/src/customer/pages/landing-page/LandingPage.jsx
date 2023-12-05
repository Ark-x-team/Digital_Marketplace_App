import { useEffect } from "react";
import Footer from "../../components/Footer";
import Features from "./features/Features";
import Header from "./header/Header";
import Reviews from "./reviews/Reviews";
import Overview from "./Overview";
import QuickLinks from "../../components/quick-links/QuickLinks";
import AOS from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 300,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <div className="flex">
        <QuickLinks />
        <div className="bg-gradient from-white dark:from-black to-light dark:tog-dark w-full flex flex-col">
          <Header />
          <Reviews />
          <Features />
          <Overview />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
