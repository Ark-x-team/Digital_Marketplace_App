import "./style/App.css";
import "./style/App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Progress from "./components/Progress";

// Middlewares
import RequireAuth from "./middlewares/requireAuth";
import AdminRoutes from "./routes/user/AdminRoutes";
import ManagerRoutes from "./routes/user/ManagerRoutes";
import AssistantRoutes from "./routes/user/AssistantRoutes";

// Client
const ClientRoutes = lazy(() => import("./routes/ClientRoutes"));

// Customer
const CustomerRoutes = lazy(() => import("./routes/customer/CustomerRoutes"));

// User Auth
const UserAuthRoutes = lazy(() => import("./routes/user/UserAuthRoutes"));

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/**********************  Client  **********************/}
      <Route
        path="/*"
        element={
          <Suspense fallback={<Progress />}>
            <ClientRoutes />
          </Suspense>
        }
      />
      {/**********************  Customer  **********************/}
      <Route
        path="account/*"
        element={
          <Suspense fallback={<Progress />}>
            <RequireAuth>
              <CustomerRoutes />
            </RequireAuth>
          </Suspense>
        }
      />
      {/********************  User Auth ********************/}
      <Route
        path="user/*"
        element={
          <Suspense fallback={<Progress />}>
            <UserAuthRoutes />
          </Suspense>
        }
      />

      {/********************  Back Office ********************/}

      {/* Admin */}
      <Route
        path="admin/*"
        element={
          <Suspense fallback={<Progress />}>
            <AdminRoutes />
          </Suspense>
        }
      />

      {/* Manager */}
      <Route
        path="manager/*"
        element={
          <Suspense fallback={<Progress />}>
            <ManagerRoutes />
          </Suspense>
        }
      />
      <Route
        path="assistant/*"
        element={
          <Suspense fallback={<Progress />}>
            <AssistantRoutes />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
