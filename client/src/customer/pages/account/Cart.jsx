import { block } from "million/react";
import { Button, Divider, Spinner } from "@nextui-org/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import { useEffect, useState } from "react";
import customerAuthStore from "../../../store/authentication/customerAuthStore";
import cartStore from "../../../store/cartStore";
import { useTranslation } from "react-i18next";

const Cart = block(() => {
  const { checkAuth, customerId } = customerAuthStore();
  const { getCartItems, cartList, bill, removeFromCart, checkout } =
    cartStore();

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

  const [loading, setLoading] = useState(false);
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

  const { t } = useTranslation();

  return (
    <div className="min-h-[50vh] grow flex flex-col items-center justify-center gap-4">
      {cartList && cartList.length > 0 ? (
        <>
          <div className="w-full xl:w-4/5 flex flex-col justify-center xl:items-center">
            {cartList &&
              cartList.map((item, index) => (
                <ul key={index} className="lg:w-3/4 xl:w-full">
                  <div className="w-full flex items-center gap-6">
                    <img
                      src={`http://localhost:8081/uploads/${item.files[0]}`}
                      alt="product image"
                      className="w-42 md:w-56 h-24 md:h-32 rounded-xl object-cover object-center"
                    />
                    <div className="flex flex-col grow">
                      <span className="flex flex-col gap-1">
                        <h1 className="capitalize font-semibold">
                          {item.name}
                        </h1>
                        <h2 className="capitalize dark:text-light">
                          {item.price} MAD
                        </h2>
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
          <div className="mt-5 lg:w-3/5 xl:w-4/5 flex justify-between lg:justify-start xl:justify-between items-center gap-4 lg:gap-6 xl:gap-8 mx-auto">
            <div className="text-lg">
              {" "}
              <span className="capitalize">{t("total")} :</span>{" "}
              <span className=" font-semibold mx-2">{bill} MAD </span>
            </div>
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
        <span className="text-lg">{t("cart is empty")}</span>
      )}
    </div>
  );
});

export default Cart;
