import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Categories from "../../customer/pages/store/Categories";
import SubCategories from "../../customer/pages/store/SubCategories";
import Footer from "../../customer/components/Footer";
import ProductsList from "../../customer/pages/store/ProductsList";
import PaginationCursor from "../../customer/pages/store/Pagination";
import { Progress } from "@nextui-org/react";
import productStore from "../../store/products/ProductStore";

// Lazy-loaded components
const ClientNavbar = lazy(() =>
  import("../../customer/components/navbar/Navbar")
);

// Store page component rendering categories, subcategories, products list, and pagination
const StorePage = () => (
  <>
    <ul className="flex flex-col gap-5">
      <Categories />
      <SubCategories />
    </ul>
    <ProductsList />
    <PaginationCursor />
  </>
);

// Component for handling routes for the store
function StoreRoutes() {
  // Destructuring values from productStore
  const { loading } = productStore();

  return (
    <>
      {/* Display loading spinner when data is loading */}
      {loading ? (
        <Progress
          style={{ zIndex: "9999" }}
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="absolute top-0 left-0 w-full"
        />
      ) : (
        ""
      )}

      {/* Navbar for the customer side */}
      <ClientNavbar />

      {/* Main store container */}
      <div className="pt-24 store-container px-4">
        <Routes>
          {/* Default route: renders the StorePage component */}
          <Route path="/" element={<StorePage />} />

          {/* Dynamic route with a category parameter */}
          <Route path="/:category" element={<StorePage />}>
            {/* Dynamic route with a subcategory parameter */}
            <Route path=":subcategory" element={<StorePage />} />

            {/* Static route for 'all' category */}
            <Route path="all" element={<ProductsList />} />
          </Route>
        </Routes>

        {/* Footer for the store */}
        <Footer />
      </div>
    </>
  );
}

export default StoreRoutes;
