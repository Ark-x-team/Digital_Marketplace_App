import { Tabs, Tab, ScrollShadow } from "@nextui-org/react";
import categoriesStore from "../../../store/categoriesStore";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import productStore from "../../../store/products/ProductStore";
import Searchbar from "./Searchbar";
import Filter from "./Filter";

function SubCategory() {
  const { getSubCategories, subCategories } = categoriesStore();
  const { setPage } = productStore();
  const { category } = useParams();

  useEffect(() => {
    try {
      getSubCategories(category);
      setPage(1);
    } catch (error) {
      console.error(error);
    }
  }, [category]);

  return (
    <ScrollShadow
      orientation="horizontal"
      className="w-full flex flex-wrap gap-4 overflow-x-scroll scrollbar-hide"
    >
      {category && category !== "all" ? (
        <Tabs size="lg" variant="underlined" aria-label="Tabs variants">
          <Tab
            as={Link}
            to={`/store/${category}/all`}
            title="all"
            className="capitalize"
          />
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
        <ul className="flex gap-4 self-end">
          <Filter />
          <Searchbar />
        </ul>
      )}
    </ScrollShadow>
  );
}
export default SubCategory;
