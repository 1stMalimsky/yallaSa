import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const payload = jwt_decode(token);
      const userId = payload.userId;
      const foundUser = await axios.get("/users/" + userId);
      if (!foundUser) {
        localStorage.clear();
        toast.err("Invalid token");
        return navigate("/");
      }
      dispatch(authActions.login(payload));
    } catch (err) {
      console.log("useLogin error", err.response.data);
    }
  };
};

export default useLogin;
