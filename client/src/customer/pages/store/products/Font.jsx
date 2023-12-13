import { Button } from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PropTypes from "prop-types";

function Font(props) {
  const { name, font, images, price } = props;

  // Assuming `font` is the file name of the font
  const fontUrl = `http://localhost:8081/uploads/${font}`;

  const fontStyles = `
    @font-face {
      font-family: '${name}';
      src: url('${fontUrl}') format('truetype');
      /* Add more font formats if needed */
    }
  `;

  return (
    <div className="cursor-pointer hover:scale-105 duration-500">
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
          <h3 className="mt-4 text-sm text-gray-700 dark:text-white">{name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900 dark:text-slate-300">
            {price} MAD
          </p>
        </li>
        <Button
          color="primary"
          variant="light"
          className="w-fit dark:text-primary capitalize"
          endContent={<AddRoundedIcon />}
        >
          add
        </Button>
      </ul>
    </div>
  );
}

Font.propTypes = {
  name: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Font;
