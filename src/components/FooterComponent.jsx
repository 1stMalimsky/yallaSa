import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SavingsIcon from "@mui/icons-material/Savings";

const FooterComponent = () => {
  const isDarkMode = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );
  return (
    <Grid
      container
      className={isDarkMode ? "gridContainerDark" : "gridContainer"}
    >
      <Grid item xs={4} sx={{ paddingLeft: 3 }}>
        <Typography variant="h6" className="footerHeader">
          Contact Us
        </Typography>
        <Typography variant="body1" className="footerContact">
          <AlternateEmailIcon />
          &nbsp;&nbsp; info@carshare.com
        </Typography>
        <Typography variant="body1" className="footerContact">
          <LocalPhoneIcon /> &nbsp;&nbsp; 03-5652584
        </Typography>
        <Typography variant="body1" className="footerContact">
          <EmailIcon /> &nbsp;&nbsp; Paz towers, Shoham St 5, Ramat Gan
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="h6"
          className="footerContent"
          sx={{ textAlign: "center", marginTop: "1.5em" }}
        >
          Created by Alon Malimsky <br />© All Rights Reserved 2023
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" className="footerHeader">
          Donate To Keep Us Going
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Ha-Poalim bank <br />
          branch: 053 <br />
          Account Number: 58963241
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          <ThumbUpIcon /> &nbsp;&nbsp; THANK YOU!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FooterComponent;
