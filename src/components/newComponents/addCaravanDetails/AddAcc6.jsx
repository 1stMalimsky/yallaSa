import { useRef, useState } from "react";
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
import acc6ValidationSchema from "./helpers/acc6validation";

const AddAcc6 = ({ nextBtn }) => {
  const [acc6Details, setAccDetails] = useState({
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

  const handleNextBtn = () => {
    const validationResponse = validateInputs(
      acc6ValidationSchema,
      acc6Details.measurements
    );
    if (validationResponse) {
      return;
    }
    nextBtn(acc6Details, 5);
  };

  const handleTick = (e, catagory) => {
    if (!catagory) return console.log("no catagory selected");
    //console.log("checkbox ID", e.target.id);
    //console.log("checkbox checked", e.target.checked);
    const checkedState = e.target.checked;
    const checkBoxId = e.target.id;
    const id = catagory.current.id;

    if (checkedState) {
      setAccDetails((prevData) => {
        const newData = { ...prevData };
        newData[id] = prevData[id]
          ? [...prevData[id], { [checkBoxId]: e.target.name }]
          : [checkBoxId];
        //console.log("newData", newData);

        return newData;
      });
    }
    if (!checkedState) {
      setAccDetails((prevData) => {
        const newData = { ...prevData };
        newData[id] = prevData[id].filter(
          (item) => !Object.keys(item).includes(checkBoxId)
        );
        //console.log("newData", newData);
        return newData;
      });
    }
  };

  const handleMeasurementsChange = (e) => {
    const { id, value } = e.target;
    setAccDetails((prevData) => {
      const newData = { ...prevData };
      newData.measurements[id] = value;
      return newData;
    });
  };

  //console.log("acc6Details", acc6Details);

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
                  value={acc6Details.measurements.key}
                  onChange={handleMeasurementsChange}
                />
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box className="centerElements">
        <Button variant="contained" onClick={handleNextBtn}>
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default AddAcc6;
