import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";

// Lazy-loaded components
const ClientNavbar = lazy(() =>
  import("../../Customer/Components/Navbar/Navbar")
);
const AccountMenu = lazy(() =>
  import("../../Customer/Pages/Account/Menu/Menu")
);
import Profile from "../../Customer/Pages/Account/Profile";
import Cart from "../../Customer/Pages/Account/Cart";
import Inbox from "../../Customer/Pages/Account/Inbox";
import Orders from "../../Customer/Pages/Account/Orders";

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
