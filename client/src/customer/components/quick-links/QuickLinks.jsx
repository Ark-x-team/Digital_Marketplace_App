// Importing necessary components and libraries
import { Tooltip, Button } from "@nextui-org/react";
import { For } from "million/react";
import PropTypes from "prop-types";
import QuickLinksData from "./QuickLinksData"; // Assuming there's a file with quick links data
import { useTranslation } from "react-i18next";

// React functional component for displaying quick links with tooltips
function QuickLinks() {
  // Initializing the useTranslation hook
  const { t } = useTranslation();

  // Function to scroll to a specific section on button click
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Individual QuickLink component with a tooltip
  const QuickLink = (props) => (
    <>
      <Tooltip
        showArrow
        placement="right"
        content={t(props.title)}
        classNames={{
          base: ["before:bg-gray-200 dark:before:bg-dark "],
          content: [
            "py-2 px-4 shadow-xl capitalize",
            "text-black dark:text-white bg-gradient-to-r from-gray-50 dark:from-neutral-900 to-gray-200 dark:to-black",
          ],
        }}
      >
        <Button
          isIconOnly
          className="quick-links"
          onClick={() => scrollToSection(props.sectionId)}
        >
          {props.icon}
        </Button>
      </Tooltip>
    </>
  );

  // PropTypes for type checking of QuickLink component props
  QuickLink.propTypes = {
    title: PropTypes.string,
    sectionId: PropTypes.string,
    icon: PropTypes.object,
  };

  // Rendering the QuickLinks component with a list of quick links
  return (
    <ul className="z-20 hidden lg:flex flex-col justify-end px-6 xl:px-10 py-8 xl:py-12 gap-4 fixed top-1/3 right-4 bg-main-navy hover:-translate-y-2 duration-300">
      {/* Mapping through QuickLinksData to generate QuickLink components */}
      <For each={QuickLinksData}>
        {(item, index) => (
          <QuickLink
            key={index}
            title={item.title}
            icon={item.icon}
            sectionId={item.title}
          />
        )}
      </For>
    </ul>
  );
}

// Exporting the QuickLinks component as the default export
export default QuickLinks;
