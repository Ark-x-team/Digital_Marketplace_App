// Import necessary dependencies and components
import { LazyLoadImage } from "react-lazy-load-image-component";
import { For } from "million/react"; // Assuming this is a custom For loop component
import PropTypes from "prop-types";
import featuresData from "./FeaturesData"; // Assuming this is an array of feature data
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useState } from "react";

// Define the Features component
function Features() {
  const { t } = useTranslation();

  // State to track if the page is refreshed
  const [isPageRefreshed, setIsPageRefreshed] = useState(false);

  // useEffect to set isPageRefreshed to true on component mount
  useEffect(() => {
    setIsPageRefreshed(true);
  }, []);

  // Feature component representing an individual feature
  const Feature = (props) => (
    <li
      data-aos={isPageRefreshed ? "" : "fade-up"}
      data-aos-delay={isPageRefreshed ? 0 : props.delay * 300}
      className="flex md:flex-col md:items-center gap-5 lg:max-w-xs"
    >
      {/* Lazy-loaded feature icon */}
      <LazyLoadImage
        src={`/icons/${props.icon}`}
        alt="icon"
        loading="lazy"
        className="h-16 lg:h-20 bg-neutral-100 dark:bg-neutral-800 p-3 lg:p-4 rounded-2xl"
      />

      {/* Feature title and description */}
      <span className="flex flex-col md:text-center gap-2 lg:gap-3">
        <h1 className="text-xl md:text-2xl capitalize font-semibold">
          {t(props.title)}
        </h1>
        <p className="text-dark dark:text-light">{t(props.description)}</p>
      </span>
    </li>
  );

  // PropTypes for the Feature component
  Feature.propTypes = {
    delay: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
  };

  // Map over featuresData array and render Feature components
  const features = (
    <For each={featuresData}>
      {(item, index) => (
        <Feature
          key={index}
          delay={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      )}
    </For>
  );

  // Render the Features component
  return (
    <div
      id="features"
      className="main-container px-4 md:px-0 py-10 md:py-14 lg:py-20 flex flex-col gap-8 lg:gap-16 xl:gap-24 items-center z-10 relative overflow-hidden"
    >
      {/* Section title */}
      <h1 className="font-title capitalize text-center text-3xl md:text-4xl lg:text-5xl text-primary ">
        {t("your gateway to digital excellence")}
      </h1>

      {/* List of features */}
      <ul className="w-full flex flex-col md:flex-row gap-6 justify-evenly z-20">
        {features}
      </ul>

      {/* Background image */}
      <img
        src="/shapes/blur.svg"
        alt=""
        loading="lazy"
        className="blur-shape left-1/4 top-0 w-2/5 rotate-45 opacity-50"
      />
    </div>
  );
}

// Export the Features component as the default export
export default Features;
