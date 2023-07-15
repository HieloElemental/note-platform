import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const logoutHandler = () => {
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    logoutHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Login Out...</h1>
    </div>
  );
};

export default Logout;
