import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { authActions } from "../store/auth";

const LogoutRoute = ({ element }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((storePie) => storePie.authSlice.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(authActions.logout());
    }
  }, [dispatch, isLoggedIn]);
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.HOME} />;
  }
  return element;
};
export default LogoutRoute;
