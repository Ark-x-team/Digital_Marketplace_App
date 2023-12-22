import HoverVideoPlayer from "react-hover-video-player";
import { useEffect, useRef, useState } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import { Button } from "@nextui-org/react";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import productStore from "../../../../../store/products/ProductStore";
import { useTranslation } from "react-i18next";

const AudioModal = () => {
  const { getProduct, productData } = productStore();

  useEffect(() => {
    getProduct();
  }, []);

  const [isMute, setIsMute] = useState(true);
  const hoverVideoRef = useRef();
  useEffect(() => {
    const videoElement = hoverVideoRef.current;
    console.log(videoElement);
  }, []);

  const { t } = useTranslation();

  return (
    <div className="h-fit">
      <div className="relative h-80 w-full object-cover object-center duration-200">
        <HoverVideoPlayer
          videoRef={hoverVideoRef}
          videoSrc={`http://localhost:8081/uploads/${productData.product_files[0]}`}
          muted={isMute}
          loop={true}
          className="video-player h-full w-full"
        />

        <Button
          onClick={() => setIsMute(!isMute)}
          isIconOnly
          className="absolute bottom-1 left-1 text-white bg-transparent"
          aria-label="Mute"
        >
          {isMute ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
        </Button>
      </div>
      <div className="mt-2 p-3 md:p-4 lg:p-5 xl:px-8 flex justify-between">
        <h1 className=" text-lg md:text-xl lg:text-2xl capitalize text-primary dark:text-white">
          {productData.product_name}
        </h1>
        <h2 className="text-lg md:text-xl capitalize text-slate-700 dark:text-white">
          {t("price")}
          <span className="font-semibold"> {productData.price} MAD </span>
        </h2>
      </div>
      <div className="p-3 md:p-4 lg:p-5 xl:px-8 flex flex-col gap-2 md:gap-3 lg:gap-4">
        <h3 className="dark:text-light">{productData.short_description}</h3>
        <h3 className="dark:text-light">{productData.long_description}</h3>
      </div>
      <div className="p-3 md:p-4 lg:p-5 xl:px-8 flex justify-end">
        <Button
          color="primary"
          variant="flat"
          className="w-fit dark:text-primary capitalize"
          endContent={<FileDownloadRoundedIcon />}
        >
          {t("download")}
        </Button>
      </div>
    </div>
  );
};

export default AudioModal;
