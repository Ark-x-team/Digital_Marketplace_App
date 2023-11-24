export default function Features() {
  const featuresData = [
    {
      title: "multi products",
      icon: "multi-products.svg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, architecto.",
    },
    {
      title: "technical assistance",
      icon: "technical-assistance.svg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, architecto.",
    },
    {
      title: "security",
      icon: "security.svg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, architecto.",
    },
  ];
  const features = featuresData.map((item, index) => (
    <li
      key={index}
      data-aos="fade-up"
      data-aos-delay={index * 300}
      className="flex md:flex-col md:items-center gap-3 lg:max-w-xs"
    >
      <img
        src={`/icons/${item.icon}`}
        alt="icon"
        className="h-16 lg:h-20 bg-neutral-100 dark:bg-neutral-800 p-3 lg:p-4 rounded-2xl"
      />

      <span className="flex flex-col md:text-center gap-1 md:gap-2 ">
        <h1 className="text-xl md:text-2xl capitalize">{item.title}</h1>
        <p className="text-dark dark:text-light">{item.description}</p>
      </span>
    </li>
  ));
  return (
    <div
      id="reviews"
      className="main-container px-4 md:px-0 py-10 md:py-14 lg:py-20 flex flex-col gap-8 lg:gap-14 items-center z-10 relative"
    >
      <h1 className="font-title capitalize text-3xl md:text-4xl lg:text-5xl text-primary ">
        Lorem irsum dolor sit amet.
      </h1>
      <ul className="w-full flex flex-col md:flex-row gap-4 justify-evenly z-20">
        {features}
      </ul>
      <img
        src="/shapes/blur.svg"
        alt=""
        className="blur-shape left-0 top-28 w-2/4 rotate-45 opacity-50"
      />
    </div>
  );
}
