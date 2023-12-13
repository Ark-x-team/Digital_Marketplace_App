import HoverVideoPlayer from "react-hover-video-player";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@nextui-org/react";

function Video(props) {
  const { name, video, price, subCategory } = props;
  const [isMute, setIsMute] = useState(true);

  const hoverVideoRef = useRef();
  useEffect(() => {
    const videoElement = hoverVideoRef.current;

    console.log(videoElement);
  }, []);

  return (
    <div className="cursor-pointer hover:scale-105 duration-500">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <div className="relative h-48 w-full object-cover object-center duration-200">
          <HoverVideoPlayer
            videoRef={hoverVideoRef}
            videoSrc={`http://localhost:8081/uploads/${video}`}
            muted={isMute}
            loop={false}
            className="video-player h-full w-full"
          />
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
      <ul className="flex justify-between items-end">
        <li>
          <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{price} MAD</p>
        </li>
        <Button
          color="primary"
          variant="light"
          className="w-fit dark:text-white capitalize"
          endContent={<AddRoundedIcon />}
        >
          add
        </Button>
      </ul>
    </div>
  );
}

Video.propTypes = {
  name: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  subCategory: PropTypes.string.isRequired,
};

export default Video;
