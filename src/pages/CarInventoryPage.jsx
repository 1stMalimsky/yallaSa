import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SortComponent from "../components/SortComponent";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import CarCardComponent from "../components/CarCard/CarCard";
import useSort from "../hooks/useSort";
import { useSelector } from "react-redux";
import DatePicker from "../components/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import moment from "moment/moment";

const CarInv = () => {
  const params = useParams();
  const [sortPick, setSortPick] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [chosenDates, setChosenDates] = useState({
    startDate: +params.start,
    endDate: +params.end,
  });
  const [noCars, setNoCars] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date();
  const thisUser = useSelector((storePie) => storePie.authSlice);

  const carSearch = async () => {
    try {
      const filteredCars = await axios.get(
        `/cars/${params.start}/${params.end}`
      );
      setFilteredCars(filteredCars.data);
      setNoCars(filteredCars.data.length === 0);
    } catch (err) {
      console.log("carSearch err", err);
    }
  };
  const calculateDays = (dates) => {
    const date1 = moment(Number(dates.start));
    const date2 = moment(Number(dates.end));
    return date2.diff(date1, "days");
  };

  useEffect(() => {
    carSearch(params);
  }, [params]);

  useEffect(() => {
    let timeoutId;
    if (filteredCars.length === 0) {
      setNoCars(true);

      timeoutId = setTimeout(() => {
        setNoCars(false);
        initiateToastAndNavigate();
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [filteredCars]);

  const initiateToastAndNavigate = () => {
    toast.error("no cars found");
    navigate(ROUTES.HOME);
  };

  const handleDateChange = (dateText, newDate) => {
    if (newDate == null) {
      return;
    }
    setChosenDates((prevDates) => ({
      ...prevDates,
      [dateText]: newDate.$d.getTime(),
    }));
  };

  const handleSearchClick = () => {
    const adjustedCurrentDate = currentDate.setHours(0, 0, 0, 0);
    if (
      isNaN(chosenDates.startDate) ||
      isNaN(chosenDates.endDate) ||
      chosenDates.startDate < adjustedCurrentDate ||
      chosenDates.endDate < adjustedCurrentDate ||
      chosenDates.startDate >= chosenDates.endDate
    ) {
      return toast.error("Please enter valid dates!");
    }
    navigate(`/car-inv/${chosenDates.startDate}/${chosenDates.endDate}`);
  };

  const sortBtnClick = (value) => {
    setSortPick(value);
  };
  useSort(sortPick, setFilteredCars, filteredCars, sortBtnClick);

  const likeClick = async (id) => {
    try {
      await axios.patch(`/cars/like/${id}/`);
    } catch (err) {
      console.log("like update error", err);
    }
  };

  const rentBtnClick = (id) => {
    const numOfDays = calculateDays(params);
    navigate(`/checkout/${id}/${params.start}/${params.end}/${numOfDays}`);
  };

  return (
    <Box>
      <div>{noCars && <CircularProgress />}</div>
      <Grid container sx={{ display: noCars ? "none" : "flex" }}>
        {/* HEADER */}
        <Grid item xs={12} className="headerGridItem"></Grid>
        {/* SIDE MENU */}
        <Grid item xs={3} sx={{ display: { xs: "none", md: "block" } }}>
          <div className="sideGridItem">
            <SortComponent onSortClick={sortBtnClick} />
          </div>
          <div className="sideGridItem">
            <DatePicker
              dateText="Pickup Date"
              onChange={(newDate) => handleDateChange("startDate", newDate)}
              value={params.start}
            />
            <DatePicker
              dateText="Return Date"
              onChange={(newDate) => handleDateChange("endDate", newDate)}
              value={params.end}
            />
            <Button variant="contained" onClick={handleSearchClick}>
              Search
            </Button>
          </div>
        </Grid>
        {/* CAR CARD */}
        {filteredCars.map((car) => (
          <Grid
            item
            xs={12}
            md={9}
            className="cardGridItem"
            key={car.title + Date.now()}
          >
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
              loggedIn={thisUser.isLoggedIn || ""}
              handleCheckOutClick={rentBtnClick}
              isLiked={
                thisUser.payload
                  ? car.likes.includes(thisUser.payload.userId)
                    ? true
                    : false
                  : ""
              }
              handleLikeClick={likeClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CarInv;
