import { Button } from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PropTypes from "prop-types";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import FontModal from "./modals/FontModal";
import productStore from "../../../../store/products/ProductStore";
import cartStore from "../../../../store/cartStore";
import customerAuthStore from "../../../../store/authentication/customerAuthStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useTranslation } from "react-i18next";

function Font(props) {
  const { id, name, font, images, price } = props;

  const fontUrl = `http://localhost:8081/uploads/${font}`;

  const fontStyles = `
    @font-face {
      font-family: '${name}';
      src: url('${fontUrl}') format('truetype');
      /* Add more font formats if needed */
    }
  `;

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
        <FontModal />
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
      <div
        onClick={async () => {
          setProduct(id);
          await getProduct();
          onOpen();
        }}
        className="cursor-pointer hover:scale-105 duration-500"
      >
        <style>{fontStyles}</style>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <span className="h-48 w-full relative hover:opacity-75 duration-200">
            <img
              src={`http://localhost:8081/uploads/${images}`}
              alt={name}
              className="h-48 w-full object-cover object-center dark:brightness-[.8]"
            />
            <h2
              style={{ fontFamily: name }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl lg:text-4xl text-black text-center"
            >
              {name} font
            </h2>
          </span>
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

Font.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Font;
