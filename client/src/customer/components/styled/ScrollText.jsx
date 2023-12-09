import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function ScrollText() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const showDemo = () => {
      document.body.style.overflow = "auto";
      document.scrollingElement.scrollTo(0, 0);

      const wrapper = wrapperRef.current;

      const updateAnimation = () => {
        const scrollProgress =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;

        const x =
          (scrollProgress / 100) * (wrapper.scrollWidth - window.innerWidth);

        gsap.set(wrapper, { x });
      };

      const handleScroll = () => {
        requestAnimationFrame(updateAnimation);
      };

      window.addEventListener("scroll", handleScroll);

      updateAnimation(); // Initial update

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    showDemo();
  }, []);

  const textData = [
    "education",
    "programming & tech",
    "graphics & design",
    "video & animation",
    "music & audio",
    "photography",
  ];

  const text = textData.map((item, index) => (
    <span className="odd:text-primary even:text-secondary mx-6" key={index}>
      {item}
    </span>
  ));

  return (
    <div className="scroll-text">
      <section className="demo-text">
        <div
          ref={wrapperRef}
          style={{ lineHeight: "1.625" }}
          className="wrapper h-fit font-title text-5xl md:text-6xl lg:text-7xl  whitespace-nowrap"
        >
          {text}
        </div>
      </section>
    </div>
  );
}
export default ScrollText;
