import { Button, Avatar } from "@nextui-org/react";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import {
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import mainStore from "../../store/mainStore";

const SwitchLang = () => {
  const { selectedLang, languages, handleLangSwitch } = mainStore();
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
      <DropdownMenu variant="flat">
        {languages.map((item, index) => (
          <DropdownItem
            key={index}
            onClick={() => handleLangSwitch(item)}
            startContent={
              <Avatar
                alt={`${item.lang} flag`}
                className="w-6 h-6"
                src={item.flag}
              />
            }
            className="capitalize px-4 py-2"
          >
            {item.lang}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default SwitchLang;
