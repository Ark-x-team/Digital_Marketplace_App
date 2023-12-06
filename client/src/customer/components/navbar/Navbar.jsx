import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import { Button } from "@nextui-org/react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import mainStore from "../../../store/mainStore";
import { Link, useLocation } from "react-router-dom";
import navData from "./NavData";

function ClientNavbar() {
  const { closeNav } = mainStore();

  const location = useLocation();
  const [currentPathname, setCurrentPathname] = useState("");
  useEffect(() => {
    setCurrentPathname(location.pathname);
  }, [location.pathname]);

  const menuItems = navData.map((item, index) => (
    <Button
      key={index}
      as={Link}
      to={item.url}
      onClick={closeNav}
      color="primary"
      variant={item.url === currentPathname ? "flat" : "light"}
      className="w-fit dark:text-white"
    >
      {item.title}
    </Button>
  ));
  const endButton = (
    <Button
      as={Link}
      to="/login"
      onClick={closeNav}
      color="primary"
      variant="solid"
      className="w-fit dark:text-white"
      endContent={<LoginRoundedIcon />}
    >
      account
    </Button>
  );

  return <Navbar menuItems={menuItems} endButton={endButton} />;
}
export default ClientNavbar;