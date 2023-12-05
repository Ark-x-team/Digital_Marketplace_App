import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ScrollShadow,
  Skeleton,
} from "@nextui-org/react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link } from "react-router-dom";
import categoriesData from "./categoriesData";

function QuickSearch() {
  const categories = (
    <ul className=" w-full py-1 md:grid md:grid-rows-3 md:grid-flow-col md:gap-6 ">
      {categoriesData.map((item, index) => (
        <Link
          key={index}
          className="w-full block h-24 my-4 md:my-0 rounded-md md:rounded-lg overflow-hidden relative hover:opacity-90 hover:scale-95 duration-300"
        >
          <Skeleton isLoaded={true} className="rounded-md md:rounded-lg">
            <LazyLoadImage
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover brightness-75 dark:brightness-50"
            />
          </Skeleton>
          <span className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 capitalize text-white text-xl text-center font-semibold">
            {item.title}
          </span>
        </Link>
      ))}
    </ul>
  );
  return (
    <ModalContent className="md:p-2">
      {() => (
        <>
          <ModalHeader className="flex flex-col gap-1 capitalize">
            quick search
          </ModalHeader>
          <ModalBody>
            <Input
              isClearable
              radius="lg"
              classNames="search-input bg-white"
              placeholder="Type for search"
              startContent={<SearchRoundedIcon className="" />}
            />
            <ScrollShadow
              size={100}
              hideScrollBar
              className="modal-height w-full"
            >
              {categories}
            </ScrollShadow>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
export default QuickSearch;
