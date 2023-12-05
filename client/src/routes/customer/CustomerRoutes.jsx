import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";

const ClientNavbar = lazy(() =>
  import("../../customer/components/navbar/Navbar")
);
const AccountMenu = lazy(() =>
  import("../../customer/pages/account/menu/Menu")
);
const Profile = lazy(() => import("../../customer/pages/account/Profile"));
const Cart = lazy(() => import("../../customer/pages/account/Cart"));
const Favorite = lazy(() => import("../../customer/pages/account/Favorite"));
const Inbox = lazy(() => import("../../customer/pages/account/Inbox"));
const Orders = lazy(() => import("../../customer/pages/account/Orders"));
const Settings = lazy(() => import("../../customer/pages/account/Settings"));

function CustomerRoutes() {
  return (
    <>
      <ClientNavbar />
      <div className="main-container px-4 lg:px-4 py-20 md:py-24 lg:py-28 flex flex-col gap-4 md:gap-10 lg:gap-16 lg:flex-row">
        <AccountMenu />
        <Routes>
          <Route path="/" element={<Navigate to="profile" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}

export default CustomerRoutes;
