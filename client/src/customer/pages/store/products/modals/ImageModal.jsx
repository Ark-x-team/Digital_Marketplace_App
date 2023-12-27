import { useEffect } from "react";
import productStore from "../../../../../store/products/ProductStore";
import { Button } from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useTranslation } from "react-i18next";
import cartStore from "../../../../../store/cartStore";
import customerAuthStore from "../../../../../store/authentication/customerAuthStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ImageModal = () => {
  const { getProduct, productData } = productStore();

  useEffect(() => {
    getProduct();
  }, []);

  const navigate = useNavigate();
  const { addToCart } = cartStore();
  const handleAddToCart = (id, customerId) => {
    const token = Cookies.get("token");
    if (token) {
      addToCart(id, customerId);
    } else {
      navigate("/login");
    }
  };

  const { t } = useTranslation();

  return (
    <div className="h-fit">
      <span className="relative h-80 w-full">
        <img
          src={`http://localhost:8081/uploads/${productData.product_files[0]}`}
          alt={productData.product_name}
          className="h-80 min-w-full object-cover object-center hover:opacity-75 duration-200"
        />
        <img
          src="/shapes/lock.png"
          alt="lock"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </span>
      <div className=" mt-2 p-3 md:p-4 lg:p-5 xl:px-8 flex justify-between">
        <h1 className=" text-lg md:text-xl lg:text-2xl capitalize text-primary dark:text-white">
          {productData.product_name}
        </h1>
        <h2 className="text-lg md:text-xl capitalize text-slate-700 dark:text-white">
          {t("price")}
          <span className="font-semibold"> {productData.price} MAD </span>
        </h2>
      </div>
      <div className="p-3 md:p-4 lg:p-5 xl:px-8 flex flex-col gap-2 md:gap-3 lg:gap-4">
        <h3 className="dark:text-light">{productData.short_description}</h3>
        <h3 className="dark:text-light">{productData.long_description}</h3>
      </div>
      <div className="p-3 md:p-4 lg:p-5 xl:px-8 flex justify-end">
        <Button
          onClick={() =>
            handleAddToCart(
              productData._id,
              customerAuthStore.getState().customerId
            )
          }
          color="primary"
          variant="flat"
          className="w-fit dark:text-primary capitalize"
          endContent={<AddRoundedIcon />}
        >
          {t("add")}
        </Button>
      </div>
    </div>
  );
};

export default ImageModal;