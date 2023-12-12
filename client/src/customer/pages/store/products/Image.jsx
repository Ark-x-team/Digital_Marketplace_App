import PropTypes from "prop-types";

function Image(props) {
  const { name, images, price } = props;

  return (
    <div className="cursor-pointer hover:scale-105 duration-500">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={`http://localhost:8081/uploads/${images}`}
          alt={name}
          className="h-48 min-w-full object-cover object-center hover:opacity-75 duration-200"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{price} MAD</p>
    </div>
  );
}

Image.propTypes = {
  name: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Image;
