import { Button } from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PropTypes from "prop-types";

function Pdf(props) {
  const { name, image, price } = props;

  return (
    <div className="cursor-pointer hover:scale-105 duration-500">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={`http://localhost:8081/uploads/${image}`}
          alt={name}
          className="h-48 w-full object-cover object-center hover:opacity-75 duration-200"
        />
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

Pdf.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Pdf;
