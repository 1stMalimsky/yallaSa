import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";

const AddAcc2 = ({ nextBtn }) => {
  const [inputState, setInputState] = useState({
    numOfseats: "",
    numOfbeds: "",
    numOfsleepers: "",
  });

  const [seats, setSeats] = useState(0);
  const [beds, setBeds] = useState(0);
  const [sleepers, setSleepers] = useState(0);

  useEffect(() => {
    setInputState({
      numOfseats: seats,
      numOfbeds: beds,
      numOfsleepers: sleepers,
    });
  }, [seats, beds, sleepers]);

  const handleNextBtn = () => {
    nextBtn(inputState, 1);
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
    <Accordion>
      <AccordionSummary>
        <Typography variant="h5">פרטי הלנה</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
          <Button variant="contained" onClick={handleNextBtn}>
            הבא
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddAcc2;
