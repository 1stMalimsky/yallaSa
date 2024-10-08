import {
  CircularProgress,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FinalizeCarCard from "../components/CarCard/FinalizeCarCard";
import calcTotalPrice from "../utils/totalPriceCalc";
import axios from "axios";
import { toast } from "react-toastify";
import finalizeInputs from "../utils/finalizeInputs";
import validateBooking from "../validation/bookingValidation";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [chosenCar, setChosenCar] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [chosenDates, setChosenDates] = useState({ start: "", end: "" });
  const [inputState, setInputState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((storePie) => storePie.authSlice);

  useEffect(() => {
    axios
      .get("/cars/" + params.id)
      .then(({ data }) => {
        setChosenCar(data);
      })
      .catch((err) => {
        console.log("find car axios err", err);
      });
    setChosenDates({
      start: params.start,
      end: params.end,
    });
  }, []);

  useEffect(() => {
    if (!chosenCar) {
      return;
    } else calcTotalPrice(params, chosenCar, setTotalPrice);
  }, [chosenCar]);

  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    } else {
      axios
        .get("/user/" + user.payload.userId)
        .then(({ data }) => {
          setCurrentUser(data);
          const {
            name: { firstName, lastName },
            email,
            phone,
          } = data;
          const newInputState = {
            firstName,
            lastName,
            email,
            phone,
          };
          setInputState(newInputState);
        })
        .catch((err) => {
          console.log("payment page axios err", err);
        });
    }
  }, []);

  const likeClick = async (id) => {
    try {
      await axios.patch(`/cars/like/${id}/`);
    } catch (err) {
      console.log("like update error", err);
    }
  };

  const finalize = async () => {
    try {
      const joiResponse = validateBooking(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      const datesToSend = {
        start: +chosenDates.start,
        end: +chosenDates.end,
      };
      await axios.put("/cars/book/" + params.id, datesToSend);
      toast.success(
        "Your Car Has Been Reserved! \n Please contact the owner to settle payment"
      );
      navigate("/");
    } catch (err) {
      toast.error("Unexpoected error occured");
      console.log("finalize error", err);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  if (!chosenCar) {
    return <CircularProgress />;
  }
  return (
    <Grid container gap={2} sx={{ display: "flex" }}>
      <Grid item xs={12} sm={8}>
        <Grid container>
          <Typography variant="h3">Let's Finalize your reservation!</Typography>
          <Typography variant="body1">
            First of all, let's make sure your details are correct. If you are
            logged in, please make sure your details are correct. If you are not
            logged in, please fill out the form below.
          </Typography>
        </Grid>
        <Grid container gap={1}>
          {finalizeInputs.map((item) => (
            <Grid
              item
              xs={12}
              sm={5}
              lg={4}
              key={item.inputName + "finalizePage"}
            >
              <TextField
                label={item.inputName}
                required
                value={inputState[item.stateName]}
                id={item.stateName}
                onChange={handleInputChange}
                className="textFieldContainer"
                fullWidth
              />
              {inputsErrorsState && inputsErrorsState[item.stateName] && (
                <Alert severity="warning">
                  {inputsErrorsState[item.stateName].map((err) => (
                    <div key={item.stateName + err}>{err}</div>
                  ))}
                </Alert>
              )}
            </Grid>
          ))}
          <Grid item xs={12} className="finalizeBtn">
            <Button size="large" variant="contained" onClick={finalize}>
              FINALIZE
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {
        <Grid item xs={12} sm={3}>
          <FinalizeCarCard
            id={chosenCar._id}
            user_id={chosenCar.user_id}
            title={chosenCar.title}
            description={chosenCar.description}
            url={chosenCar.image.url}
            alt={chosenCar.image.alt}
            carType={chosenCar.carType}
            carModel={chosenCar.address.carModel}
            city={chosenCar.address.city}
            street={chosenCar.address.street}
            houseNumber={chosenCar.address.houseNumber}
            phone={chosenCar.phone}
            price={chosenCar.price}
            totalPrice={totalPrice}
            loggedIn={user && user.isLoggedIn}
            handleLikeClick={likeClick}
          />
        </Grid>
      }
    </Grid>
  );
};

export default PaymentPage;
