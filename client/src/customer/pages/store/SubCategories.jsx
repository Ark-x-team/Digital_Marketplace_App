import { Tabs, Tab, ScrollShadow } from "@nextui-org/react";
import categoriesStore from "../../../store/CategoriesStore";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import productStore from "../../../store/products/ProductStore";
import Searchbar from "./Searchbar";
import Filter from "./Filter";

// Functional component for displaying subcategories
function SubCategory() {
  // Destructuring values from categoriesStore and productStore
  const { getSubCategories, subCategories } = categoriesStore();
  const { setPage } = productStore();

  // Destructuring category from the URL params
  const { category } = useParams();

  // Effect hook to fetch subcategories and set the page when the component mounts
  useEffect(() => {
    try {
      getSubCategories(category);
      setPage(1);
    } catch (error) {
      console.error(error);
    }
  }, [category]);

  return (
    // ScrollShadow component for horizontal scrolling
    <ScrollShadow
      orientation="horizontal"
      className="w-full flex flex-wrap gap-4 overflow-x-scroll scrollbar-hide"
    >
      {category && category !== "all" ? (
        // Tabs component for displaying subcategory tabs
        <Tabs size="lg" variant="underlined" aria-label="Tabs variants">
          {/* Tab for displaying all products in the category */}
          <Tab
            as={Link}
            to={`/store/${category}/all`}
            title="all"
            className="capitalize"
          />
          {/* Mapping through subcategories and creating tabs for each */}
          {subCategories.map((item) => (
            <Tab
              as={Link}
              to={`/store/${category}/${item.subcategory_name.replace(
                / /g,
                "-"
              )}`}
              key={item._id}
              title={item.subcategory_name}
              className="capitalize"
            />
          ))}
        </Tabs>
      ) : (
        // Displaying Filter and Searchbar when category is not selected or is "all"
        <ul className="flex gap-4 self-end">
          <Filter />
          <Searchbar />
        </ul>
      )}
    </ScrollShadow>
  );
}

export default SubCategory;
