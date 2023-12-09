import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import categoriesStore from "../../../store/categoriesStore";
import { ScrollShadow } from "@nextui-org/react";

function Categories() {
  const { getCategories, categoriesError, categoriesList } = categoriesStore();
  let { category } = useParams();
  useEffect(() => {
    try {
      getCategories("wallpapers");
    } catch (error) {
      console.error(error);
    }
  }, []);

  const Category = (props) => (
    <Link
      to={`/store/${props.link}`}
      className={`h-fit ${
        props.isActive && category ? " border-primary" : "border-transparent"
      } min-w-[150px] md:my-0 rounded-md md:rounded-lg overflow-hidden relative hover:opacity-80 duration-200 border-2`}
    >
      <img
        src={props.image}
        alt={props.title}
        className="h-16 md:h-20 lg:h-24 w-full object-cover brightness-75 dark:brightness-50 rounded-md md:rounded-lg"
      />
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
      className="w-full grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll scrollbar-hide"
    >
      {categoriesError
        ? ""
        : categoriesList.map((item) => (
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
