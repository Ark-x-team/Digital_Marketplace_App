import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productStore from "../../../store/products/ProductStore";

function Products() {
  const { getProducts, productList } = productStore();

  let { subcategory } = useParams();

  useEffect(() => {
    try {
      getProducts(subcategory);
      console.log(subcategory);
    } catch (error) {
      console.error(error);
    }
  }, [subcategory]);

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-5">
      {productList.map((product) => (
        <div key={product._id} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={`http://localhost:8081/uploads/${product.product_images}`}
              alt={product.product_name}
              className="h-44 w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.product_name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {product.price}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Products;
