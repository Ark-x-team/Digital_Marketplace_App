import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";

const ClientNavbar = lazy(() =>
  import("../../customer/components/navbar/Navbar")
);
const AccountMenu = lazy(() =>
  import("../../customer/pages/account/menu/Menu")
);
import Profile from "../../customer/pages/account/Profile";
import Cart from "../../customer/pages/account/Cart";
import Inbox from "../../customer/pages/account/Inbox";
import Orders from "../../customer/pages/account/Orders";

function CustomerRoutes() {
  return (
    <>
      <ClientNavbar />
      <div className="main-container px-4 lg:px-4 py-20 md:py-24 lg:py-28 flex flex-col md:flex-row gap-8 lg:gap-16 xl:gap-32">
        <AccountMenu />
        <Routes>
          <Route path="/" element={<Navigate to="profile" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  );
}

export default CustomerRoutes;
