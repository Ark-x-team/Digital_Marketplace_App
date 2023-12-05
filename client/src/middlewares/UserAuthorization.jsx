import { useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import Progress from "../components/Progress";
import AdminRoutes from "../routes/user/AdminRoutes";
import ManagerRoutes from "../routes/user/ManagerRoutes";
import AssistantRoutes from "../routes/user/AssistantRoutes";
import userAuthStore from "../store/authentication/UserAuthStore";
import { useNavigate } from "react-router-dom";

function RequireAuth(props) {
  const { loggedIn, role } = userAuthStore();
  const navigate = useNavigate();

  if (loggedIn && role == "admin") {
    return <AdminRoutes />;
  } else if (loggedIn && role == "manager") {
    return <ManagerRoutes />;
  } else if (loggedIn && role == "assistant") {
    return <AssistantRoutes />;
  } else navigate("/login");

  return <div>{props.children}</div>;
}

// Add PropTypes validation for children
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
