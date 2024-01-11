// Importing necessary libraries and components
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import productStore from "../../../Store/Products/ProductStore";
import { useTranslation } from "react-i18next";

// Functional component for the filter dropdown
const Filter = () => {
  // Using the translation hook
  const { t } = useTranslation();

  // Destructuring the getProductsByFilter function from the productStore
  const { getProductsByFilter } = productStore();

  return (
    // Dropdown component for the filter options
    <Dropdown placement="bottom-start" className="dropdown">
      <DropdownTrigger>
        {/* Button to trigger the dropdown, with the filter icon */}
        <Button variant="flat" isIconOnly color="primary" aria-label="filter">
          <FilterListRoundedIcon />
        </Button>
      </DropdownTrigger>
      {/* DropdownMenu containing filter options */}
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {/* DropdownItem for sorting by low to high price */}
        <DropdownItem
          className="capitalize py-2 px-4 md:px-6"
          onClick={() => getProductsByFilter("low")}
        >
          {t("price") + " : " + t("low to high")}
        </DropdownItem>
        {/* DropdownItem for sorting by high to low price */}
        <DropdownItem
          className="capitalize py-2 px-4 md:px-6"
          onClick={() => getProductsByFilter("high")}
        >
          {t("price") + " : " + t("high to low")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

// Exporting the Filter component
export default Filter;
