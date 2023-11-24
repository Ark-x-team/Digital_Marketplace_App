import { Route, Routes } from "react-router-dom";
import LandingPage from "../customer/pages/landing-page/LandingPage";
import Market from "../customer/pages/market/Market";
import Error from "../useless/Error";
import HowItWorks from "../customer/pages/HowItWorks";
import AboutUs from "../customer/pages/AboutUs";
import ContactUs from "../customer/pages/ContactUs";
import SignUp from "../customer/pages/authentication/SignUp";
import Login from "../customer/pages/authentication/Login";
import ResetPassword from "../customer/pages/authentication/ResetPassword";
import ResetPasswordVerify from "../customer/pages/authentication/ResetPasswordVerify";
import CustomerNavbar from "../customer/components/Navbar";
import Profile from "../customer/pages/profile/Profile";

const CustomerRoutes = () => {
  return (
    <div>
      <CustomerNavbar />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/market" element={<Market />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/reset-password-verify"
          element={<ResetPasswordVerify />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default CustomerRoutes;
