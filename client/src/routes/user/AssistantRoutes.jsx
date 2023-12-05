import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const AssistantDashboardHome = lazy(() =>
  import("../../user/assistant/Dashboard")
);

function AssistantRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AssistantDashboardHome />} />
      </Routes>
    </>
  );
}

export default AssistantRoutes;
