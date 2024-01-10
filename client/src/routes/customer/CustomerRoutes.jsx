import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";

// Lazy-loaded components
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

// Component for handling routes for the customer's account
function CustomerRoutes() {
  return (
    <>
      {/* Navbar for the customer side */}
      <ClientNavbar />

      {/* Main container for the account pages */}
      <div className="main-container px-4 lg:px-4 py-20 md:py-24 lg:py-28 flex flex-col md:flex-row gap-8 lg:gap-16 xl:gap-32">
        {/* Account menu for navigation */}
        <AccountMenu />

        {/* Routes for the customer's account pages */}
        <Routes>
          {/* Default route redirects to the profile page */}
          <Route path="/" element={<Navigate to="profile" replace />} />

          {/* Profile page route */}
          <Route path="/profile" element={<Profile />} />

          {/* Cart page route */}
          <Route path="/cart" element={<Cart />} />

          {/* Inbox page route */}
          <Route path="/inbox" element={<Inbox />} />

          {/* Orders page route */}
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  );
}

export default CustomerRoutes;
