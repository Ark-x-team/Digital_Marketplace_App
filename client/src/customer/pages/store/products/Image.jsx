// Importing necessary components and libraries
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import ImageModal from "./Modals/ImageModal"; // Importing the ImageModal component
import productStore from "../../../../Store/Products/ProductStore";
import customerAuthStore from "../../../../Store/Authentication/CustomerAuthStore";
import cartStore from "../../../../Store/CartStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

// Functional component for the Image
function Image(props) {
  // Destructuring props
  const { id, name, images, price } = props;

  // Handling modal open/close state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Creating a modal component for the ImageModal
  const productModal = (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      backdrop="blur"
      radius="3xl"
    >
      <ModalContent>
        <ImageModal />
      </ModalContent>
    </Modal>
  );

  const { setProduct, getProduct } = productStore(); // Destructuring functions from product store

  const navigate = useNavigate();
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
    <>
      {/* Container for the image component */}
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
          {/* Displaying the image */}
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/uploads/${images}`}
            alt={name}
            className="h-48 min-w-full object-cover object-center hover:opacity-75 duration-200"
          />
        </div>
        {/* Container for product details and "Add to Cart" button */}
        <ul className="flex justify-between items-end">
          <li>
            {/* Displaying image name and price */}
            <h3 className="mt-4 text-sm text-gray-700 dark:text-white">
              {name}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-slate-300">
              {price} MAD
            </p>
          </li>
          {/* Button for adding image to cart */}
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
      {/* Rendering the ImageModal when the modal is open */}
      {productModal}
    </>
  );
}

// PropTypes for type-checking the component's props
Image.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

// Exporting the Image component
export default Image;
