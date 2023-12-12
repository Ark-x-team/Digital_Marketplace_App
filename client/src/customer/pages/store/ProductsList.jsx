import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productStore from "../../../store/products/ProductStore";
import Image from "./products/Image";
import Audio from "./products/Audio";
import Font from "./products/Font";
import Pdf from "./products/Pdf";
import Video from "./products/Video";

function ProductsList() {
  const {
    getProductsByCategory,
    getProductsBySubcategory,
    productList,
    page,
    searchValue,
    getProductsBySearch,
  } = productStore();
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  let { category, subcategory } = useParams();

  useEffect(() => {
    try {
      if (subcategory) {
        getProductsBySubcategory(subcategory);
      } else {
        if (searchValue !== "") {
          getProductsBySearch();
        } else getProductsByCategory(category);
      }
      setCurrentlyPlaying(null);
    } catch (error) {
      console.error(error);
    }
    window.scrollTo(0, 0);
  }, [subcategory, page, searchValue]);

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

  return (
    <div className="min-h-screen grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-5">
      {productList.map((product, index) =>
        product.active && product?.product_type === "audio" ? (
          <Audio
            key={index}
            name={product?.product_name}
            images={product?.product_images[0]}
            audio={product?.product_images[1]}
            price={product?.price}
            play={(audioRef) =>
              handlePlay(product?.product_images[1], audioRef)
            }
          />
        ) : product?.product_type === "font" ? (
          <Font
            key={index}
            name={product?.product_name}
            font={product?.product_images[0]}
            images="fonts.jpg"
            price={product?.price}
          />
        ) : product?.product_type === "image" ||
          product.product_type == "text" ||
          product?.subcategory_name == "courses" ? (
          <Image
            key={index}
            name={product?.product_name}
            images={product?.product_images[0]}
            price={product?.price}
          />
        ) : product?.product_type === "pdf" ? (
          <Pdf
            key={index}
            name={product?.product_name}
            image={product?.product_images[0]}
            price={product?.price}
          />
        ) : (
          <Video
            key={index}
            name={product?.product_name}
            video={product?.product_images[0]}
            price={product?.price}
            subCategory={product?.subcategory_name}
          />
        )
      )}
    </div>
  );
}

export default ProductsList;
