import { Input } from "@nextui-org/react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import productStore from "../../../store/products/ProductStore";
const Searchbar = () => {
  const { searchValue, updateSearchValue } = productStore();
  return (
    <Input
      name="searchbar"
      value={searchValue}
      onChange={updateSearchValue}
      type="text"
      placeholder="Search"
      size="xs"
      startContent={
        <SearchRoundedIcon className="text-2xl text-default-400 pointer-events-none" />
      }
    />
  );
};

export default Searchbar;
