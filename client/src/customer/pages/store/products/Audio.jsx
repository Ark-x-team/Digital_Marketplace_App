import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import AudioModal from "./modals/AudioModal";
import productStore from "../../../../store/products/ProductStore";
import customerAuthStore from "../../../../store/authentication/customerAuthStore";
import cartStore from "../../../../store/cartStore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useTranslation } from "react-i18next";

function Audio(props) {
  const { id, name, images, audio, price, play } = props;
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef(null);

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
        <AudioModal />
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
            await getProduct(); // Wait for the product data to be fetched
            onOpen(); // Now open the modal
          }}
          className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7"
        >
          <span className="h-48 w-full relative hover:opacity-75 duration-200">
            <img
              src={`http://localhost:8081/uploads/${images}`}
              alt={name}
              className="h-48 w-full object-cover object-center dark:brightness-[.8] "
            />
            <AudioPlayer
              ref={audioRef}
              onPlay={() => {
                setShowControls(true);
                play(audioRef);
              }}
              onEnded={() => setShowControls(false)}
              src={`http://localhost:8081/uploads/${audio}`}
              showJumpControls={false}
              autoPlayAfterSrcChange={false}
              autoPlay={false}
              showFilledVolume
              layout="stacked-reverse"
              customIcons={{
                play: (
                  <img src="/icons/play.svg" alt="play" className="w-8 h-8" />
                ),
                pause: (
                  <img src="/icons/pause.svg" alt="pause" className="w-8 h-8" />
                ),
                volume: (
                  <img
                    src="/icons/volume.svg"
                    alt="Volume"
                    className="w-4 h-4"
                  />
                ),
                volumeMute: (
                  <img
                    src="/icons/volume-mute.svg"
                    alt="Volume mute"
                    className="w-4 h-4"
                  />
                ),
              }}
              className={`audio ${
                showControls ? "show-controls" : "hide-controls"
              }`}
            />
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

Audio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
};

export default Audio;
