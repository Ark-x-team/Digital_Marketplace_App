import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from "../../components/Footer";
import howItWorksData from "./HowItWorksData";

function HowItWorks() {
  const steps = (
    <ul className="flex flex-col gap-20 lg:gap-24">
      {howItWorksData.map((item, index) => (
        <li
          key={index}
          className="flex flex-col lg:flex-row lg:justify-evenly items-center even:lg:flex-row-reverse gap-8 md:gap-14 lg:gap-28"
        >
          <div className="h-fit relative -rotate-3 after:absolute after:w-full after:h-full after:bg-gradient-to-tr after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              className="w-80 md:w-96 lg:w-80 h-60 md:h-72 lg:h-60 rounded-3xl object-cover"
            />
            <span className="absolute bottom-0 -left-3 font-title text-6xl md:text-7xl text-primary z-10">
              {index + 1}
            </span>
          </div>

          <span className="flex flex-col gap-4 lg:max-w-xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl capitalize">
              {item.title}
            </h1>
            <p className="dark:text-light">{item.description}</p>
            {item.link && item.link}
          </span>
        </li>
      ))}
    </ul>
  );
  const coverImage =
    "https://images.pexels.com/photos/3182780/pexels-photo-3182780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <>
      <div
        className="lg relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0 
      "
      >
        <div className="h-64 md:h-80 lg:h-96 w-full relative after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
          <LazyLoadImage
            src={coverImage}
            alt="cover image"
            loading="lazy"
            className="absolute h-full w-full object-cover object-bottom lg:object-center"
          />
        </div>
        <h1 className="w-full absolute top-3/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-10 font-title capitalize text-center text-3xl md:text-4xl lg:text-5xl text-primary ">
          How it works ?
        </h1>
      </div>
      <div className="main-container px-4 lg:px-4 my-12 md:my-16 lg:my-20">
        {steps}
      </div>
      <Footer />
    </>
  );
}
export default HowItWorks;
