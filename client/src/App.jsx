import "./style/App.css";
import "./style/App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Progress from "./components/Progress";

// Middlewares
import CustomerAuthorization from "./middlewares/CustomerAuthorization";
import UserAuthorization from "./middlewares/UserAuthorization";
import PaymentRoutes from "./routes/customer/PaymentRoutes";

// Client
const ClientRoutes = lazy(() => import("./routes/client/ClientRoutes"));

// Store
const StoreRoutes = lazy(() => import("./routes/client/StoreRoutes"));

// Customer
const CustomerRoutes = lazy(() => import("./routes/customer/CustomerRoutes"));

// User Auth
const UserAuthRoutes = lazy(() => import("./routes/user/UserAuthRoutes"));

// Admin
const AdminRoutes = lazy(() => import("./routes/user/AdminRoutes"));

// Manager
const ManagerRoutes = lazy(() => import("./routes/user/ManagerRoutes"));

// Assistant
const AssistantRoutes = lazy(() => import("./routes/user/AssistantRoutes"));

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
      {/* Store */}
      <Route
        path="store/*"
        element={
          <Suspense fallback={<Progress />}>
            <StoreRoutes />
          </Suspense>
        }
      />
      {/**********************  Customer  **********************/}
      <Route
        path="account/*"
        element={
          <Suspense fallback={<Progress />}>
            <CustomerAuthorization>
              <CustomerRoutes />
            </CustomerAuthorization>
          </Suspense>
        }
      />
      {/************************ Payment ************************/}
      <Route
        path="payment/*"
        element={
          <Suspense fallback={<Progress />}>
            <CustomerAuthorization>
              <PaymentRoutes />
            </CustomerAuthorization>
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
            <UserAuthorization>
              <AdminRoutes />
            </UserAuthorization>
          </Suspense>
        }
      />

      {/* Manager */}
      <Route
        path="manager/*"
        element={
          <Suspense fallback={<Progress />}>
            <UserAuthorization>
              <ManagerRoutes />
            </UserAuthorization>
          </Suspense>
        }
      />
      <Route
        path="assistant/*"
        element={
          <Suspense fallback={<Progress />}>
            <UserAuthorization>
              <AssistantRoutes />
            </UserAuthorization>
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
