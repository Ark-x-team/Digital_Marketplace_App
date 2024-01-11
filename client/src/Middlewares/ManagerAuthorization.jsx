import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Progress from "../Components/Progress";
import userAuthStore from "../Store/Authentication/UserAuthStore";

// Component for handling manager authorization
function ManagerAuthorization(props) {
  // Destructuring values and functions from userAuthStore
  const { accessToken, getAccessToken } = userAuthStore();

  // State to track loading state
  const [loading, setLoading] = useState(false);

  // Hook for navigating between pages
  const navigate = useNavigate();

  // Effect hook to check manager authorization on component mount
  useEffect(() => {
    // Function to check authorization
    const checkAuth = async () => {
      // Set loading to true to indicate that the check is in progress
      setLoading(true);

      // Get the role from the userAuthStore state
      let { role } = userAuthStore.getState();

      // If accessToken exists, navigate based on the role, else try to get the token
      if (accessToken) {
        setLoading(false);
        navigate(`/${role === "manager" ? role : "user/login"}`);
      } else {
        try {
          // Attempt to get the access token
          await getAccessToken();

          // Get the role again after getting the token
          let { role } = userAuthStore.getState();

          // Set loading to false and navigate based on the role
          setLoading(false);
          navigate(`/${role ? role : "user/login"}`);
        } catch (error) {
          // If there's an error, set loading to false and navigate to the login page
          setLoading(false);
          navigate("/user/login");
        }
      }
    };

    // Invoke the checkAuth function
    checkAuth();
  }, []); // Empty dependency array ensures the effect runs only on mount

  // If loading is null, render a loading spinner (Progress component)
  if (loading === null) {
    return <Progress />;
  }

  // Render the children (typically the content to be displayed for authenticated or unauthenticated users)
  return <div>{props.children}</div>;
}

// Prop types for the ManagerAuthorization component
ManagerAuthorization.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ManagerAuthorization;
