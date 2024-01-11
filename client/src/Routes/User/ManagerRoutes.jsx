import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const ManagerDashboardHome = lazy(() => import("../../User/Manager/Dashboard"));

function ManagerRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ManagerDashboardHome />} />
      </Routes>
    </>
  );
}

export default ManagerRoutes;
