import { useState } from "react";
import {
  Alert,
  Card,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Grid,
  Icon,
  Button,
  Box,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Panel4Dialog from "./helpers/Panel4Dialog";

const Panel4 = ({ setExpanded, onSubmit }) => {
  const [inputState, setInputState] = useState({
    insuranceType: null,
    insuranceAmount: "",
  });
  const [isChecked, setIsChecked] = useState(true);

  const handlePanel4Submit = () => {
    if (inputState.insuranceType === null) {
      setIsChecked(false);
      return;
    }
    onSubmit(inputState);
    setExpanded("panel5");
    setIsChecked(true);
  };

  const handlePickInsurance = (e) => {
    setInputState((prevState) => ({
      ...prevState,
      insuranceType: e.target.value,
    }));
  };

  return (
    <div>
      <RadioGroup
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* Basic Plan */}
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label="בסיסי"
                onChange={handlePickInsurance}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    display: "none",
                  },
                }}
              />
              <Typography variant="h6">&nbsp;בסיסי&nbsp;</Typography>
              <Typography variant="subtitle">(כלול במחיר)</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>השתתפות עצמית</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">&#8362;2500</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>שירותי דרך</Typography>
            </Grid>
            <Grid item xs={6}>
              <Icon component={CheckCircleOutlineIcon} color="success" />
            </Grid>
            <Grid item xs={6}>
              <Typography>רכב חלופי</Typography>
            </Grid>
            <Grid item xs={6}>
              <Icon component={CancelOutlinedIcon} color="error" />
            </Grid>
            <Grid item xs={6}>
              <Typography>נהג נוסף</Typography>
            </Grid>
            <Grid item xs={6}>
              <Icon component={CancelOutlinedIcon} color="error" />
            </Grid>
          </Grid>
          <div align="center">
            <Panel4Dialog insuranceType={"basic"} />
          </div>
        </Card>

        {/* Premium Plan */}
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <FormControlLabel
                value="premium"
                control={<Radio />}
                label="פרמיום"
                onChange={handlePickInsurance}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    display: "none",
                  },
                }}
              />
              <Typography variant="h6">&nbsp;פרמיום&nbsp;</Typography>
              <Typography variant="subtitle">X\ללילה</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>השתתפות עצמית</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">&#8362;500</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>שירותי דרך</Typography>
            </Grid>
            <Grid item xs={6}>
              <Icon component={CheckCircleOutlineIcon} color="success" />
            </Grid>
            <Grid item xs={6}>
              <Typography>רכב חלופי</Typography>
            </Grid>
            <Grid item xs={6}>
              <Icon component={CheckCircleOutlineIcon} color="success" />
            </Grid>
            <Grid item xs={6}>
              <Typography>נהג נוסף</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">+3</Typography>
            </Grid>
          </Grid>
          <div align="center">
            <Panel4Dialog insuranceType={"premium"} />
          </div>
        </Card>
      </RadioGroup>
      {!isChecked && <Alert severity="error">אנא בחר סוג ביטוח</Alert>}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePanel4Submit}
          sx={{ align: "center" }}
          disabled={inputState.insuranceType === null}
        >
          הבא
        </Button>
      </Box>
    </div>
  );
};
export default Panel4;
