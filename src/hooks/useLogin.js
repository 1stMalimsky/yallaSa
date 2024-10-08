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
      const payload = await jwt_decode(token);
      const userId = payload.userId;
      const { data } = await axios.get("/user/" + userId);
      if (!data) {
        localStorage.clear();
        toast.err("Invalid token");
        navigate("/");
      }
      dispatch(authActions.login(payload));
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export default useLogin;