import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import accountMenuData from "../../customer/pages/account/menu/MenuData";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import customerAuthStore from "../../store/authentication/customerAuthStore";
import { googleLogout } from "@react-oauth/google";
import { useTranslation } from "react-i18next";

function AccountDropdown() {
  const { logout, googleLoggedIn } = customerAuthStore();
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogout = async () => {
    await googleLogout();
    await logout();
    navigate("/login");
  };

  const dropdownMenu = accountMenuData
    .filter((item) => item.priority)
    .map((item, index) => (
      <DropdownItem
        to={item.url}
        as={Link}
        key={index}
        className="capitalize py-2 px-4 md:px-6"
        startContent={item.icon}
      >
        {t(item.title)}
      </DropdownItem>
    ));
  return (
    <Dropdown placement="bottom-end" className="dropdown">
      <DropdownTrigger>
        <Avatar radius="md" as="button" className="transition-transform" />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          to="/account"
          as={Link}
          className="capitalize py-2 px-4 md:px-6 "
          startContent={<PersonRoundedIcon />}
        >
          {t("my account")}
        </DropdownItem>
        {dropdownMenu}
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
export default AccountDropdown;
