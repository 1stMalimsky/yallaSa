import {
  Typography,
  Container,
  Box,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyCarCardComponent from "../components/CarCard/MyCarCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OurCarsPage = () => {
  const [myCars, setMyCars] = useState([]);

  const navigate = useNavigate();
  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );
  const payload = useSelector((storePie) => storePie.authSlice);

  useEffect(() => {
    if (!payload.isLoggedIn) {
      navigate("/");
      toast.error("You must be logged in to view this page!");
    } else {
      axios
        .get("/cars/my-cars")
        .then(({ data }) => {
          setMyCars(data);
        })
        .catch((err) => {
          console.log("err from axios", err);
          toast.error("Oops! Couldn't load your cars. Please try again");
        });
    }
  }, []);

  const handleEditBtn = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteBtn = async (id) => {
    try {
      await axios.delete(`/cars/${id}`);
      toast.success("Car Deleted!");
      navigate("/");
    } catch (err) {
      console.log("Delete Error", err);
    }
  };

  const handleAddCar = () => {
    navigate("/addcar/");
  };

  if (!myCars) {
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
                My Cars
              </Typography>
              <Typography variant="body1" className="pageSubtitle">
                Welcome to your garage! Here you will find all the cars you have
                chosen to rent out. Feel free to add, remove or edit your cars.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container className="centerContent">
            <Grid item xs={12} className="centerContent">
              <Button
                variant="contained"
                size="large"
                onClick={handleAddCar}
                sx={{ marginTop: 2, marginBottom: 2 }}
              >
                Add A New Car
              </Button>
            </Grid>
            {/* CAR CARD */}
            {myCars.map((car) => (
              <Grid item xs={9} key={car.title + Date.now()}>
                <MyCarCardComponent
                  id={car._id}
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
                  loggedIn={payload.isLoggedIn}
                  bookedDates={car.bookedDates}
                  isDarkMode={isDarkTheme}
                  editClick={handleEditBtn}
                  deleteClick={handleDeleteBtn}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default OurCarsPage;
