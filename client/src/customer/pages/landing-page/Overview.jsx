// Import necessary dependencies and components
import { LazyLoadImage } from "react-lazy-load-image-component";
import { For } from "million/react";
import { useTranslation } from "react-i18next";

// Define the Overview component
function Overview() {
  // Array of icon filenames
  const iconsData = ["design.svg", "code.svg", "image.svg", "music.svg"];

  // Initialize the useTranslation hook
  const { t } = useTranslation();

  // Render icons using the For component
  const icons = (
    <ul className="flex gap-4">
      <For each={iconsData} memo>
        {(item, index) => (
          <img
            key={index}
            src={`/icons/${item}`}
            alt="icon"
            className="h-6 md:h-8"
          />
        )}
      </For>
    </ul>
  );

  // Render the Overview component
  return (
    <div
      id="overview"
      className="w-full relative after:absolute after:w-full after:h-2/4 after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:bottom-full overflow-hidden"
    >
      <div className="main-container relative py-10 md:py-14 lg:py-20 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
        {/* Left content column */}
        <div
          data-aos="fade-left"
          data-aos-duration="300"
          data-aos-delay="100"
          className="lg:w-1/2 flex flex-col gap-8 lg:gap-12 xl:gap-14 px-4 lg:px-5 z-10"
        >
          {/* Title and icons */}
          <span className="flex flex-col items-center lg:items-start gap-6 ">
            <h1 className="font-title capitalize text-3xl md:text-4xl lg:text-5xl text-primary ">
              {t("explore endless possibilities")}
            </h1>
            {icons}
          </span>
          {/* Description */}
          <p className="text-lg text-dark dark:text-light">
            {t(
              "dive into boundless creativity on our digital marketplace. Explore design, photography, programming, and more. unleash endless possibilities tailored to your needs"
            )}
          </p>
        </div>
        {/* Right content column with images */}
        <div className="p-1 flex flex-wrap justify-center relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0 max-w-sm md:max-w-full lg:max-w-md xl:max-w-xl -rotate-3">
          {/* Photography image */}
          <LazyLoadImage
            src="https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="photography image"
            className="overview-image h-44 md:h-56 lg:h-64 xl:h-68 p-1 md:p-2"
          />
          {/* Coding image */}
          <LazyLoadImage
            src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="coding image"
            loading="lazy"
            className="overview-image h-fit w-48 xl:w-64 p-1 md:p-2"
          />
          {/* Design image (visible on larger screens) */}
          <LazyLoadImage
            src="https://images.pexels.com/photos/1054715/pexels-photo-1054715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="design image"
            loading="lazy"
            className="overview-image h-fit w-40 xl:w-48 p-1 md:p-2 md:hidden lg:block"
          />
        </div>
        {/* Background shape */}
        <img
          src="/shapes/blur-2.svg"
          alt=""
          className="blur-shape left-1/4 -top-8 w-2/4 opacity-50 z-0"
        />
      </div>
    </div>
  );
}

// Export the Overview component as the default export
export default Overview;
