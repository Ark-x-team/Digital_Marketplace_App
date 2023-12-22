import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import productStore from "../../../store/products/ProductStore";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const { t } = useTranslation();

  const { getProductsByFilter } = productStore();
  return (
    <Dropdown placement="bottom-start" className="dropdown">
      <DropdownTrigger>
        <Button variant="flat" isIconOnly color="primary" aria-label="filter">
          <FilterListRoundedIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          className="capitalize py-2 px-4 md:px-6 "
          onClick={() => getProductsByFilter("low")}
        >
          {t("price") + " : " + t("low to high")}
        </DropdownItem>
        <DropdownItem
          className="capitalize py-2 px-4 md:px-6 "
          onClick={() => getProductsByFilter("high")}
        >
          {t("price") + " : " + t("high to low")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Filter;
