// Importing necessary components and libraries
import HoverVideoPlayer from "react-hover-video-player";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Modal, ModalContent, useDisclosure, Button } from "@nextui-org/react";
import VideoModal from "./modals/VideoModal"; // Importing the VideoModal component
import productStore from "../../../../store/products/ProductStore";
import customerAuthStore from "../../../../store/authentication/customerAuthStore";
import cartStore from "../../../../store/cartStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Functional component for the Video
function Video(props) {
  // Destructuring props
  const { id, name, video, price, subCategory } = props;

  // State to handle mute/unmute of the video
  const [isMute, setIsMute] = useState(true);

  // Ref for the HoverVideoPlayer component
  const hoverVideoRef = useRef();
  useEffect(() => {
    const videoElement = hoverVideoRef.current;
    console.log(videoElement);
  }, []);

  // Handling modal open/close state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Creating a modal component for the VideoModal
  const productModal = (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      backdrop="blur"
      radius="3xl"
    >
      <ModalContent>
        <VideoModal />
      </ModalContent>
    </Modal>
  );

  const { setProduct, getProduct } = productStore(); // Destructuring functions from product store

  const navigate = useNavigate();
  const { addToCart } = cartStore();

  // Function to handle adding video to cart
  const handleAddToCart = (id, customerId) => {
    // Checking for authentication token using Cookies
    const token = Cookies.get("token");
    if (token) {
      // Adding video to cart if authenticated
      addToCart(id, customerId);
    } else {
      // Redirecting to login page if not authenticated
      navigate("/login");
    }
  };

  // Initializing translation hook
  const { t } = useTranslation();

  return (
    <>
      {/* Container for the Video component */}
      <div className="cursor-pointer hover:scale-105 duration-500">
        <div
          // Handling click event to set product, fetch data, and open the modal
          onClick={async () => {
            setProduct(id);
            await getProduct(); // Wait for the product data to be fetched
            onOpen(); // Now open the modal
          }}
          className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
        >
          {/* Container for the video player */}
          <div className="relative h-48 w-full object-cover object-center duration-200">
            {/* HoverVideoPlayer component */}
            <HoverVideoPlayer
              videoRef={hoverVideoRef}
              videoSrc={`${import.meta.env.VITE_SERVER_URL}/uploads/${video}`}
              muted={isMute}
              loop={false}
              className="video-player h-full w-full"
            />
            {/* Volume control button (shown only for "video templates" subCategory) */}
            {subCategory == "video templates" && (
              <Button
                onClick={() => setIsMute(!isMute)}
                isIconOnly
                className="absolute bottom-1 left-1 text-white bg-transparent"
                aria-label="Mute"
              >
                {isMute ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
              </Button>
            )}
          </div>
        </div>
        {/* Container for product details and "Add to Cart" button */}
        <ul className="flex justify-between items-end">
          <li>
            {/* Displaying video name and price */}
            <h3 className="mt-4 text-sm text-gray-700 dark:text-white">
              {name}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-slate-300">
              {price} MAD
            </p>
          </li>
          {/* Button for adding video to cart */}
          <Button
            onClick={() =>
              handleAddToCart(id, customerAuthStore.getState().customerId)
            }
            color="primary"
            variant="light"
            className="w-fit dark:text-primary capitalize"
            endContent={<AddRoundedIcon />}
          >
            {/* Translation for the "add" button */}
            {t("add")}
          </Button>
        </ul>
      </div>
      {/* Rendering the VideoModal when the modal is open */}
      {productModal}
    </>
  );
}

// PropTypes for type-checking the component's props
Video.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  subCategory: PropTypes.string.isRequired,
};

// Exporting the Video component
export default Video;
