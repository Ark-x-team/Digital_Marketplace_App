import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";

const UserLogin = lazy(() => import("../../User/Authentication/Login"));
const UserResetPasswordVerify = lazy(() =>
  import("../../User/Authentication/ResetPasswordVerify")
);
const UserResetPassword = lazy(() =>
  import("../../User/Authentication/ResetPassword")
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
