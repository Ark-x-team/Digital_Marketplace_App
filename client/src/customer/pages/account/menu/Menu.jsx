// Importing necessary dependencies and components
import accountMenuData from "./MenuData";
import { ScrollShadow, Tabs, Tab } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { block } from "million/react";
import { useTranslation } from "react-i18next";

// Defining the AccountMenu component as a block
const AccountMenu = block(() => {
  // Using useLocation to get the current location
  const location = useLocation();

  // State to track the index of the current active menu item
  const [currentItem, setCurrentItem] = useState("");

  // Effect to update the active menu item based on the current location
  useEffect(() => {
    setCurrentItem(
      accountMenuData.findIndex(
        (item) => `/account/${item.url}` === location.pathname
      )
    );
  }, [location.pathname]);

  // Initializing the useTranslation hook
  const { t } = useTranslation();

  // Generating individual Tabs components for each menu item
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
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{t(item.title)}</span>
              </div>
            }
            className="justify-start"
          />
        ))}
    </Tabs>
  );

  // Wrapping the menuItems in a horizontal scroll container with a shadow
  return (
    <ScrollShadow
      hideScrollBar
      orientation="horizontal"
      className="lg:w-fit flex justify-center"
    >
      {menuItems}
    </ScrollShadow>
  );
});

// Exporting the AccountMenu component as the default export
export default AccountMenu;
