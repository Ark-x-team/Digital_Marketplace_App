import { useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import Progress from "../Components/Progress";
import CustomerRoutes from "../Routes/Customer/CustomerRoutes";
import { useNavigate } from "react-router-dom";
import customerAuthStore from "../Store/Authentication/CustomerAuthStore";

// Component for handling customer authorization
function CustomerAuthorization(props) {
  // Destructuring values from customerAuthStore
  const { loggedIn, setLoggedIn } = customerAuthStore();

  // Hook for navigating between pages
  const navigate = useNavigate();

  // Effect hook to check customer authentication on component mount
  useEffect(() => {
    // Function to check authentication
    const checkAuth = async () => {
      // Get the token from cookies
      const token = Cookies.get("token");

      // If the token exists, setLoggedIn to true, else navigate to login page
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        navigate("/login");
      }
    };

    // Invoke the checkAuth function
    checkAuth();
  }, []); // Empty dependency array ensures the effect runs only on mount

  // If loggedIn is true, render the CustomerRoutes
  if (loggedIn === true) {
    return <CustomerRoutes />;
  }

  // If loggedIn is null, render a loading spinner (Progress component)
  if (loggedIn === null) {
    return <Progress />;
  }

  // If loggedIn is false, render the children (typically a login page)
  return <div>{props.children}</div>;
}

// Prop types for the CustomerAuthorization component
CustomerAuthorization.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomerAuthorization;
