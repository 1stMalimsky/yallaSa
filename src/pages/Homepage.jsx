import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { useNavigate, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import SearchCard from "../components/newComponents/SearchCard";

const Homepage = () => {
  return (
    <div>
      <Grid container className={"gridContainerHomePage"}>
        <Grid
          item
          xs={12}
          md={4}
          className="homepageHeaderBox"
          /* sx={{ backgroundColor: "background.default" }} */
        >
          <SearchCard />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
