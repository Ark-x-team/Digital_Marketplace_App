import { Input } from "@nextui-org/react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
const Searchbar = () => {
  return (
    <Input
      name="searchbar"
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
