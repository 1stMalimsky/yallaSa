import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const ProtectedRoute = ({ needAdmin, needLoggedIn, element }) => {
  const token = localStorage.getItem("token");
  const user = useSelector((storePie) => storePie.authSlice);

  if (!token) {
    toast.error(`You must be looged in to view this page`);
    return <Navigate to={ROUTES.HOME} />;
  }

  if (needAdmin && user.payload.isAdmin) {
    return element;
  }
  if (needLoggedIn && !needAdmin && user.isLoggedIn) {
    return element;
  } else {
    toast.error(`You must be admin user to view this page`);
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default ProtectedRoute;
