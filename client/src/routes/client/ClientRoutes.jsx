import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Error from "../../components/Error";

const ClientNavbar = lazy(() =>
  import("../../customer/components/navbar/Navbar")
);
const LandingPage = lazy(() =>
  import("../../customer/pages/landing-page/LandingPage")
);
const HowItWorks = lazy(() =>
  import("../../customer/pages/how-it-works/HowItWorks")
);
const AboutUs = lazy(() => import("../../customer/pages/AboutUs"));
const ContactUs = lazy(() => import("../../customer/pages/ContactUs"));
const SignUp = lazy(() => import("../../customer/pages/authentication/SignUp"));
const AccountVerification = lazy(() =>
  import("../../customer/pages/authentication/AccountVerification")
);
const Login = lazy(() => import("../../customer/pages/authentication/Login"));
const ResetPassword = lazy(() =>
  import("../../customer/pages/authentication/ResetPassword")
);
const ResetPasswordVerification = lazy(() =>
  import("../../customer/pages/authentication/ResetPasswordVerification")
);

function ClientRoutes() {
  return (
    <>
      <ClientNavbar />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/email-verification" element={<AccountVerification />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/reset-password-verify"
          element={<ResetPasswordVerification />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default ClientRoutes;
