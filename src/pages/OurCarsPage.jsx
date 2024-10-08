import {
  Typography,
  Container,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SortComponent from "../components/SortComponent";
import SortViewComponent from "../components/SortViewComponent";
import CarCardComponent from "../components/CarCard/CarCard";
import CarCardListView from "../components/CarCard/CarCardListView";
import useSort from "../hooks/useSort";
import axios from "axios";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";

const OurCarsPage = () => {
  const [sortPick, setSortPick] = useState("");
  const [sortView, setSortView] = useState("");
  const [originalCars, setOriginalCars] = useState(null);
  const [cars, setCars] = useState([]);
  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const thisUser = useSelector((storePie) => storePie.authSlice) || null;

  useEffect(() => {
    axios
      .get("/cars/")
      .then(({ data }) => {
        setCars(data.allCars);
        filterFunc(data.allCars);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops! Couldn't load your cards. Please try again");
      });
  }, []);

  const filterFunc = (data) => {
    if (!originalCars && !data) {
      return;
    }
    let arrToSearch = originalCars || data;
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCars && data) {
      setOriginalCars(data);
      let searchResult = arrToSearch.filter(
        (car) =>
          car.title.toLowerCase().startsWith(filter.toLowerCase()) ||
          car.carType.toLowerCase().startsWith(filter.toLowerCase())
      );
      setCars(searchResult);
      return;
    }
    if (originalCars) {
      let newOriginalCars = JSON.parse(JSON.stringify(originalCars));
      let searchResult = newOriginalCars.filter(
        (car) =>
          car.title.toLowerCase().startsWith(filter.toLowerCase()) ||
          car.carType.toLowerCase().startsWith(filter.toLowerCase())
      );
      setCars(searchResult);
    }
  };

  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const sortBtnClick = (value) => {
    setSortPick(value);
  };
  useSort(sortPick, setCars, cars, sortBtnClick);

  const handleSortView = (value) => {
    setSortView(value);
  };
  const rentBtnClick = () => {
    toast.success("Please pick dates to see if the car you chose is available");
    navigate("/");
  };

  const likeClick = async (id) => {
    try {
      console.log("like clicked");
      await axios.patch(`/cars/like/${id}`);
    } catch (err) {
      console.log("like update error", err);
    }
  };

  const handleDelete = () => {
    console.log("This is a fake function");
  };

  if (!cars.length === 0) {
    <CircularProgress />;
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
                Our Cars
              </Typography>
              <Typography variant="body1" className="pageSubtitle">
                Interested in browsing our cars? Take a look at our fleet of
                individually owned cars. You can use the side bar to sort the
                cars. Happy huntin'.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex" }}>
          {/* SIDE MENU */}
          <Grid container className="ourCarsSideGridContainer">
            <Grid
              item
              xs={2}
              className="ourCarsSideGridItem"
              sx={{ display: cars.length === 0 ? "none" : "block" }}
            >
              <SortComponent onSortClick={sortBtnClick} />
              <SortViewComponent onSortClick={handleSortView} />
            </Grid>
            {/* CAR CARD */}
            <Grid item xs={12} sm={10}>
              {cars.map((car) => (
                <Grid
                  item
                  xs={12}
                  className="cardGridItem"
                  key={car.title + Date.now()}
                >
                  {sortView == "List" ? (
                    <CarCardListView
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
                      isAdmin={false}
                      adminControls={false}
                      handleCheckOutClick={rentBtnClick}
                      handleLikeClick={likeClick}
                      handleDelete={handleDelete}
                      isDarkMode={isDarkTheme}
                      isLiked={
                        thisUser.payload !== null
                          ? car.likes.includes(thisUser.payload.userId)
                            ? true
                            : false
                          : false
                      }
                    />
                  ) : (
                    <CarCardComponent
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
                      loggedIn={thisUser.isLoggedIn || false}
                      handleCheckOutClick={rentBtnClick}
                      handleLikeClick={likeClick}
                      isLiked={
                        thisUser.payload !== null
                          ? car.likes.includes(thisUser.payload.userId)
                            ? true
                            : false
                          : false
                      }
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default OurCarsPage;
