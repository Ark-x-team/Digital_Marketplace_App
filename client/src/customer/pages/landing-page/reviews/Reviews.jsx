import { Badge, Avatar } from "@nextui-org/react";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { For } from "million/react";
import reviewsData from "./ReviewsData";
import PropTypes from "prop-types";

function Reviews() {
  const Review = (props) => (
    <li
      data-aos="zoom-out"
      data-aos-delay={props.delay * 100}
      className="flex flex-col gap-2 max-w-lg bg-white dark:bg-dark bg-opacity-60 dark:bg-opacity-70 backdrop-blur-xl p-4 lg:p-6 rounded-3xl"
    >
      <div className="w-full flex justify-between">
        <span className="flex gap-3">
          <Badge
            isOneChar
            content={<GradeRoundedIcon className="text-yellow-500" />}
            placement="bottom-right"
            className="review-avatar"
          >
            <Avatar radius="lg" src={props.image} />
          </Badge>
          <div className="flex flex-col">
            <span>{props.username}</span>
            <span className="text-xs text-slate-600 dark:text-light">
              {props.country}
            </span>
          </div>
        </span>
      </div>
      <p className="text-dark dark:text-light">{props.description}</p>
    </li>
  );
  Review.propTypes = {
    delay: PropTypes.number,
    image: PropTypes.string,
    username: PropTypes.string,
    sectionId: PropTypes.string,
    country: PropTypes.string,
    description: PropTypes.string,
  };
  const reviewsItems = (
    <For each={reviewsData} memo>
      {(item, index) => (
        <Review
          image={item.image}
          username={item.username}
          country={item.country}
          description={item.description}
          delay={index}
        />
      )}
    </For>
  );
  const image =
    "https://images.pexels.com/photos/3777564/pexels-photo-3777564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <div
      id="reviews"
      className="w-full main-container px-4 md:px-0 mt-28 md:mt-4 lg:mt-0 py-10 md:py-14 lg:pb-20 flex justify-center items-center gap-52 relative overflow-hidden"
    >
      <div className="h-fit hidden lg:block relative -rotate-3 after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
        <LazyLoadImage
          src={image}
          alt="reviews cover image"
          loading="lazy"
          className="w-96 h-fit rounded-3xl"
        />
      </div>
      <img
        src="/shapes/blur-2.svg"
        alt=""
        loading="lazy"
        className="blur-shape -right-16 top-0 w-full lg:w-3/4 z-0"
      />
      <ul className="flex flex-col gap-2 md:gap-3 lg:gap-4 xl:gap-5 z-10">
        {reviewsItems}
      </ul>
    </div>
  );
}
export default Reviews;
