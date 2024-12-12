import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoginCardComponent from "../../components/newComponents/logInCardComponent";

const LoginPage = () => {
  const isLoggedIn = useSelector((storePie) => storePie.authSlice.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      toast.error(
        "You are currently logged in. You must logout to login again"
      );
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Grid container className="loginGridContainer">
        <Grid item xs={12} sx={{ marginTop: "1em" }}>
          <LoginCardComponent />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
