// Importing necessary components and libraries
import { Button } from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PropTypes from "prop-types";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import PdfModal from "./modals/ImageModal"; // Importing the PdfModal component
import productStore from "../../../../store/products/ProductStore";
import cartStore from "../../../../store/CartStore";
import customerAuthStore from "../../../../store/authentication/CustomerAuthStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

// Functional component for the Pdf
function Pdf(props) {
  // Destructuring props
  const { id, name, image, price } = props;

  // Handling modal open/close state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Creating a modal component for the PdfModal
  const productModal = (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      backdrop="blur"
      radius="3xl"
    >
      <ModalContent>
        <PdfModal />
      </ModalContent>
    </Modal>
  );

  const { setProduct, getProduct } = productStore(); // Destructuring functions from product store

  const navigate = useNavigate();
  const { addToCart } = cartStore();

  // Function to handle adding PDF to cart
  const handleAddToCart = (id, customerId) => {
    // Checking for authentication token using Cookies
    const token = Cookies.get("token");
    if (token) {
      // Adding PDF to cart if authenticated
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
      {/* Container for the PDF component */}
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
          {/* Displaying the PDF image */}
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/uploads/${image}`}
            alt={name}
            className="h-48 w-full object-cover object-center hover:opacity-75 duration-200"
          />
        </div>
        {/* Container for product details and "Add to Cart" button */}
        <ul className="flex justify-between items-end">
          <li>
            {/* Displaying PDF name and price */}
            <h3 className="mt-4 text-sm text-gray-700 dark:text-white">
              {name}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-slate-300">
              {price} MAD
            </p>
          </li>
          {/* Button for adding PDF to cart */}
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
      {/* Rendering the PdfModal when the modal is open */}
      {productModal}
    </>
  );
}

// PropTypes for type-checking the component's props
Pdf.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

// Exporting the Pdf component
export default Pdf;
