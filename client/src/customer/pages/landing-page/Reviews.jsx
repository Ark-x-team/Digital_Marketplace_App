import { Badge, Avatar } from "@nextui-org/react";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
export default function Reviews() {
  const reviewsData = [
    {
      username: "Seifeddine",
      country: "canada",
      image: "https://avatars.githubusercontent.com/u/30373425?v=4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias facere sed vero ullam excepturi nihil quasi quod optio.",
    },
    {
      username: "Faiza",
      country: "egypte",
      image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias facere sed vero ullam excepturi nihil quasi quod optio, numquam et.",
    },
    {
      username: "Yasser",
      country: "libya",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit quod optio, numquam et.",
    },
  ];
  const reviews = reviewsData.map((item, index) => (
    <li
      key={index}
      data-aos="zoom-out"
      data-aos-delay={index * 100}
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
            <Avatar radius="lg" src={item.image} />
          </Badge>
          <div className="flex flex-col">
            <span>{item.username}</span>
            <span className="text-xs text-slate-600 dark:text-light">
              {item.country}
            </span>
          </div>
        </span>
      </div>
      <p className="text-dark dark:text-light">{item.description}</p>
    </li>
  ));
  const image =
    "https://images.pexels.com/photos/3777564/pexels-photo-3777564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <div className="w-full main-container px-4 md:px-0 mt-28 md:mt-4 lg:mt-0 py-10 md:py-14 lg:pb-20 flex justify-center items-center gap-52 relative">
      <div className="h-fit hidden lg:block relative -rotate-3 after:absolute after:w-full after:h-full after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent after:left-0 after:top-0">
        <img
          src={image}
          alt="reviews cover image"
          className="w-96 h-fit rounded-3xl"
        />
      </div>
      <img
        src="/shapes/blur-2.svg"
        alt=""
        className="blur-shape -right-16 top-0 w-full lg:w-3/4 z-0"
      />
      <ul className="flex flex-col gap-2 md:gap-3 lg:gap-4 xl:gap-5 z-10">
        {reviews}
      </ul>
    </div>
  );
}
