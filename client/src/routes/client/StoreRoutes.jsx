import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Categories from "../../customer/pages/store/Categories";
import SubCategories from "../../customer/pages/store/SubCategories";
import Footer from "../../customer/components/Footer";
import ProductsList from "../../customer/pages/store/Products";
import Searchbar from "../../customer/pages/store/Searchbar";
import Filter from "../../customer/pages/store/Filter";

const ClientNavbar = lazy(() =>
  import("../../customer/components/navbar/Navbar")
);

const Products = () => (
  <>
    <ul className="flex flex-col gap-5">
      <Categories />
      <span className="w-full flex justify-between items-center ">
        <SubCategories />
        <ul className="flex gap-4">
          <Searchbar />
          <Filter />
        </ul>
      </span>
    </ul>
    <ProductsList />
  </>
);
function StoreRoutes() {
  return (
    <>
      <ClientNavbar />
      <div className="pt-24 main-container px-4">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/:category" element={<Products />}>
            <Route path=":subcategory" element={<Products />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default StoreRoutes;
