import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const AdminDashboardHome = lazy(() => import("../../user/admin/Dashboard"));

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminDashboardHome />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
