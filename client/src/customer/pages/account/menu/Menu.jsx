import accountMenuData from "./MenuData";
import { ScrollShadow, Tabs, Tab } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { block } from "million/react";
import { useTranslation } from "react-i18next";

const AccountMenu = block(() => {
  const location = useLocation();
  const [currentItem, setCurrentItem] = useState("");
  useEffect(() => {
    setCurrentItem(
      accountMenuData.findIndex(
        (item) => `/account/${item.url}` === location.pathname
      )
    );
  }, [location.pathname]);

  const { t } = useTranslation();

  const menuItems = (
    <Tabs
      selectedKey={currentItem.toString()}
      size="lg"
      color="primary"
      variant="solid"
      aria-label="Tabs variants"
      className="account-menu"
    >
      {accountMenuData
        .filter((item) => !item.replace)
        .map((item, index) => (
          <Tab
            key={index}
            as={Link}
            to={item.url}
            title={
              <div className="flex items-center space-x-2 ">
                {item.icon}
                <span>{t(item.title)}</span>
              </div>
            }
            className="justify-start"
          />
        ))}
    </Tabs>
  );
  return (
    <ScrollShadow
      isEnabled={false}
      hideScrollBar
      orientation="horizontal"
      className="lg:w-fit flex justify-center"
    >
      {menuItems}
    </ScrollShadow>
  );
});
export default AccountMenu;
