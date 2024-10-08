import { Container, Typography, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import AboutUsCarCard from "../components/CarCard/AboutUsCarCard";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AboutPage = () => {
  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  return (
    <Container component="main" maxWidth="lg">
      <Box className="aboutUsHeader">
        <Grid container>
          <Grid
            item
            xs={12}
            md={7}
            className={
              isDarkTheme ? "aboutUsHeaderBoxDark" : "aboutUsHeaderBox"
            }
          >
            <Typography component="h1" variant="h2" className="pageTitle">
              About Page
            </Typography>
            <Typography variant="body1" className="pageSubtitle">
              Tired of dealing with scammy rental car dealerships? Looking to
              rent a car from someone you can trust? Someone just like you? Our
              car-sharing app is the solution for you! Rent a car from everyday
              people who are interested in leasing out their cars for a few
              days. No need to deal with insurance or scratch fees. The
              following will explain more about our website and how it works for
              you. We hope you will enjoy. Ride on!
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container className="aboutPageGridContainer">
          <Grid item xs={12} md={7}>
            <Box className="aboutUsDarkTab">
              <Typography className="aboutSmTitle">Register</Typography>
              <Typography className="aboutTxt">
                To unlock all of the posibilites of this app, consider
                registering. Only registered users can like cars, add their own
                cars and start making money.
              </Typography>
            </Box>
            <br />
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "underline",
              }}
            >
              Like&nbsp;
              <FavoriteIcon />
            </Typography>
            <Typography className="aboutTxt">
              Registered users can like cars they find interesting. Once you've
              like a car, it will appear in you "liked cars" page.
            </Typography>
            <br />
            <Box className="aboutUsDarkTab">
              <Typography variant="h6" className="aboutSmTitle">
                Rent a car
              </Typography>
              <Typography className="aboutTxt">
                Check out our collection of cars and find the perfect match for
                you! To find a car, input your deseired rental dates and we'll
                show you everything we have to offer. Payment is made directly
                with the car owner and is not proccesed through us.
              </Typography>
            </Box>
            <br />
            <Typography variant="h6" className="aboutSmTitle">
              Add a new car
            </Typography>
            <Typography className="aboutTxt">
              Add your car to our collection of cars and start making money off
              car rentals. You must be a registered user!
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <AboutUsCarCard
              id="1"
              title="Example Car Card"
              description="This is where you would put a short description of your car"
              url="https://www.cnet.com/a/img/resize/72297655e52619979292b934fc2f7156352fe998/hub/2010/11/24/230e674b-cbf2-11e2-9a4a-0291187b029a/orig-large6.jpg?auto=webp&fit=crop&height=1200&width=1200"
              alt="example card"
              carType="Sedan"
              carModel="Toyota Auris"
              city="Tel Aviv"
              street="Kaplan St"
              houseNumber="15"
              phone="0500000000"
              price="250"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
