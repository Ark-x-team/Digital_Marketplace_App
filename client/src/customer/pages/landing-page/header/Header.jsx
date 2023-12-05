import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Modal, Button, useDisclosure } from "@nextui-org/react";
import CircularText from "../styled/CircularText";
import ScrollText from "../styled/ScrollText";
import QuickSearch from "../quick-search/QuickSearch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { For } from "million/react";
import PropTypes from "prop-types";
import statisticData from "./StatisticData";

function Header() {
  const StatisticItem = (props) => (
    <li className="bg-white dark:bg-dark bg-opacity-30 dark:bg-opacity-20 backdrop-blur-xl flex flex-col items-center p-4 rounded-2xl">
      <span className="text-2xl font-semibold">{props.data}</span>
      <span className="text-sm">{props.description}</span>
    </li>
  );
  StatisticItem.propTypes = {
    data: PropTypes.string,
    description: PropTypes.string,
  };
  const statistic = (
    <ul className="w-full flex gap-4 md:gap-6 lg:gap-10 z-10">
      <For each={statisticData} memo>
        {(item, index) => (
          <StatisticItem
            key={index}
            data={item.data}
            description={item.description}
          />
        )}
      </For>
    </ul>
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchModal = (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      backdrop="blur"
      radius="3xl"
    >
      <QuickSearch />
    </Modal>
  );
  const coverImage =
    "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <div
      className="relative after:absolute after:w-full after:h-full after:bg-gradient-to-tr after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0 
      overflow-hidden"
    >
      <div className="h-full w-full relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
        <LazyLoadImage
          style={{ filter: "grayscale(30%)" }}
          src={coverImage}
          alt="cover image"
          loading="lazy"
          className="absolute h-full w-full object-cover lg:object-center"
        />
        <div className="header relative main-container px-3 pt-56 pb-28 md:pt-64 md:pb-56 lg:pl-8  flex w-full justify-start">
          <img
            src="/shapes/blur.svg"
            alt=""
            loading="lazy"
            className="blur-shape left-0 top-2/4 w-2/4"
          />
          <img
            src="/shapes/blur-2.svg"
            alt=""
            loading="lazy"
            className="blur-shape -right-60 top-1/4 w-2/4"
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
            <p className="text-lg md:text-xl lg:text-2xl text-dark dark:text-light max-w-2xl z-10">
              Your Needs, Brought Home
            </p>
            <Button
              onClick={onOpen}
              color="default"
              className="search-button"
              startContent={<SearchRoundedIcon />}
            >
              quick search
            </Button>
            {statistic}
            {searchModal}
            <CircularText>Markstone●Markstone●</CircularText>
          </div>
        </div>
        <ScrollText />
      </div>
    </div>
  );
}
export default Header;
