import Grid from "@mui/material/Grid";
import RegisterCardComponent from "../../components/newComponents/RegisterCardComponent";

const RegisterPage = () => {
  return (
    <div className="registerContainer">
      <Grid container className="registerGridPageContainer">
        <Grid item xs={12} className="signupGridItem">
          <RegisterCardComponent />
        </Grid>
      </Grid>
    </div>
  );
};
export default RegisterPage;
