import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Error from "../../Components/Error";
import PaymentSuccess from "../../Customer/Pages/Payment/PaymentSuccess";
import PaymentFailed from "../../Customer/Pages/Payment/PaymentFailed";

// Lazy-loaded components
const ClientNavbar = lazy(() =>
  import("../../Customer/Components/Navbar/Navbar")
);
const LandingPage = lazy(() =>
  import("../../Customer/Pages/Landing-page/LandingPage")
);
const HowItWorks = lazy(() =>
  import("../../Customer/Pages/How-it-works/HowItWorks")
);
const AboutUs = lazy(() => import("../../Customer/Pages/AboutUs"));
const ContactUs = lazy(() => import("../../Customer/Pages/ContactUs"));
const SignUp = lazy(() => import("../../Customer/Pages/Authentication/SignUp"));
const AccountVerification = lazy(() =>
  import("../../Customer/Pages/Authentication/AccountVerification")
);
const Login = lazy(() => import("../../Customer/Pages/Authentication/Login"));
const ResetPassword = lazy(() =>
  import("../../Customer/Pages/Authentication/ResetPassword")
);
const ResetPasswordVerification = lazy(() =>
  import("../../Customer/Pages/Authentication/ResetPasswordVerification")
);

// Component for handling routes for the customer side
function ClientRoutes() {
  return (
    <>
      {/* Navbar for the customer side */}
      <ClientNavbar />

      {/* Routes for the customer side */}
      <Routes>
        {/* Generic error route */}
        <Route path="*" element={<Error />} />

        {/* Landing page route */}
        <Route path="/" element={<LandingPage />} />

        {/* How It Works page route */}
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* About Us page route */}
        <Route path="/about-us" element={<AboutUs />} />

        {/* Contact Us page route */}
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Sign-up page route */}
        <Route path="/sign-up" element={<SignUp />} />

        {/* Email verification page route */}
        <Route path="/email-verification" element={<AccountVerification />} />

        {/* Login page route */}
        <Route path="/login" element={<Login />} />

        {/* Reset Password Verification page route */}
        <Route
          path="/reset-password-verify"
          element={<ResetPasswordVerification />}
        />

        {/* Reset Password page route */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Checkout Success page route */}
        <Route path="/checkout-success" element={<PaymentSuccess />} />

        {/* Checkout Failed page route */}
        <Route path="/checkout-failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
}

export default ClientRoutes;
