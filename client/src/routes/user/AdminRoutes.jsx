import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

// Lazy-loaded component for the admin dashboard home
const AdminDashboardHome = lazy(() => import("../../user/admin/Dashboard"));

// Component for handling routes for the admin dashboard
function AdminRoutes() {
  return (
    <>
      {/* Routes for the admin dashboard */}
      <Routes>
        {/* Default route: renders the AdminDashboardHome component */}
        <Route path="/" element={<AdminDashboardHome />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
