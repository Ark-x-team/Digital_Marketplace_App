// Importing required components and icons from libraries
import { Button, Avatar } from "@nextui-org/react";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import {
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import mainStore from "../../store/MainStore";
import Cookies from "js-cookie";
import { useEffect } from "react";

// React functional component for language switching
function SwitchLang() {
  // Destructuring required functions and objects from main store
  const { selectedLang, languages, handleLangSwitch } = mainStore();

  // Getting the current language from cookies
  const currentLang = Cookies.get("lang").substring(0, 2);

  // useEffect to change the language on component mount
  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, []);

  // Destructuring i18n from useTranslation hook
  const { i18n } = useTranslation();

  // Creating dropdown menu items based on available languages
  const dropdownMenu = languages.map((item, index) => (
    <DropdownItem
      key={index}
      onClick={() => {
        // Handling language switch on item click
        handleLangSwitch(item);
        i18n.changeLanguage(item.lang.substring(0, 2));
      }}
      startContent={
        <Avatar alt={`${item.lang} flag`} className="w-6 h-6" src={item.flag} />
      }
      className="capitalize px-4 py-2 md:px-6"
    >
      {item.lang}
    </DropdownItem>
  ));

  // Rendering the language switch component
  return (
    <Dropdown placement="bottom-end" className="dropdown">
      {/* Badge for the currently selected language */}
      <Badge
        isOneChar
        content={
          <Avatar
            alt={`${selectedLang.lang} flag`}
            className="h-4 w-4 object-cover"
            src={selectedLang.flag}
          />
        }
        placement="bottom-right"
      >
        {/* Dropdown trigger button with language icon */}
        <DropdownTrigger>
          <Button
            isIconOnly
            color="primary"
            aria-label="switch language"
            className="bg-white bg-opacity-50 dark:bg-dark dark:bg-opacity-30"
          >
            <LanguageRoundedIcon className="text-primary dark:text-white" />
          </Button>
        </DropdownTrigger>
      </Badge>
      {/* Dropdown menu for selecting different languages */}
      <DropdownMenu variant="flat" aria-label="switch language">
        {dropdownMenu}
      </DropdownMenu>
    </Dropdown>
  );
}

// Exporting the SwitchLang component as the default export
export default SwitchLang;
