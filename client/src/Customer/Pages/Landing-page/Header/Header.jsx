// Import necessary dependencies and components
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Modal, Button, useDisclosure } from "@nextui-org/react";
import QuickSearch from "./QuickSearch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { For } from "million/react";
import PropTypes from "prop-types";
import statisticData from "./StatisticData";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

// Define the Header component
function Header() {
  const { t } = useTranslation();

  // StatisticItem component representing an individual statistic
  const StatisticItem = (props) => (
    <li className="bg-white dark:bg-dark bg-opacity-30 dark:bg-opacity-20 backdrop-blur-xl flex flex-col items-center p-4 rounded-2xl">
      <span className="text-2xl font-semibold">{props.data}</span>
      <span className="text-sm">{props.description}</span>
    </li>
  );

  // PropTypes for the StatisticItem component
  StatisticItem.propTypes = {
    data: PropTypes.string,
    description: PropTypes.string,
  };

  // Generate StatisticItem components from the statisticData array
  const statistic = (
    <ul className="w-full flex gap-4 md:gap-6 lg:gap-10 z-10">
      <For each={statisticData}>
        {(item, index) => (
          <StatisticItem
            key={index}
            data={item.data}
            description={t(item.description)}
          />
        )}
      </For>
    </ul>
  );

  // Custom hook for handling modal state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Create a memoized searchModal component
  const searchModal = useMemo(
    () => (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        backdrop="blur"
        radius="3xl"
      >
        <QuickSearch />
      </Modal>
    ),
    [isOpen, onOpenChange]
  );

  // Cover images for the header background
  const coverImages = [
    "https://images.pexels.com/photos/3760280/pexels-photo-3760280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/6214920/pexels-photo-6214920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  // State to track the current image index for the slideshow effect
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to transition to the next image in the slideshow
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % coverImages.length);
  };

  // useEffect to start the slideshow on component mount
  useEffect(() => {
    const intervalId = setInterval(nextImage, 4000);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Render the Header component
  return (
    <div
      className="relative after:absolute after:w-full after:h-full after:bg-gradient-to-tr after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0 
      overflow-hidden"
    >
      <div className="h-full lg:h-[120vh] w-full relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
        {coverImages.map((image, index) => (
          <LazyLoadImage
            key={index}
            style={{
              filter: "grayscale(30%)",
              opacity: index === currentImageIndex ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
            src={image}
            alt="cover image"
            loading="lazy"
            className="absolute h-full w-full object-cover lg:object-center"
          />
        ))}
        <div className="relative main-container px-4 pt-56  pb-14 md:pb-32 lg:pb-40 lg:pl-8 flex w-full justify-start">
          <img
            src="/shapes/blur.svg"
            alt=""
            loading="lazy"
            className="blur-shape left-0 top-1/4 w-2/4"
          />
          <img
            src="/shapes/blur-2.svg"
            alt=""
            loading="lazy"
            className="blur-shape left-60 top-1/4 w-2/4"
          />
          <img
            src="/shapes/blur-2.svg"
            alt=""
            loading="lazy"
            className="blur-shape top-1/4 -left-28 w-2/4"
          />
          <div className="flex flex-col gap-6 capitalize w-fit md:ml-12 lg:ml-0">
            <h1
              className="font-title capitalize text-5xl md:text-6xl lg:text-7xl xl:text-8xl
           text-primary dark:text-white z-10"
            >
              markstone
            </h1>
            <p className="capitalize text-lg md:text-xl lg:text-2xl text-dark dark:text-light max-w-2xl z-10">
              {t("your needs, brought home")}
            </p>
            <Button
              onClick={onOpen}
              color="default"
              className="search-button"
              startContent={<SearchRoundedIcon />}
            >
              {t("quick search")}
            </Button>
            {statistic}
            {searchModal}
            {/* <CircularText>Markstone●Markstone●</CircularText> */}
          </div>
        </div>
        {/* <ScrollText /> */}
      </div>
    </div>
  );
}
export default Header;
