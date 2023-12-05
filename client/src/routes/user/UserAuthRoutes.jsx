import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";

const UserLogin = lazy(() => import("../../user/authentication/Login"));
const UserResetPasswordVerify = lazy(() =>
  import("../../user/authentication/ResetPasswordVerify")
);
const UserResetPassword = lazy(() =>
  import("../../user/authentication/ResetPassword")
);

function UserAuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="/login" element={<UserLogin />} />
      <Route
        path="/reset-password-verify"
        element={<UserResetPasswordVerify />}
      />
      <Route path="/reset-password" element={<UserResetPassword />} />
    </Routes>
  );
}

export default UserAuthRoutes;
