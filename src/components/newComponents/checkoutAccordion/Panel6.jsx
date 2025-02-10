import { Fragment, useState } from "react";
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
import { toast } from "react-toastify";

const Panel6 = ({ setExpanded, onSubmit, caravanDetails }) => {
  const [inputState, setInputState] = useState({
    policyChoice: "basic",
    pricePerNight: 0,
  });
  //console.log("caravanDetails", caravanDetails);

  const [cancelationPolicy, setCancelationPolicy] = useState(
    caravanDetails.cancelationPolicy
  );
  const handlePickCancelation = (e) => {
    setInputState({ policyChoice: e.target.value });
  };

  const handlePanel6Submit = () => {
    if (inputState.policyChoice === null) {
      toast.error("בחר תנאי ביטול");
      return;
    }
    if (inputState.policyChoice === "flexible") {
      setInputState((prevState) => ({
        ...prevState,
        pricePerNight: "75",
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
            {cancelationPolicy.isCancelationPolicy && (
              <Fragment>
                <Grid item xs={12} display={"flex"} alignItems={"center"}>
                  <FormControlLabel
                    value="basic"
                    checked={inputState.policyChoice === "basic" ? true : false}
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
                    - המבטלים {cancelationPolicy.freeCancelWindow} ימים לפני
                    ההזמנה יקבלו החזר מלא.
                    <br /> - המבטלים שלא במסגרת תנאי הביטול ישלמו{" "}
                    {cancelationPolicy.cancelationFeePercent} אחוז מסך ההזמנה
                  </Typography>
                </Grid>
              </Fragment>
            )}
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
                  {cancelationPolicy.cancelationFeePercent}₪
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle">
                - המבטלים שבועייים לפני ההזמנה יקבלו %100 החזר.
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
