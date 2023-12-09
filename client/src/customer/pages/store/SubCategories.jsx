import { Tabs, Tab } from "@nextui-org/react";
import categoriesStore from "../../../store/categoriesStore";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SubCategory() {
  const { getSubCategories, subCategories } = categoriesStore();
  const { category } = useParams();

  useEffect(() => {
    try {
      getSubCategories(category);
    } catch (error) {
      console.error(error);
    }
  }, [category]);

  return (
    <div className="flex flex-wrap gap-4">
      <Tabs size="lg" variant="underlined" aria-label="Tabs variants">
        {subCategories.map((item) => (
          <Tab
            as={Link}
            to={`/store/${category}/${item.subcategory_name.replace(
              / /g,
              "-"
            )}`}
            key={item._id}
            title={item.subcategory_name}
          />
        ))}
      </Tabs>
    </div>
  );
}
export default SubCategory;
