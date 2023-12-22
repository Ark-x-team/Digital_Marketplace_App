import { Input } from "@nextui-org/react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import productStore from "../../../store/products/ProductStore";
import { useTranslation } from "react-i18next";

const Searchbar = () => {
  const { searchValue, updateSearchValue } = productStore();
  const { t } = useTranslation();

  return (
    <Input
      name="searchbar"
      value={searchValue}
      onChange={updateSearchValue}
      type="text"
      placeholder={t("search")}
      size="xs"
      startContent={
        <SearchRoundedIcon className="text-2xl text-default-400 pointer-events-none" />
      }
    />
  );
};

export default Searchbar;
