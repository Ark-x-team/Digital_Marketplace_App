// Importing necessary components and libraries
import { useEffect } from "react";
import productStore from "../../../../../Store/Products/ProductStore";
import { Button } from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useTranslation } from "react-i18next";
import cartStore from "../../../../../Store/CartStore";
import customerAuthStore from "../../../../../Store/Authentication/CustomerAuthStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Functional component for the ImageModal
const ImageModal = () => {
  // Destructuring data and functions from the product store
  const { getProduct, productData } = productStore();

  // Fetching product data on component mount
  useEffect(() => {
    getProduct();
  }, []);

  // Initializing navigation hook
  const navigate = useNavigate();
  // Destructuring functions from cart store
  const { addToCart } = cartStore();

  // Function to handle adding image to cart
  const handleAddToCart = (id, customerId) => {
    // Checking for authentication token using Cookies
    const token = Cookies.get("token");
    if (token) {
      // Adding image to cart if authenticated
      addToCart(id, customerId);
    } else {
      // Redirecting to login page if not authenticated
      navigate("/login");
    }
  };

  // Initializing translation hook
  const { t } = useTranslation();

  return (
    // Main container for the ImageModal
    <div className="h-fit">
      {/* Container for image preview with lock overlay */}
      <span className="relative h-80 w-full">
        {/* Displaying product image */}
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
            productData.product_files[0]
          }`}
          alt={productData.product_name}
          className="h-80 min-w-full object-cover object-center hover:opacity-75 duration-200"
        />
        {/* Lock overlay on top of the image */}
        <img
          src="/shapes/lock.png"
          alt="lock"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </span>
      {/* Container for product details */}
      <div className=" mt-2 p-3 md:p-4 lg:p-5 xl:px-8 flex justify-between">
        {/* Displaying product name */}
        <h1 className=" text-lg md:text-xl lg:text-2xl capitalize text-primary dark:text-white">
          {productData.product_name}
        </h1>
        {/* Displaying product price */}
        <h2 className="text-lg md:text-xl capitalize text-slate-700 dark:text-white">
          {t("price")}
          <span className="font-semibold"> {productData.price} MAD </span>
        </h2>
      </div>
      {/* Container for product descriptions */}
      <div className="p-3 md:p-4 lg:p-5 xl:px-8 flex flex-col gap-2 md:gap-3 lg:gap-4">
        {/* Displaying short and long descriptions */}
        <h3 className="dark:text-light">{productData.short_description}</h3>
        <h3 className="dark:text-light">{productData.long_description}</h3>
      </div>
      {/* Container for the "Add to Cart" button */}
      <div className="p-3 md:p-4 lg:p-5 xl:px-8 flex justify-end">
        {/* Button for adding image to cart */}
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
          {/* Translation for the "add" button */}
          {t("add")}
        </Button>
      </div>
    </div>
  );
};

// Exporting the ImageModal component as the default export
export default ImageModal;
