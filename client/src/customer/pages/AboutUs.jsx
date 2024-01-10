import Footer from "../components/Footer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";

// Functional component for the About Us page
function AboutUs() {
  // Destructuring the translation function from react-i18next
  const { t } = useTranslation();

  // URLs for cover and team images
  const coverImage =
    "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const teamImage =
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <>
      {/* Cover section with gradient overlay */}
      <div className="relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
        {/* Cover image */}
        <div className="h-64 md:h-80 lg:h-96 w-full relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
          <img
            src={coverImage}
            alt="cover image"
            loading="lazy"
            className="absolute h-full w-full object-cover lg:object-center"
          />
        </div>
        {/* Heading for the cover section */}
        <h1 className="w-full absolute top-3/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-10 font-title capitalize text-center text-3xl md:text-4xl lg:text-5xl text-primary ">
          {t("about us")}
        </h1>
      </div>

      {/* Main content section */}
      <div className="main-container px-4 lg:px-4 my-12 md:my-16 lg:my-20">
        {/* Flex container for the main content */}
        <div className="flex flex-col lg:flex-row lg:justify-evenly items-center gap-8 md:gap-14 lg:gap-28">
          {/* Left column with text content */}
          <span className="flex flex-col gap-4 lg:max-w-xl">
            {/* Heading for the text content */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl capitalize">
              {t("crafting dreams, inspiring realities")}
            </h1>
            {/* Paragraph for the text content */}
            <p className="dark:text-light">
              {t(
                "in our digital haven, creativity knows no bounds. Our diverse team passionately transforms this vision into reality, curating a marketplace that delivers exceptional digital products. Committed to fostering innovation, our collective expertise cultivates a community of creators, redefining possibilities in our ever-evolving digital universe"
              )}
            </p>
          </span>

          {/* Right column with the team image */}
          <div className="h-fit relative -rotate-3 after:absolute after:w-full after:h-full after:bg-gradient-to-tr after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
            {/* Lazy-loaded team image */}
            <LazyLoadImage
              src={teamImage}
              alt="team image"
              loading="lazy"
              className="w-80 md:w-96 lg:w-80 h-60 md:h-72 lg:h-60 rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
}

export default AboutUs;
