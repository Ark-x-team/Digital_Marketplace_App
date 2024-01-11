// Importing necessary components and libraries
import HoverVideoPlayer from "react-hover-video-player";
import { useEffect, useRef, useState } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import { Button } from "@nextui-org/react";
import productStore from "../../../../../Store/Products/ProductStore";
import { useTranslation } from "react-i18next";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import customerAuthStore from "../../../../../Store/Authentication/CustomerAuthStore";
import cartStore from "../../../../../Store/CartStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Functional component for the VideoModal
const VideoModal = () => {
  // Destructuring data and functions from the product store
  const { getProduct, productData } = productStore();

  // Fetching product data on component mount
  useEffect(() => {
    getProduct();
  }, []);

  // State for managing mute/unmute
  const [isMute, setIsMute] = useState(true);
  // Ref for the HoverVideoPlayer component
  const hoverVideoRef = useRef();
  useEffect(() => {
    // Logging the video element reference for debugging
    const videoElement = hoverVideoRef.current;
    console.log(videoElement);
  }, []);

  // Initializing navigation hook
  const navigate = useNavigate();
  // Destructuring functions from cart store
  const { addToCart } = cartStore();

  // Function to handle adding audio to cart
  const handleAddToCart = (id, customerId) => {
    // Checking for authentication token using Cookies
    const token = Cookies.get("token");
    if (token) {
      // Adding audio to cart if authenticated
      addToCart(id, customerId);
    } else {
      // Redirecting to login page if not authenticated
      navigate("/login");
    }
  };

  // Initializing translation hook
  const { t } = useTranslation();

  return (
    // Main container for the VideoModal
    <div className="h-fit">
      {/* Container for audio preview with mute/unmute button */}
      <div className="relative h-80 w-full object-cover object-center duration-200">
        {/* HoverVideoPlayer component for playing the audio preview */}
        <HoverVideoPlayer
          videoRef={hoverVideoRef}
          videoSrc={`${import.meta.env.VITE_SERVER_URL}/uploads/${
            productData.product_files[1]
          }`}
          muted={isMute}
          loop={true}
          className="video-player h-full w-full"
        />
        {/* Mute/Unmute button */}
        <Button
          onClick={() => setIsMute(!isMute)}
          isIconOnly
          className="absolute bottom-1 left-1 text-white bg-transparent"
          aria-label="Mute"
        >
          {/* Conditional rendering of volume icon based on mute state */}
          {isMute ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
        </Button>
      </div>
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
        {/* Button for adding audio to cart */}
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

// Exporting the VideoModal component as the default export
export default VideoModal;
