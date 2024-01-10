// Importing required icons and components from Material-UI and other libraries
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import {
  Button,
  PopoverContent,
  Popover,
  PopoverTrigger,
  Badge,
} from "@nextui-org/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { Divider } from "@nextui-org/react";
import { useEffect } from "react";
import customerAuthStore from "../../store/authentication/CustomerAuthStore";
import cartStore from "../../store/CartStore";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import mainStore from "../../store/MainStore";

// React functional component for the cart dropdown
function CartDropdown() {
  // Destructuring required functions and objects from hooks and stores
  const { checkAuth } = customerAuthStore();
  const { getCartItems, cartList, bill, removeFromCart } = cartStore();
  const { t } = useTranslation();

  // Fetching cart items on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkAuth();
        let { customerId } = customerAuthStore.getState();
        await getCartItems(customerId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [checkAuth, getCartItems]);

  // Destructuring required function from main store for closing navigation
  const { closeNav } = mainStore();

  // Cart content JSX with mapped cart items and checkout details
  const cart = (
    <>
      {cartList &&
        cartList.slice(0, 3).map((item, index) => (
          <ul key={index} className="w-full">
            <div className="w-full flex items-center justify-between">
              <span className="flex flex-col gap-1">
                <h1 className="capitalize font-semibold">{item.name}</h1>
                <h2 className="capitalize dark:text-light">{item.price} MAD</h2>
              </span>
              <Button
                onClick={() =>
                  removeFromCart(
                    item.itemId,
                    customerAuthStore.getState().customerId
                  )
                }
                variant="light"
                color="danger"
                endContent={<DeleteRoundedIcon />}
                className="mt-3 capitalize"
              >
                {t("remove")}
              </Button>
            </div>
            {cartList.length > 1 && <Divider className="my-4" />}
          </ul>
        ))}
      {cartList && cartList.length > 3 && (
        <Button
          to="/account/cart"
          as={Link}
          onClick={() => closeNav()}
          variant="light"
          color="primary"
          className="capitalize"
        >
          {t("show all")}
        </Button>
      )}
      <div className="mt-2 w-full flex justify-between items-center gap-4 lg:gap-6 xl:gap-8">
        <div className="text-lg">
          {" "}
          <span className="capitalize">{t("total")} :</span>{" "}
          <span className=" font-semibold mx-2">{bill} MAD </span>
        </div>

        <Button
          to="/account/cart"
          as={Link}
          onClick={() => closeNav()}
          variant="flat"
          color="primary"
          endContent={<ShoppingCartCheckoutRoundedIcon />}
          className="capitalize"
        >
          {t("checkout")}
        </Button>
      </div>
    </>
  );

  // Rendering the cart dropdown component
  return (
    <Popover showArrow shouldBlockScroll offset={10}>
      {/* Badge with cart item count */}
      <Badge
        content={cartList.length > 0 ? cartList.length : false}
        color="primary"
        shape="rectangle"
        showOutline={false}
      >
        {/* Cart icon button */}
        <PopoverTrigger>
          <Button
            isIconOnly
            aria-label="Cart"
            className="bg-white bg-opacity-50 dark:bg-dark dark:bg-opacity-30"
          >
            <ShoppingCartRoundedIcon className="text-primary dark:text-white" />
          </Button>
        </PopoverTrigger>
      </Badge>
      {/* Cart content in the popover */}
      <PopoverContent
        className={`${
          cartList && cartList.length < 1 ? "min-w-fit" : "md:min-w-[450px]"
        } overflow-scroll p-4 md:p-6 xl:p-8 rounded-2xl flex flex-col gap-4`}
      >
        {cartList && cartList.length < 1 ? "Your cart is empty" : cart}
      </PopoverContent>
    </Popover>
  );
}

// Exporting the CartDropdown component as the default export
export default CartDropdown;
