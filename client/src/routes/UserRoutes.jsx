import { Route, Routes } from "react-router-dom";
import Error from "../useless/Error";
import UserLogin from "../user/authentication/Login";
import UserResetPasswordVerify from "../user/authentication/ResetPasswordVerify";
import UserResetPassword from "../user/authentication/ResetPassword";

const UserAuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/reset-password-verify"
          element={<UserResetPasswordVerify />}
        />
        <Route path="/reset-password" element={<UserResetPassword />} />
      </Routes>
    </div>
  );
};

export default UserAuthRoutes;
