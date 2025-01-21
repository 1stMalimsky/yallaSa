import { useEffect, useState } from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import checkSessionStorage from "../../../utils/helpers/checkSessionStorage.js";

const AddAcc4 = ({ nextBtn }) => {
  const [inputState, setInputState] = useState({
    numOfseats: "",
    numOfbeds: "",
    numOfsleepers: "",
  });
  const [seats, setSeats] = useState(0);
  const [beds, setBeds] = useState(0);
  const [sleepers, setSleepers] = useState(0);
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    const sessionData = JSON.parse(checkSessionStorage(4));
    if (sessionData) {
      console.log("session4", sessionData);
      setSeats(sessionData.numOfseats);
      setBeds(sessionData.numOfbeds);
      setSleepers(sessionData.numOfsleepers);
    }
  }, []);

  useEffect(() => {
    setInputState({
      numOfseats: seats,
      numOfbeds: beds,
      numOfsleepers: sleepers,
    });
    if (!seats || !beds || !sleepers) {
      setDisabledButton(true);
    } else setDisabledButton(false);
  }, [seats, beds, sleepers]);

  const handleNextBtn = () => {
    sessionStorage.setItem("acc4Data", JSON.stringify(inputState));
    nextBtn(inputState, 3);
  };

  const handleAddBtn = (prev, setState) => {
    if (prev >= 10) {
      setState(prev);
    } else setState(prev + 1);
  };
  const handleSubBtn = (prev, setState) => {
    if (prev === 0) {
      setState(prev);
    } else setState(prev - 1);
  };

  return (
    <Box>
      {/* FIRST  BOX */}
      <Box
        className="Acc2Box"
        sx={{
          maxWidth: "md",
          marginBottom: 1,
        }}
      >
        <Box>
          <Typography variant="h6">מספר מושבים עם חגורת בטיחות</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            variant="contained"
            onClick={() => handleAddBtn(seats, setSeats)}
          >
            <AddBoxIcon fontSize="large" color="primary" />
          </IconButton>
          <Typography variant="h6" sx={{ margin: 1 }}>
            {seats}
          </Typography>
          <IconButton onClick={() => handleSubBtn(seats, setSeats)}>
            <IndeterminateCheckBoxIcon fontSize="large" color="primary" />
          </IconButton>
        </Box>
      </Box>

      {/* SECOND BOX */}
      <Box
        className="Acc2Box"
        sx={{
          maxWidth: "md",
        }}
      >
        <Box>
          <Typography variant="h6">מספר מיטות</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            variant="contained"
            onClick={() => handleAddBtn(beds, setBeds)}
          >
            <AddBoxIcon fontSize="large" color="primary" />
          </IconButton>
          <Typography variant="h6" sx={{ margin: 1 }}>
            {beds}
          </Typography>
          <IconButton onClick={() => handleSubBtn(beds, setBeds)}>
            <IndeterminateCheckBoxIcon fontSize="large" color="primary" />
          </IconButton>
        </Box>
      </Box>
      <Box
        className="Acc2Box"
        sx={{
          maxWidth: "md",
        }}
      >
        <Box>
          <Typography variant="h6">מספר לנים</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            variant="contained"
            onClick={() => handleAddBtn(sleepers, setSleepers)}
          >
            <AddBoxIcon fontSize="large" color="primary" />
          </IconButton>
          <Typography variant="h6" sx={{ margin: 1 }}>
            {sleepers}
          </Typography>
          <IconButton onClick={() => handleSubBtn(sleepers, setSleepers)}>
            <IndeterminateCheckBoxIcon fontSize="large" color="primary" />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          disabled={disabledButton}
          onClick={handleNextBtn}
        >
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default AddAcc4;
