import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Grid,
  Card,
  Typography,
  Button,
} from "@mui/material";
import RedirectNumbers from "../../components/newComponents/RedirectNumbers";
import RedierctReasons from "../../components/newComponents/RedirectReasons";
import { logDOM } from "@testing-library/react";

const BecomeOwnerRedirect = () => {
  /*  console.log("iconNumbers", iconNumbers); */

  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    location: "",
    vehicleType: "",
  });
  const [startBtn, setStartBtn] = useState(true);

  const handleInputChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!inputState.location || !inputState.vehicleType) {
      setStartBtn(true);
    } else {
      setStartBtn(false);
    }
  }, [inputState]);
  //console.log("inputState", inputState);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: "smooth", // Smooth scrolling
    });
  };

  const onAddCaravanClick = (location, vehicleType) => {
    console.log("location+vetype", location, vehicleType);

    navigate(`/addcaravan/${location}/${vehicleType}`);
  };

  return (
    <Box>
      <Box className="becomeOwnerBox">
        <Card className="becomeOwnerCard">
          <Typography variant="h4" gutterBottom>
            הפכו לבעלי קרוואן
          </Typography>
          <Typography variant="h6" gutterBottom>
            יש לכם קרוואן? רוצים לשווק אותו ללא עלות? מוזמנים להירשם ולהתחיל
            להרוויח
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl className="formControlBecome">
              <InputLabel className="selectInputBecome" id="location">
                מיקום הקרוואן
              </InputLabel>
              <Select
                className="select"
                id="carLocation"
                name="location"
                labelId="location"
                value={inputState.location}
                onChange={handleInputChange}
              >
                <MenuItem value={10}>צפון</MenuItem>
                <MenuItem value={20}>מרכז</MenuItem>
                <MenuItem value={30}>דרום</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="formControlBecome">
              <InputLabel className="selectInputBecome" id="type">
                סוג הרכב
              </InputLabel>
              <Select
                className="select"
                id="carType"
                name="vehicleType"
                labelId="type"
                value={inputState.vehicleType}
                onChange={handleInputChange}
              >
                <MenuItem className="select" value={10}>
                  קרוואן נגרר
                </MenuItem>
                <MenuItem className="select" value={20}>
                  קרוואן נוסע
                </MenuItem>
                <MenuItem className="select" value={30}>
                  רכב מוסב לקרוואן
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography variant="h6" gutterBottom>
            הוסיפו את הקרוואן שלכם והרוויחו אלפי שקלים כל חודש!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={startBtn}
            onClick={() =>
              onAddCaravanClick(inputState.location, inputState.vehicleType)
            }
          >
            בואו נתחיל
          </Button>
        </Card>
      </Box>
      <Box>
        <Box>
          <Typography variant="h4" sx={{ marginTop: 1, marginBottom: 3 }}>
            תהליך הרשמה קל ומהיר
          </Typography>
          <RedirectNumbers />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
              marginBottom: 5,
            }}
          >
            <Button
              variant="contained"
              sx={{ width: { xs: "80%", md: "60%", lg: "20%" } }}
              onClick={scrollToTop}
            >
              <Typography variant="h5">להרשמה</Typography>
            </Button>
          </Box>
          <RedierctReasons />
        </Box>
      </Box>
    </Box>
  );
};

export default BecomeOwnerRedirect;
