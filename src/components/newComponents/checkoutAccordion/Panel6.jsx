import { useState } from "react";
import {
  Alert,
  Card,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";

const Panel6 = ({ setExpanded, onSubmit }) => {
  const [inputState, setInputState] = useState({
    policyChoice: null,
    pricePerNight: 0,
  });

  const handlePickCancelation = (e) => {
    setInputState((prevState) => ({
      ...prevState,
      policyChoice: e.target.value,
      pricePerNight: 10,
    }));
  };
  const handlePanel6Submit = () => {
    if (inputState.policyChoice === null) {
      return;
    }
    if (inputState.policyChoice === "flexible") {
      setInputState((prevState) => ({
        ...prevState,
        pricePerNight: "10",
      }));
    }

    onSubmit(inputState);
    setExpanded("panel7");
  };

  return (
    <div>
      <RadioGroup>
        {/* Basic Plan */}
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Grid container>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label="בסיסי"
                onChange={handlePickCancelation}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    display: "none",
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <Typography variant="h6">&nbsp;בסיסי&nbsp;</Typography>
                <Typography variant="subtitle" color="green">
                  כלול במחיר
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">
                - המבטלים 48 שעות לפני ההזמנה יקבלו %10 מסך הההזמנה שלהם חזרה. -
                המבטלים ביום ההזמנה לא מקבלים כסף בחזרה
              </Typography>
            </Grid>
          </Grid>
        </Card>
        {/* Flexible Plan */}
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <FormControlLabel
                value="flexible"
                control={<Radio />}
                label="גמיש"
                onChange={handlePickCancelation}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    display: "none",
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <Typography variant="h6">&nbsp;גמיש&nbsp;</Typography>
                <Typography variant="subtitle" color="green">
                  &#8362;10 \ לילה
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">
                - המבטלים שבועייים לפני ההמזנה יקבלו %100 החזר.
                <br /> - המבטלים בין שבועיים לשבוע יקבלו %50 מכספם חזרה
                <br /> - המבטלים בין שבוע ליום ההשמנה יקבלו %25 מכספם חזרה
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </RadioGroup>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button
          disabled={inputState.policyChoice === null}
          variant="contained"
          color="primary"
          onClick={handlePanel6Submit}
          sx={{ align: "center" }}
        >
          הבא
        </Button>
      </Box>
    </div>
  );
};

export default Panel6;
