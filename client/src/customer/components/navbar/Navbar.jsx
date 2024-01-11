// Importing React hooks, components, and icons from libraries
import { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import { Button } from "@nextui-org/react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import MainStore from "../../../Store/MainStore";
import { Link, useLocation } from "react-router-dom";
import NavData from "./NavData"; // Assuming there is a file with navigation data
import { useTranslation } from "react-i18next";

// React functional component for the client-specific navbar
function ClientNavbar() {
  // Destructuring required functions and objects from main store
  const { closeNav } = MainStore();
  const { t } = useTranslation();

  // Using React Router's useLocation to get the current pathname
  const location = useLocation();
  const [currentPathname, setCurrentPathname] = useState("");

  // useEffect to update the current pathname when the location changes
  useEffect(() => {
    setCurrentPathname(location.pathname);
  }, [location.pathname]);

  // Generating menu items based on the navigation data
  const menuItems = NavData.map((item, index) => (
    <Button
      key={index}
      as={Link}
      to={item.url}
      onClick={closeNav}
      color="primary"
      variant={item.url === currentPathname ? "flat" : "light"}
      className="w-fit dark:text-white capitalize"
    >
      {t(item.title)}
    </Button>
  ));

  // Generating the "Login" button for the end of the navbar
  const endButton = (
    <Button
      as={Link}
      to="/login"
      onClick={closeNav}
      color="primary"
      variant="solid"
      className="w-fit dark:text-white capitalize"
      endContent={<LoginRoundedIcon />}
    >
      {t("account")}
    </Button>
  );

  // Rendering the Navbar component with the generated menu items and end button
  return <Navbar menuItems={menuItems} endButton={endButton} />;
}

// Exporting the ClientNavbar component as the default export
export default ClientNavbar;
