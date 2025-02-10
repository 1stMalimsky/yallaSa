import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import {
  kitchenList,
  bathroomList,
  livingList,
  safetyList,
  physicalList,
} from "./helpers/acc6facilitiesList";
import { validateInputs } from "../../../validation/validation";
import acc5ValidationSchema from "./helpers/acc5validation";
import checkSessionStorage from "../../../utils/helpers/checkSessionStorage.js";
import ExtrasPickerComponent from "./helpers/ExtrasPickerCompenent.jsx";

const AddAcc5 = ({ nextBtn, extrasFunc }) => {
  const [acc5Details, setAccDetails] = useState({
    kitchen: [],
    bathroom: [],
    safety: [],
    comfort: [],
    measurements: {
      weight: "",
      length: "",
      width: "",
      licenseClass: "",
      minimumAge: "",
    },
  });

  const kitchenRef = useRef(null);
  const bathroomRef = useRef(null);
  const safetyRef = useRef(null);
  const comfortRef = useRef(null);

  useEffect(() => {
    const sessionData = JSON.parse(checkSessionStorage(5));
    if (sessionData) {
      setAccDetails(sessionData);
    }
  }, []);

  const handleNextBtn = () => {
    const validationResponse = validateInputs(
      acc5ValidationSchema,
      acc5Details.measurements
    );
    if (validationResponse) {
      return;
    }
    sessionStorage.setItem("acc5Data", JSON.stringify(acc5Details));
    nextBtn(acc5Details, 4);
  };

  const handleTick = (e, categoryRef) => {
    if (!categoryRef) {
      console.log("No category selected");
      return;
    }

    const { checked, id: checkBoxId, name } = e.target;
    const category = categoryRef.current.id;

    setAccDetails((prevData) => {
      // Copy previous data
      const newData = { ...prevData };
      // Handle the current category based on its existing data in state
      const currentCategory = newData[category] ?? [];

      if (checked) {
        // Add the new item if it's not already included
        const newItem = { [checkBoxId]: name };
        newData[category] = [...currentCategory, newItem];
      } else {
        // Remove the item if unchecked
        newData[category] = currentCategory.filter(
          (item) => !Object.keys(item).includes(checkBoxId)
        );
      }

      return newData;
    });
  };

  const handleMeasurementsChange = (e) => {
    const { id, value } = e.target;
    setAccDetails((prevData) => {
      const newData = { ...prevData };
      newData.measurements[id] = value;
      return newData;
    });
  };

  //console.log("acc5Details", acc5Details);

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingRight: 1, marginBottom: 1 }}>
            יש לסמן את התיבות הקיימות בקרוואן
          </Typography>
        </Grid>
        <Grid className="groupGrid" item xs={12}>
          <Typography variant="h6" sx={{ paddingRight: 2, marginBottom: 1 }}>
            מטבח:
          </Typography>
          <FormGroup className="acc6FormGroup" ref={kitchenRef} id="kitchen">
            {Object.entries(kitchenList).map(([key, value]) => (
              <Grid key={key} item xs={6} sm={4} md={2} lg={2}>
                <FormControlLabel
                  name={value}
                  key={key}
                  control={<Checkbox id={key} />}
                  label={value}
                  checked={acc5Details.kitchen.some((item) =>
                    Object.keys(item).includes(key)
                  )}
                  onClick={(e) => {
                    handleTick(e, kitchenRef);
                  }}
                />
              </Grid>
            ))}
          </FormGroup>
        </Grid>
        <Grid className="groupGrid" item xs={12}>
          <Typography variant="h6" sx={{ paddingRight: 2, marginBottom: 1 }}>
            שירותים\מקלחת:
          </Typography>
          <FormGroup className="acc6FormGroup" ref={bathroomRef} id="bathroom">
            {Object.entries(bathroomList).map(([key, value]) => (
              <Grid key={key} item xs={6} sm={4} md={2} lg={2}>
                <FormControlLabel
                  name={value}
                  key={key}
                  control={<Checkbox id={key} />}
                  label={value}
                  checked={acc5Details.bathroom.some((item) =>
                    Object.keys(item).includes(key)
                  )}
                  onClick={(e) => {
                    handleTick(e, bathroomRef);
                  }}
                />
              </Grid>
            ))}
          </FormGroup>
        </Grid>
        <Grid className="groupGrid" item xs={12}>
          <Typography variant="h6" sx={{ paddingRight: 2, marginBottom: 1 }}>
            אביזרי רכב:
          </Typography>
          <FormGroup className="acc6FormGroup" ref={safetyRef} id="safety">
            {Object.entries(safetyList).map(([key, value]) => (
              <Grid key={key} item xs={6} sm={4} md={2}>
                <FormControlLabel
                  name={value}
                  key={key}
                  control={<Checkbox id={key} />}
                  label={value}
                  checked={acc5Details.safety.some((item) =>
                    Object.keys(item).includes(key)
                  )}
                  onClick={(e) => {
                    handleTick(e, safetyRef);
                  }}
                />
              </Grid>
            ))}
          </FormGroup>
        </Grid>
        <Grid className="groupGrid" item xs={12}>
          <Typography variant="h6" sx={{ paddingRight: 2, marginBottom: 1 }}>
            אביזרי קרוואן:
          </Typography>
          <FormGroup className="acc6FormGroup" ref={comfortRef} id="comfort">
            {Object.entries(livingList).map(([key, value]) => (
              <Grid key={key} item xs={6} sm={4} md={2}>
                <FormControlLabel
                  name={value}
                  key={key}
                  control={<Checkbox id={key} />}
                  label={value}
                  checked={acc5Details.comfort.some((item) =>
                    Object.keys(item).includes(key)
                  )}
                  onClick={(e) => {
                    handleTick(e, comfortRef);
                  }}
                />
              </Grid>
            ))}
          </FormGroup>
        </Grid>
        <Grid className="groupGrid" item xs={12}>
          <Typography variant="h6" sx={{ paddingRight: 2, marginBottom: 1 }}>
            מידות הקרוואן:
          </Typography>
          <Box className="acc6FormGroup">
            {Object.entries(physicalList).map(([key, value]) => (
              <Grid key={key} item xs={6} sm={4} md={2} sx={{ marginRight: 2 }}>
                <Typography
                  key={`${key},${value}`}
                  variant="subtitle1"
                  sx={{ paddingRight: 2 }}
                >
                  {value}:
                </Typography>
                <TextField
                  id={key}
                  className="addCarTextFiled"
                  key={key}
                  value={acc5Details.measurements[key] || ""}
                  onChange={handleMeasurementsChange}
                />
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box className="centerElements">
        <ExtrasPickerComponent extrasUpdate={extrasFunc} />
        <Button variant="contained" onClick={handleNextBtn} sx={{ mr: 2 }}>
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default AddAcc5;
