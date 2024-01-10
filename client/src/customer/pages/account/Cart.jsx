// Importing necessary dependencies and components
import { block } from "million/react";
import { Button, Divider, Spinner } from "@nextui-org/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { useEffect, useState } from "react";
import customerAuthStore from "../../../store/authentication/customerAuthStore";
import cartStore from "../../../store/cartStore";
import { useTranslation } from "react-i18next";

// Defining the Cart component as a block
const Cart = block(() => {
  // Extracting functions and state from customerAuthStore and cartStore
  const { checkAuth, customerId } = customerAuthStore();
  const { getCartItems, cartList, bill, removeFromCart, checkout } = cartStore();

  // Fetching cart items when the component mounts
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

  // State for loading during checkout
  const [loading, setLoading] = useState(false);

  // Handling the checkout process
  const handleCheckout = async (id) => {
    setLoading(true);
    try {
      await checkout(id);
      setLoading(false);
      let { paymentUrl } = cartStore.getState();
      window.location.replace(paymentUrl);
    } catch (error) {
      setLoading(false);
    }
  };

  // Initializing the useTranslation hook
  const { t } = useTranslation();

  // Rendering the Cart component
  return (
    <div className="min-h-[50vh] grow flex flex-col items-center justify-center gap-4">
      {cartList && cartList.length > 0 ? (
        <>
          <div className="w-full xl:w-4/5 flex flex-col justify-center xl:items-center">
            {cartList &&
              cartList.map((item, index) => (
                <ul key={index} className="lg:w-3/4 xl:w-full">
                  <div className="w-full flex items-center gap-6">
                    {/* Rendering product image */}
                    <img
                      src={`http://localhost:8081/uploads/${item.files[0]}`}
                      alt="product image"
                      className="w-42 md:w-56 h-24 md:h-32 rounded-xl object-cover object-center"
                    />
                    {/* Rendering product details and remove button */}
                    <div className="flex flex-col grow">
                      <span className="flex flex-col gap-1">
                        <h1 className="capitalize font-semibold">
                          {item.name}
                        </h1>
                        <h2 className="capitalize dark:text-light">
                          {item.price} MAD
                        </h2>
                      </span>
                      {/* Remove button for the product */}
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
                        className="mt-3 self-end capitalize"
                      >
                        {t("remove")}
                      </Button>
                    </div>
                  </div>
                  {cartList && cartList.length > 1 && (
                    <Divider className="my-6 lg:my-8" />
                  )}
                </ul>
              ))}
          </div>
          {/* Displaying total and checkout button */}
          <div className="mt-5 lg:w-3/5 xl:w-4/5 flex justify-between lg:justify-start xl:justify-between items-center gap-4 lg:gap-6 xl:gap-8 mx-auto">
            <div className="text-lg">
              {" "}
              <span className="capitalize">{t("total")} :</span>{" "}
              <span className=" font-semibold mx-2">{bill} MAD </span>
            </div>
            {/* Checkout button with loading spinner during the checkout process */}
            <Button
              onClick={() => handleCheckout(customerId)}
              variant="flat"
              color="primary"
              endContent={
                loading ? (
                  <Spinner size="sm" />
                ) : (
                  <ShoppingCartCheckoutRoundedIcon />
                )
              }
              className="capitalize"
            >
              {t("checkout")}
            </Button>
          </div>
        </>
      ) : (
        // Message when the cart is empty
        <span className="text-lg">{t("cart is empty")}</span>
      )}
    </div>
  );
});

// Exporting the Cart component as the default export
export default Cart;
