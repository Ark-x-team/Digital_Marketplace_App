import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";

const accountMenuData = [
  {
    title: "profile",
    url: "profile",
    icon: <PersonRoundedIcon />,
  },
  {
    title: "cart",
    url: "cart",
    icon: <ShoppingCartRoundedIcon />,
  },
  {
    title: "favorite",
    url: "favorite",
    icon: <FavoriteRoundedIcon />,
  },
  {
    title: "inbox",
    url: "inbox",
    icon: <ForumRoundedIcon />,
  },
  {
    title: "orders",
    url: "orders",
    icon: <InventoryRoundedIcon />,
  },
  {
    title: "settings",
    url: "settings",
    icon: <SettingsRoundedIcon />,
    priority: true,
  },
];

export default accountMenuData;
