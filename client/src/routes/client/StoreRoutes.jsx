import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Categories from "../../customer/pages/store/Categories";
import SubCategories from "../../customer/pages/store/SubCategories";
import Footer from "../../customer/components/Footer";
import ProductsList from "../../customer/pages/store/ProductsList";
import PaginationCursor from "../../customer/pages/store/Pagination";
import { Progress } from "@nextui-org/react";
import productStore from "../../store/products/ProductStore";

const ClientNavbar = lazy(() =>
  import("../../customer/components/navbar/Navbar")
);

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
function StoreRoutes() {
  const { loading } = productStore();
  return (
    <>
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
      <ClientNavbar />
      <div className="pt-24 store-container px-4">
        <Routes>
          <Route path="/" element={<StorePage />} />
          <Route path="/:category" element={<StorePage />}>
            <Route path=":subcategory" element={<StorePage />} />
            <Route path="all" element={<ProductsList />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default StoreRoutes;
