import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const Filter = () => {
  return (
    <Dropdown placement="bottom-end" className="dropdown">
      <DropdownTrigger>
        <Button variant="flat" isIconOnly color="primary" aria-label="filter">
          <FilterListRoundedIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem className="capitalize py-2 px-4 md:px-6 ">
          my account
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Filter;
