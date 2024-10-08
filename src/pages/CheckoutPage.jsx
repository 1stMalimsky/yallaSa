import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExtrasBtn from "../components/EXtrasBtn";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import CheckoutCard from "../components/CheckoutCard/CheckoutCard";
import axios from "axios";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const params = useParams();
  const [inputState, setInputState] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const [extrasCount, setExtrasCount] = useState(0);
  const navigate = useNavigate();
  const isloggedIn = useSelector((storePie) => storePie.authSlice.isLoggedIn);

  useEffect(() => {
    axios
      .get("/cars/" + params.id)
      .then(({ data }) => {
        setInputState(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
      });
  }, []);

  useEffect(() => {
    if (!inputState) {
      return;
    }
    const total = inputState.price * params.numOfDays;
    setTotalPrice(total);
  }, [inputState]);

  const likeClick = async (id) => {
    try {
      await axios.patch(`/cars/like/${id}/`);
    } catch (err) {
      console.log("like update error", err);
    }
  };
  const rentBtnClick = (id) => {
    navigate(
      `/finalize/${id}/${extrasCount}/${params.start}/${params.end}/${params.numOfDays}`
    );
  };

  const handleExtraClick = (text, clicked) => {
    const totalInsurance = params.numOfDays * 25;
    const totalSeat = params.numOfDays * 15;
    const totalAdd = params.numOfDays * 30;
    if (clicked) {
      switch (text) {
        case "Insurance":
          setTotalPrice((prevPrice) => prevPrice - totalInsurance);
          setExtrasCount((prevState) => prevState - 1);
          break;
        case "Infant Seat":
          setTotalPrice((prevPrice) => prevPrice - totalSeat);
          setExtrasCount((prevState) => prevState - 2);
          break;
        case "Additional Driver":
          setTotalPrice((prevPrice) => prevPrice - totalAdd);
          setExtrasCount((prevState) => prevState - 4);
          break;
        default:
          setTotalPrice(totalPrice);
      }
    } else {
      switch (text) {
        case "Insurance":
          setTotalPrice((prevPrice) => prevPrice + totalInsurance);
          setExtrasCount((prevState) => prevState + 1);
          break;
        case "Infant Seat":
          setTotalPrice((prevPrice) => prevPrice + totalSeat);
          setExtrasCount((prevState) => prevState + 2);
          break;
        case "Additional Driver":
          setTotalPrice((prevPrice) => prevPrice + totalAdd);
          setExtrasCount((prevState) => prevState + 4);
          break;
        default:
          setTotalPrice(totalPrice);
      }
    }
  };

  if (!inputState || !totalPrice) {
    return <CircularProgress />;
  }
  return (
    <Container>
      <Grid container>
        {/* SideBar */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h5">Add Extras</Typography>
          <ExtrasBtn text="Insurance" onClick={handleExtraClick} />
          <ExtrasBtn text="Infant Seat" onClick={handleExtraClick} />
          <ExtrasBtn text="Additional Driver" onClick={handleExtraClick} />
        </Grid>
        {/* Main */}
        <Grid item xs={12} sm={9}>
          <CheckoutCard
            id={inputState._id}
            user_id={inputState.user_id}
            title={inputState.title}
            description={inputState.description}
            url={inputState.image.url}
            alt={inputState.image.alt}
            carType={inputState.carType}
            carModel={inputState.address.carModel}
            city={inputState.address.city}
            street={inputState.address.street}
            houseNumber={inputState.address.houseNumber}
            phone={inputState.phone}
            price={inputState.price}
            totalPrice={totalPrice}
            loggedIn={isloggedIn}
            handleLikeClick={likeClick}
            handleCheckOutClick={rentBtnClick}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
