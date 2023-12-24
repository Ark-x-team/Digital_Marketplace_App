import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import ImageModal from "./modals/ImageModal";
import productStore from "../../../../store/products/ProductStore";
import customerAuthStore from "../../../../store/authentication/customerAuthStore";
import cartStore from "../../../../store/cartStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useTranslation } from "react-i18next";

function Image(props) {
  const { id, name, images, price } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  const { setProduct, getProduct } = productStore();

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
    <>
      <div className="cursor-pointer hover:scale-105 duration-500">
        <div
          onClick={async () => {
            setProduct(id);
            await getProduct();
            onOpen();
          }}
          className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
        >
          <img
            src={`http://localhost:8081/uploads/${images}`}
            alt={name}
            className="h-48 min-w-full object-cover object-center hover:opacity-75 duration-200"
          />
        </div>
        <ul className="flex justify-between items-end">
          <li>
            <h3 className="mt-4 text-sm text-gray-700 dark:text-white">
              {name}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-slate-300">
              {price} MAD
            </p>
          </li>
          <Button
            onClick={() =>
              handleAddToCart(id, customerAuthStore.getState().customerId)
            }
            color="primary"
            variant="light"
            className="w-fit dark:text-primary capitalize"
            endContent={<AddRoundedIcon />}
          >
            {t("add")}
          </Button>
        </ul>
      </div>
      {productModal}
    </>
  );
}

Image.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Image;
