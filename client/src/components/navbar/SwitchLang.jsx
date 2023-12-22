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
import mainStore from "../../store/mainStore";
import Cookies from "js-cookie";
import { useEffect } from "react";

function SwitchLang() {
  const { selectedLang, languages, handleLangSwitch } = mainStore();
  const currentLang = Cookies.get("lang").substring(0, 2);

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, []);

  const { i18n } = useTranslation();
  const dropdownMenu = languages.map((item, index) => (
    <DropdownItem
      key={index}
      onClick={() => {
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

  return (
    <Dropdown placement="bottom-end" className="dropdown">
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
      <DropdownMenu variant="flat" aria-label="switch language">
        {dropdownMenu}
      </DropdownMenu>
    </Dropdown>
  );
}
export default SwitchLang;
