import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Progress from "../components/Progress";
import userAuthStore from "../store/authentication/userAuthStore";
import { useNavigate } from "react-router-dom";

function UserAuthorization(props) {
  const { accessToken, getAccessToken } = userAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      let { role } = userAuthStore.getState();
      if (accessToken) {
        setLoading(false);
        navigate(`/${role}`);
      } else {
        try {
          await getAccessToken();
          let { role } = userAuthStore.getState();
          setLoading(false);
          navigate(`/${role}`);
        } catch (error) {
          setLoading(false);
          navigate("/user/login");
        }
      }
    };
    checkAuth();
  }, []);

  if (loading === null) {
    return <Progress />;
  }

  return <div>{props.children}</div>;
}

UserAuthorization.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserAuthorization;
