import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { authActions } from "../store/auth";

const LogoutRoute = ({ element }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((storePie) => storePie.authSlice.isLoggedIn);
  if (isLoggedIn) {
    dispatch(authActions.logout());
    return element;
  } else {
    return <Navigate to={ROUTES.HOME} />;
  }
};
export default LogoutRoute;
