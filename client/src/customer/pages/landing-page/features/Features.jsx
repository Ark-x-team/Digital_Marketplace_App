import { LazyLoadImage } from "react-lazy-load-image-component";
import { For } from "million/react";
import PropTypes from "prop-types";
import featuresData from "./FeaturesData";

function Features() {
  const Feature = (props) => (
    <li
      data-aos="fade-up"
      data-aos-delay={props.delay * 300}
      className="flex md:flex-col md:items-center gap-5 lg:max-w-xs"
    >
      <LazyLoadImage
        src={`/icons/${props.icon}`}
        alt="icon"
        loading="lazy"
        className="h-16 lg:h-20 bg-neutral-100 dark:bg-neutral-800 p-3 lg:p-4 rounded-2xl"
      />

      <span className="flex flex-col md:text-center gap-2 lg:gap-3">
        <h1 className="text-xl md:text-2xl capitalize font-semibold">
          {props.title}
        </h1>
        <p className="text-dark dark:text-light">{props.description}</p>
      </span>
    </li>
  );
  Feature.propTypes = {
    delay: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
  };
  const features = (
    <For each={featuresData} memo>
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

  return (
    <div
      id="features"
      className="main-container px-4 md:px-0 py-10 md:py-14 lg:py-20 flex flex-col gap-8 lg:gap-16 xl:gap-24 items-center z-10 relative overflow-hidden"
    >
      <h1 className="font-title capitalize text-3xl md:text-4xl lg:text-5xl text-primary ">
        Your Gateway to Digital Excellence
      </h1>
      <ul className="w-full flex flex-col md:flex-row gap-6 justify-evenly z-20">
        {features}
      </ul>
      <img
        src="/shapes/blur.svg"
        alt=""
        loading="lazy"
        className="blur-shape left-1/4 top-0 w-2/5 rotate-45 opacity-50"
      />
    </div>
  );
}
export default Features;
