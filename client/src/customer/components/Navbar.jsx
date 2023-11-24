import Navbar from "../../useless/navbar/Navbar";
import { Button } from "@nextui-org/react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import mainStore from "../../store/mainStore";
import { Link } from "react-router-dom";

export default function CustomerNavbar() {
  const { handleNavButton, activeButton, closeNav } = mainStore();
  const navigationData = [
    {
      title: "market",
      url: "/market",
    },
    {
      title: "How it works",
      url: "/how-it-works",
    },
    {
      title: "about us",
      url: "/about-us",
    },
    {
      title: "contact us",
      url: "/contact-us",
    },
  ];
  const menuItems = navigationData.map((item, index) => (
    <Button
      key={index}
      as={Link}
      to={item.url}
      onClick={() => handleNavButton(item.title)}
      color="primary"
      variant={activeButton === item.title ? "flat" : "light"}
      className="w-fit dark:text-white"
    >
      {item.title}
    </Button>
  ));
  const endButton = (
    <Button
      to="/login"
      onClick={closeNav}
      as={Link}
      color="primary"
      variant="solid"
      className="w-fit dark:text-white"
      endContent={<LoginRoundedIcon />}
    >
      account
    </Button>
  );
  return <Navbar menuTems={menuItems} endButton={endButton} />;
}
