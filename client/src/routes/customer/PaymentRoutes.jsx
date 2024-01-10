import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const ClientNavbar = lazy(() =>
  import("../../customer/components/navbar/Navbar")
);
import PaymentSuccess from "../../customer/pages/payment/PaymentSuccess";
import PaymentFailed from "../../customer/pages/payment/PaymentFailed";

function PaymentRoutes() {
  return (
    <>
      <ClientNavbar />
      <Routes>
        <Route path="/checkout-success" element={<PaymentSuccess />} />
        <Route path="/checkout-failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
}

export default PaymentRoutes;
