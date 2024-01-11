// Importing required icons and components from Material-UI and other libraries
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import AccountMenuData from "../../Customer/Pages/Account/Menu/MenuData";
import { googleLogout } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import CustomerAuthStore from "../../Store/Authentication/CustomerAuthStore";
import MainStore from "../../Store/MainStore";

// React functional component for the account dropdown
function AccountDropdown() {
  // Destructuring required functions and objects from hooks and stores
  const { logout, googleLoggedIn } = CustomerAuthStore();
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const navigate = useNavigate();

  // Function to handle regular logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      closeNav();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle Google logout
  const handleGoogleLogout = async () => {
    await googleLogout();
    await logout();
    navigate("/login");
    closeNav();
  };

  // Destructuring required function from main store for closing navigation
  const { closeNav } = MainStore();

  // Creating the dropdown menu items based on AccountMenuData
  const dropdownMenu = AccountMenuData.filter((item) => item.priority).map(
    (item, index) => (
      <DropdownItem
        to={item.url}
        as={Link}
        onClick={() => closeNav()}
        key={index}
        className="capitalize py-2 px-4 md:px-6"
        startContent={item.icon}
      >
        {t(item.title)}
      </DropdownItem>
    )
  );

  // Rendering the account dropdown component
  return (
    <Dropdown placement="bottom-end" className="dropdown">
      <DropdownTrigger>
        <Avatar radius="md" as="button" className="transition-transform" />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {/* My Account dropdown item */}
        <DropdownItem
          to="/account"
          as={Link}
          onClick={() => closeNav()}
          className="capitalize py-2 px-4 md:px-6 "
          startContent={<PersonRoundedIcon />}
        >
          {t("my account")}
        </DropdownItem>

        {/* Additional dropdown menu items based on AccountMenuData */}
        {dropdownMenu}

        {/* Logout dropdown item with conditional styling */}
        <DropdownItem
          onClick={googleLoggedIn ? handleGoogleLogout : handleLogout}
          color="danger"
          className="capitalize py-2 px-4 md:px-6 text-red-600"
          startContent={<PowerSettingsNewRoundedIcon />}
        >
          {t("log out")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

// Exporting the AccountDropdown component as the default export
export default AccountDropdown;
