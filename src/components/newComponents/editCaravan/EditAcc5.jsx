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
} from "../addCaravanDetails/helpers/acc6facilitiesList.js";
import { validateInputs } from "../../../validation/validation.js";
import acc5ValidationSchema from "../addCaravanDetails/helpers/acc5validation";
import normalizeFacilities from "./helpers/normalizeFacilities.js";
import axios from "axios";
import normalizeForServer from "./helpers/acc5NormalizeForServer.js";
import { toast } from "react-toastify";

const EditAcc5 = ({ nextBtn, parentData, caravanId }) => {
  const [acc5Details, setAccDetails] = useState({
    kitchen: parentData.kitchen || [],
    bathroom: parentData.bathroom || [],
    safety: parentData.safety || [],
    comfort: parentData.comfort || [],
    measurements: parentData.measurements || {},
  });

  const kitchenRef = useRef(null);
  const bathroomRef = useRef(null);
  const safetyRef = useRef(null);
  const comfortRef = useRef(null);
  console.log("acc5ParentDataa", parentData);

  useEffect(() => {
    setAccDetails(parentData);
  }, [parentData]);

  const handleNextBtn = async () => {
    const validationResponse = validateInputs(
      acc5ValidationSchema,
      acc5Details.measurements
    );
    if (validationResponse) {
      return;
    }

    try {
      const normalizedData = normalizeForServer(acc5Details);
      console.log("normalizedData", normalizedData);

      const updatedData = await axios.patch(
        `/caravans/${caravanId}`,
        normalizedData
      );
      if (updatedData) {
        console.log("updatedData", updatedData);
        toast.success("הקרוואן עודכן בהצלחה");
      }
    } catch (err) {
      console.error("Error:", err);
    }

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
      const newData = { ...prevData };
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

  console.log("acc5Details", acc5Details);
  //console.log("parentData", parentData);

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
        <Button variant="contained" onClick={handleNextBtn}>
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default EditAcc5;
