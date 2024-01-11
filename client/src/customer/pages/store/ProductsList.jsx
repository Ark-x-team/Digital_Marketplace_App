import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import productStore from "../../../Store/Products/ProductStore";
import Image from "./Products/Image";
import Audio from "./Products/Audio";
import Font from "./Products/Font";
import Video from "./Products/Video";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import cartStore from "../../../Store/CartStore";

function ProductsList() {
  // Destructuring values from the productStore
  const {
    getProductsByCategory,
    getProductsBySubcategory,
    productList,
    page,
    searchValue,
    getProductsBySearch,
    searchedProduct,
  } = productStore();

  // Destructuring values from the cartStore
  const { itemAdded, closeItemAdded } = cartStore();

  // State for currently playing audio
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // Destructuring category and subcategory from the URL params
  let { category, subcategory } = useParams();

  // Effect hook to fetch products based on category, subcategory, or search value
  useEffect(() => {
    try {
      if (subcategory) {
        getProductsBySubcategory(subcategory);
      } else {
        getProductsByCategory(category);
      }
      if (searchValue !== "") {
        getProductsBySearch();
      }
      setCurrentlyPlaying(null);
    } catch (error) {
      console.error(error);
    }
    // Scroll to the top of the window when the component mounts
    window.scrollTo(0, 0);
  }, [subcategory, page, searchValue]);

  // Function to handle playing audio
  const handlePlay = (audioUrl, audioRef) => {
    const audioElement = audioRef.current.audio.current;
    if (!currentlyPlaying || currentlyPlaying.audioUrl !== audioUrl) {
      if (currentlyPlaying) {
        currentlyPlaying.audioRef.current.audio.current.pause();
      }
      setCurrentlyPlaying({ audioUrl, audioRef });
      audioElement.play();
    } else {
      audioElement.play();
    }
  };

  // Ref for popover content
  const popoverContentRef = useRef(null);

  // Function to close the popover when clicking outside
  const closePopover = (e) => {
    if (
      popoverContentRef.current &&
      !popoverContentRef.current.contains(e.target)
    ) {
      closeItemAdded();
    }
  };

  // Effect hook to close the item added message after a timeout
  useEffect(() => {
    setTimeout(() => {
      closeItemAdded();
    }, 1500);

    // Attach the event listener when the component mounts
    document.addEventListener("click", closePopover);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closePopover);
    };
  }, [itemAdded]);

  // JSX for the added message popover
  const addedMessage = (
    <Popover
      ref={popoverContentRef}
      isOpen={itemAdded}
      style={{
        position: "fixed",
        zIndex: "100000",
        left: "50%",
        transform: "translate(-50%)",
        top: "50px",
      }}
    >
      <PopoverTrigger>
        <></>
      </PopoverTrigger>
      <PopoverContent className="bg-primary text-white flex flex-row gap-2 justify-center items-center p-4">
        <CheckCircleRoundedIcon />
        <p className="text-small font-bold">Item added in your cart</p>
      </PopoverContent>
    </Popover>
  );

  // JSX for the product list
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-5">
        {searchedProduct.length === 0
          ? productList.map((product, index) =>
              // Rendering different components based on product type
              product.active && product?.product_type === "audio" ? (
                <Audio
                  key={index}
                  id={product._id}
                  name={product?.product_name}
                  images={product?.product_files[0]}
                  audio={product?.product_files[1]}
                  price={product?.price}
                  play={(audioRef) =>
                    handlePlay(product?.product_files[1], audioRef)
                  }
                />
              ) : product?.product_type === "font" ? (
                <Font
                  key={index}
                  id={product._id}
                  name={product?.product_name}
                  images={product?.product_files[0]}
                  font={product?.product_files[1]}
                  price={product?.price}
                />
              ) : product?.product_type === "image" ||
                product.product_type === "text" ||
                product?.subcategory_name === "courses" ||
                product.product_type === "pdf" ? (
                <Image
                  key={index}
                  id={product._id}
                  name={product?.product_name}
                  images={product?.product_files[0]}
                  price={product?.price}
                />
              ) : product?.product_type === "video" ? (
                <Video
                  key={index}
                  id={product._id}
                  name={product?.product_name}
                  video={product?.product_files[1]}
                  price={product?.price}
                  subCategory={product?.subcategory_name}
                />
              ) : (
                ""
              )
            )
          : searchedProduct.map((product, index) =>
              // Rendering different components based on product type for searched products
              product.active && product?.product_type === "audio" ? (
                <Audio
                  key={index}
                  id={product._id}
                  name={product?.product_name}
                  images={product?.product_files[0]}
                  audio={product?.product_files[1]}
                  price={product?.price}
                  play={(audioRef) =>
                    handlePlay(product?.product_files[1], audioRef)
                  }
                />
              ) : product?.product_type === "font" ? (
                <Font
                  key={index}
                  id={product._id}
                  name={product?.product_name}
                  images={product?.product_files[0]}
                  font={product?.product_files[1]}
                  price={product?.price}
                />
              ) : product?.product_type === "image" ||
                product.product_type === "text" ||
                product?.subcategory_name === "courses" ||
                product.product_type === "pdf" ? (
                <Image
                  key={index}
                  id={product._id}
                  name={product?.product_name}
                  images={product?.product_files[0]}
                  price={product?.price}
                />
              ) : product?.product_type === "video" ? (
                <Video
                  key={index}
                  id={product._id}
                  name={product?.product_name}
                  video={product?.product_files[1]}
                  price={product?.price}
                  subCategory={product?.subcategory_name}
                />
              ) : (
                ""
              )
            )}
      </div>
      {/* Render the added message*/}
      {addedMessage}
    </>
  );
}

export default ProductsList;
