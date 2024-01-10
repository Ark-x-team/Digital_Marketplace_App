import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

// Lazy-loaded components
const ClientNavbar = lazy(() =>
  import("../../customer/components/navbar/Navbar")
);
import PaymentSuccess from "../../customer/pages/payment/PaymentSuccess";
import PaymentFailed from "../../customer/pages/payment/PaymentFailed";

// Component for handling routes related to payment
function PaymentRoutes() {
  return (
    <>
      {/* Navbar for the customer side */}
      <ClientNavbar />

      {/* Routes for handling payment success and failure */}
      <Routes>
        {/* Route for payment success */}
        <Route path="/checkout-success" element={<PaymentSuccess />} />

        {/* Route for payment failure */}
        <Route path="/checkout-failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
}

export default PaymentRoutes;
