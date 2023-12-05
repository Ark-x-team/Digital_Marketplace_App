import { useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import Progress from "../components/Progress";
import CustomerRoutes from "../routes/customer/CustomerRoutes";
import customerAuthStore from "../store/authentication/customerAuthStore";
import { useNavigate } from "react-router-dom";

function RequireAuth(props) {
  const { loggedIn, setLoggedIn } = customerAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");

      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  if (loggedIn === true) {
    return <CustomerRoutes />;
  }

  if (loggedIn === null) {
    return <Progress />;
  }

  if (loggedIn === false) {
    navigate("/login");
  }

  return <div>{props.children}</div>;
}

// Add PropTypes validation for children
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
