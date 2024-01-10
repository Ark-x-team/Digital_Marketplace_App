import { Input } from "@nextui-org/react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import productStore from "../../../store/products/ProductStore";
import { useTranslation } from "react-i18next";

// Functional component for the search bar
const Searchbar = () => {
  // Destructuring values from the productStore
  const { searchValue, updateSearchValue } = productStore();

  // Destructuring the translation function from react-i18next
  const { t } = useTranslation();

  return (
    // Input component for the search bar
    <Input
      name="searchbar"
      value={searchValue}
      onChange={updateSearchValue}
      type="text"
      placeholder={t("search")} // Using translation function for the placeholder text
      size="xs"
      startContent={
        // Icon for the search bar
        <SearchRoundedIcon className="text-2xl text-default-400 pointer-events-none" />
      }
    />
  );
};

export default Searchbar;
