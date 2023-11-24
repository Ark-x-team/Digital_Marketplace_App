import "./style/App.css";
import "./style/App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Error from "./useless/Error";
import AboutUs from "./customer/pages/AboutUs";
import ContactUs from "./customer/pages/ContactUs";
import HowItWorks from "./customer/pages/HowItWorks";
import Market from "./customer/pages/market/Market";
import CustomerRoutes from "./routes/CustomerRoutes";
import SignUp from "./customer/pages/authentication/SignUp";
import Login from "./customer/pages/authentication/Login";
import ResetPassword from "./customer/pages/authentication/ResetPassword";
import ResetPasswordVerify from "./customer/pages/authentication/ResetPasswordVerify";
import UserLogin from "./user/authentication/Login";
import UserAuthRoutes from "./routes/UserRoutes";
import UserResetPasswordVerify from "./user/authentication/ResetPasswordVerify";
import UserResetPassword from "./user/authentication/ResetPassword";
import Profile from "./customer/pages/profile/Profile";

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      {/********************  Back Office ********************/}
      <Route path="/user" element={<UserAuthRoutes />}>
        <Route path="*" element={<Error />} />
        <Route path="login" element={<UserLogin />} />
        <Route
          path="reset-password-verify"
          element={<UserResetPasswordVerify />}
        />
        <Route path="reset-password" element={<UserResetPassword />} />
      </Route>
      {/**********************  Customer  **********************/}
      <Route path="/" element={<CustomerRoutes />}>
        <Route path="*" element={<Error />} />
        <Route path="market" element={<Market />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="/reset-password-verify"
          element={<ResetPasswordVerify />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
