// Importing necessary components and libraries
import { useEffect, useState } from "react";
import productStore from "../../../../../store/products/ProductStore";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Button } from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useTranslation } from "react-i18next";
import cartStore from "../../../../../store/CartStore";
import customerAuthStore from "../../../../../store/authentication/CustomerAuthStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Functional component for the AudioModal
const AudioModal = () => {
  // Destructuring data and functions from the product store
  const { getProduct, productData } = productStore();
  // State to manage the visibility of audio controls
  const [showControls, setShowControls] = useState(false);

  // Fetching product data on component mount
  useEffect(() => {
    getProduct();
  }, []);

  // Initializing navigation hook
  const navigate = useNavigate();
  // Destructuring functions from cart store
  const { addToCart } = cartStore();

  // Function to handle adding product to cart
  const handleAddToCart = (id, customerId) => {
    // Checking for authentication token using Cookies
    const token = Cookies.get("token");
    if (token) {
      // Adding product to cart if authenticated
      addToCart(id, customerId);
    } else {
      // Redirecting to login page if not authenticated
      navigate("/login");
    }
  };

  // Initializing translation hook
  const { t } = useTranslation();

  return (
    // Main container for the AudioModal
    <div className="h-fit">
      {/* Container for audio player with image */}
      <span className="h-80 w-full relative hover:opacity-75 duration-200">
        {/* Displaying product image */}
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
            productData.product_files[0]
          }`}
          alt={productData.product_name}
          className="h-80 w-full object-cover object-center dark:brightness-[.8] "
        />
        {/* Audio player component */}
        <AudioPlayer
          onPlay={() => {
            setShowControls(true);
          }}
          onEnded={() => setShowControls(false)}
          src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
            productData.product_files[1]
          }`}
          showJumpControls={false}
          autoPlayAfterSrcChange={false}
          autoPlay={false}
          showFilledVolume
          layout="stacked-reverse"
          customIcons={{
            play: <img src="/icons/play.svg" alt="play" className="w-8 h-8" />,
            pause: (
              <img src="/icons/pause.svg" alt="pause" className="w-8 h-8" />
            ),
            volume: (
              <img src="/icons/volume.svg" alt="Volume" className="w-4 h-4" />
            ),
            volumeMute: (
              <img
                src="/icons/volume-mute.svg"
                alt="Volume mute"
                className="w-4 h-4"
              />
            ),
          }}
          // Adding dynamic class for showing/hiding controls
          className={`audio-modal ${
            showControls ? "show-controls" : "hide-controls"
          }`}
        />
      </span>
      {/* Container for product details */}
      <div className="mt-2 p-3 md:p-4 lg:p-5 xl:px-8 flex justify-between">
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
        {/* Button for adding product to cart */}
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

// Exporting the AudioModal component as the default export
export default AudioModal;
