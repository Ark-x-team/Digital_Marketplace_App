import { useEffect, useRef, useState, memo, Children } from "react";
import PropTypes from "prop-types";

function CircularText({ children }) {
  const emblemRef = useRef(null);
  const [textElements, setTextElements] = useState([]);

  useEffect(() => {
    const emblemElement = emblemRef.current;

    const initializeEmblem = () => {
      if (!emblemElement) {
        return;
      }

      const text = Children.toArray(children).join("");
      emblemElement.innerHTML = "";

      const elements = [];
      for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const r = (360 / text.length) * (i + 1);
        const x = Math.cos((Math.PI / text.length) * i);
        const y = Math.sin((Math.PI / text.length) * i);

        elements.push(
          <span
            key={i}
            style={{
              WebkitTransform: `rotateZ(${r}deg) translate3d(${x}px, ${y}px, 0)`,
              transform: `rotateZ(${r}deg) translate3d(${x}px, ${y}px, 0)`,
            }}
          >
            {letter}
          </span>
        );
      }

      setTextElements(elements);
    };

    // Wait for the DOM to be fully loaded
    if (document.readyState === "complete") {
      initializeEmblem();
    } else {
      window.onload = initializeEmblem;
    }
  }, [children]);

  return (
    <div className="animation text-primary z-10" ref={emblemRef}>
      {textElements}
    </div>
  );
}
CircularText.propTypes = {
  children: PropTypes.node,
};

const MemoizedCircularText = memo(CircularText);
export default MemoizedCircularText;
