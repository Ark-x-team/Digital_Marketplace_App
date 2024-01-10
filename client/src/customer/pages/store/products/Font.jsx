// Importing necessary components and libraries
import { Button } from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PropTypes from "prop-types";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import FontModal from "./modals/FontModal"; // Importing the FontModal component
import productStore from "../../../../store/products/ProductStore";
import cartStore from "../../../../store/CartStore";
import customerAuthStore from "../../../../store/authentication/CustomerAuthStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

// Functional component for the Font
function Font(props) {
  // Destructuring props
  const { id, name, font, images, price } = props;

  // Constructing the font URL
  const fontUrl = `${import.meta.env.VITE_SERVER_URL}/uploads/${font}`;

  // Creating font styles for the @font-face rule
  const fontStyles = `
    @font-face {
      font-family: '${name}';
      src: url('${fontUrl}') format('truetype');
      /* Add more font formats if needed */
    }
  `;

  // Handling modal open/close state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Creating a modal component for the FontModal
  const productModal = (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      backdrop="blur"
      radius="3xl"
    >
      <ModalContent>
        <FontModal />
      </ModalContent>
    </Modal>
  );

  const { setProduct, getProduct } = productStore(); // Destructuring functions from product store

  const navigate = useNavigate();
  const { addToCart } = cartStore();

  // Function to handle adding font to cart
  const handleAddToCart = (id, customerId) => {
    // Checking for authentication token using Cookies
    const token = Cookies.get("token");
    if (token) {
      // Adding font to cart if authenticated
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
      {/* Container for the font component */}
      <div
        // Handling click event to set product, fetch data, and open the modal
        onClick={async () => {
          setProduct(id);
          await getProduct(); // Wait for the product data to be fetched
          onOpen(); // Now open the modal
        }}
        className="cursor-pointer hover:scale-105 duration-500"
      >
        {/* Applying font styles dynamically */}
        <style>{fontStyles}</style>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <span className="h-48 w-full relative hover:opacity-75 duration-200">
            {/* Displaying the font image */}
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/uploads/${images}`}
              alt={name}
              className="h-48 w-full object-cover object-center dark:brightness-[.8]"
            />
            {/* Displaying the font name using the specified font-family */}
            <h2
              style={{ fontFamily: name }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl lg:text-4xl text-black text-center"
            >
              {name} font
            </h2>
          </span>
        </div>
        {/* Container for product details and "Add to Cart" button */}
        <ul className="flex justify-between items-end">
          <li>
            {/* Displaying font name and price */}
            <h3 className="mt-4 text-sm text-gray-700 dark:text-white">
              {name}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-slate-300">
              {price} MAD
            </p>
          </li>
          {/* Button for adding font to cart */}
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
      {/* Rendering the FontModal when the modal is open */}
      {productModal}
    </>
  );
}

// PropTypes for type-checking the
Font.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Font;
