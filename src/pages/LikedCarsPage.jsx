import {
  CircularProgress,
  Container,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LikedCarCardsComponent from "../components/CarCard/CarCard";

const LikedCarsPage = () => {
  const [likedCars, setLikedCars] = useState("");

  useEffect(() => {
    axios
      .get("/cars/")
      .then(({ data }) => {
        const filteredData = data.allCars.filter((car) =>
          car.likes.includes(currentUser.payload.userId)
        );
        setLikedCars(filteredData);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops! Couldn't load your cars. Please try again");
      });
  }, []);

  const currentUser = useSelector((storePie) => storePie.authSlice);
  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  const likeClick = async (id) => {
    try {
      await axios.patch(`/cars/like/${id}`);
    } catch (err) {
      console.log("like update error", err);
    }
  };

  if (!likedCars || !currentUser) {
    return <CircularProgress />;
  }

  return (
    <Container component="main" maxWidth="lg">
      <Box className="registerBox">
        <Box className="ourCarsHeaderBigBox">
          <Grid container>
            <Grid
              item
              xs={12}
              md={7}
              className={isDarkTheme ? "HeaderBoxDark" : "ourCarsHeaderBox"}
            >
              <Typography component="h1" variant="h2" className="pageTitle">
                Liked Cars
              </Typography>
              <Typography variant="body1" className="pageSubtitle">
                Welcome to your liked car page! Here you will find all the cars
                you have liked. If you wish you may unlike the cars.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container className="centerContent">
            {likedCars.length === 0 ? (
              <Typography variant="h5">
                You haven't liked any cars yet
              </Typography>
            ) : (
              likedCars.map((car) => (
                <Grid item xs={9} key={car.title + Date.now()}>
                  <LikedCarCardsComponent
                    id={car._id}
                    user_id={car.user_id}
                    title={car.title}
                    description={car.description}
                    url={car.image.url}
                    alt={car.image.alt}
                    carType={car.carType}
                    carModel={car.carModel}
                    city={car.address.city}
                    street={car.address.street}
                    houseNumber={car.address.houseNumber}
                    phone={car.phone}
                    price={car.price}
                    loggedIn={currentUser.isLoggedIn || false}
                    handleLikeClick={likeClick}
                    isLiked={
                      currentUser.payload !== null
                        ? car.likes.includes(currentUser.payload.userId)
                          ? true
                          : false
                        : false
                    }
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LikedCarsPage;
