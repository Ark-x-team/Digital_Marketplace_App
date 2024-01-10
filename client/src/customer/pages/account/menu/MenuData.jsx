// Importing icons from Material-UI library
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";

// Array containing data for the account menu, each with a title, URL, and an associated icon
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
    title: "inbox",
    url: "inbox",
    icon: <ForumRoundedIcon />,
  },
  {
    title: "orders",
    url: "orders",
    icon: <InventoryRoundedIcon />,
  },
];

// Exporting the accountMenuData array as the default export
export default accountMenuData;
