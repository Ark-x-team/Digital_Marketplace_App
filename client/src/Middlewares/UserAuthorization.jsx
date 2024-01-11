import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Progress from "../Components/Progress";
import { useNavigate } from "react-router-dom";
import userAuthStore from "../Store/Authentication/UserAuthStore";

// Component for handling user authorization
function UserAuthorization(props) {
  // Destructuring values and functions from userAuthStore
  const { accessToken } = userAuthStore();

  // State to track loading state
  const [loading, setLoading] = useState(false);

  // Hook for navigating between pages
  const navigate = useNavigate();

  // Effect hook to check user authorization on component mount
  useEffect(() => {
    // Function to check authorization
    const checkAuth = async () => {
      // Set loading to true to indicate that the check is in progress
      setLoading(true);

      // If accessToken exists, set loading to false and navigate to the admin page
      if (accessToken) {
        setLoading(false);
        navigate("/admin");
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

// Prop types for the UserAuthorization component
UserAuthorization.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserAuthorization;
