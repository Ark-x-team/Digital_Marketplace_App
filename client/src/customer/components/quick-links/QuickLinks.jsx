import quickLinksData from "./QuickLinksData";
import { Tooltip, Button } from "@nextui-org/react";

const QuickLinks = () => {
  return (
    <ul className="z-20 hidden lg:flex flex-col justify-end px-6 xl:px-10 py-8 xl:py-12 gap-4 fixed top-1/3 right-4 bg-main-navy hover:-translate-y-2 duration-300">
      {quickLinksData.map((item, index) => (
        <li key={index}>
          <Tooltip
            showArrow
            placement="right"
            content={item.title}
            classNames={{
              base: ["before:bg-gray-200 dark:before:bg-dark "],
              content: [
                "py-2 px-4 shadow-xl capitalize",
                "text-black dark:text-white bg-gradient-to-r from-gray-50 dark:from-neutral-900 to-gray-200 dark:to-black",
              ],
            }}
          >
            <Button isIconOnly className="quick-links">
              {item.icon}
            </Button>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default QuickLinks;
