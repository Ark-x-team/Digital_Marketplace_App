// Import necessary dependencies and components
import {
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import categoriesStore from "../../../../store/categoriesStore";
import { useTranslation } from "react-i18next";

// Define the QuickSearch component
function QuickSearch() {
  // Retrieve categories data and methods from categoriesStore
  const { getCategories, categoriesError, categoriesList } = categoriesStore();

  // useEffect to fetch categories data on component mount
  useEffect(() => {
    try {
      getCategories();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Initialize translation hook
  const { t } = useTranslation();

  // Render error message if there is an error fetching categories
  const errorMessage = (
    <Textarea readOnly minRows={1} placeholder={categoriesError} />
  );

  // Category component representing an individual category
  const Category = (props) => (
    <Link
      to={`store/${props.link}`}
      className="w-full block h-24 my-4 md:my-0 rounded-md md:rounded-lg overflow-hidden relative hover:opacity-90 hover:scale-95 duration-300"
    >
      <img
        src={props.image}
        alt={props.title}
        className=" w-full object-cover object-center brightness-75 dark:brightness-50 rounded-md md:rounded-lg"
      />
      <span className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 capitalize text-white text-xl text-center font-semibold z-10">
        {props.title}
      </span>
    </Link>
  );

  // PropTypes for the Category component
  Category.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  // Render categories based on categories data
  const categories = (
    <ul className=" w-full py-1 grid grid-cols-1 md:grid-cols-2 md:gap-6 ">
      {categoriesError
        ? errorMessage
        : categoriesList.map((item) => (
            <Category
              key={item._id}
              link={item.category_name.replace(/ /g, "-")}
              title={item.category_name}
              image={item.cover_image}
            />
          ))}
    </ul>
  );

  // Render the QuickSearch component
  return (
    <ModalContent className="md:p-2">
      {() => (
        <>
          {/* Modal header */}
          <ModalHeader className="flex flex-col gap-1 capitalize">
            {t("quick search")}
          </ModalHeader>
          {/* Modal body */}
          <ModalBody>
            {/* Search input */}
            <Input
              isClearable
              radius="lg"
              classNames="search-input bg-white"
              placeholder={t("type for search")}
              startContent={<SearchRoundedIcon className="" />}
            />
            {/* Scrollable category list */}
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

// Export the QuickSearch component as the default export
export default QuickSearch;
