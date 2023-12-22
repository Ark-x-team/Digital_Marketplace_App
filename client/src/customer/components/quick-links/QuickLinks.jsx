import { Tooltip, Button } from "@nextui-org/react";
import { For } from "million/react";
import PropTypes from "prop-types";
import quickLinksData from "./QuickLinksData";
import { useTranslation } from "react-i18next";

function QuickLinks() {
  const { t } = useTranslation();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

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

  QuickLink.propTypes = {
    title: PropTypes.string,
    sectionId: PropTypes.string,
    icon: PropTypes.object,
  };

  return (
    <ul className="z-20 hidden lg:flex flex-col justify-end px-6 xl:px-10 py-8 xl:py-12 gap-4 fixed top-1/3 right-4 bg-main-navy hover:-translate-y-2 duration-300">
      <For each={quickLinksData}>
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

export default QuickLinks;
