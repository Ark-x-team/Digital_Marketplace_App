import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import categoriesStore from "../../../store/categoriesStore";
import { ScrollShadow } from "@nextui-org/react";
import productStore from "../../../store/products/ProductStore";

function Categories() {
  const { getCategories, categoriesError, categoriesList } = categoriesStore();
  const { getProductsByCategory, setPage } = productStore();
  let { category } = useParams();
  useEffect(() => {
    try {
      getCategories(category);
      getProductsByCategory(category);
      setPage(1);
    } catch (error) {
      console.error(error);
    }
  }, [category]);

  const Category = (props) => (
    <Link
      to={`/store/${props.link}`}
      className={`h-fit ${
        props.isActive && category
          ? " border-primary"
          : "border-white dark:border-dark"
      } min-w-[150px] max-w-[180px] md:my-0 rounded-xl overflow-hidden relative hover:opacity-80 duration-200 transition-opacity border-2 h-full lg:h-24 ${
        !props.image && "bg-primary max-w-fit"
      }`}
    >
      {props.image && (
        <img
          src={props.image}
          className=" w-full object-cover brightness-75 dark:brightness-50"
        />
      )}
      <span className=" absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 capitalize px-2 lg:px-4 text-white text-sm lg:text-lg text-center font-semibold z-10">
        {props.title}
      </span>
    </Link>
  );

  Category.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string,
    isActive: PropTypes.bool,
  };

  return (
    <ScrollShadow
      orientation="horizontal"
      className="w-full grid grid-rows-1 grid-flow-col gap-4 justify-between overflow-x-scroll scrollbar-hide"
    >
      <Category
        link="all"
        title="all"
        isActive={!category || category == "all"}
      />
      {!categoriesError &&
        categoriesList.map((item) => (
          <Category
            key={item._id}
            link={item.category_name.replace(/ /g, "-")}
            title={item.category_name}
            image={item.cover_image}
            isActive={
              !category || category == item.category_name.replace(/ /g, "-")
            }
          />
        ))}
    </ScrollShadow>
  );
}
export default Categories;
