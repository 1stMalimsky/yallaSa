import { useEffect, useState } from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { toast } from "react-toastify";

const EditAcc4 = ({ nextBtn, parentData, caravanId }) => {
  const [inputState, setInputState] = useState({
    parentData,
  });
  const [seats, setSeats] = useState(parentData.numOfseats);
  const [beds, setBeds] = useState(parentData.numOfbeds);
  const [sleepers, setSleepers] = useState(parentData.numOfsleepers);
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (parentData) {
      setSeats(parentData.numOfseats);
      setBeds(parentData.numOfbeds);
      setSleepers(parentData.numOfsleepers);
    }
  }, [parentData]);

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

  const handleNextBtn = async () => {
    console.log("inputState", inputState);

    try {
      const updateData = await axios.patch(`/caravans/${caravanId}`, {
        personCapacity: {
          numOfSeats: inputState.numOfseats,
          numOfBeds: inputState.numOfbeds,
          numOfSleepers: inputState.numOfsleepers,
        },
      });
      console.log("updateData", updateData);

      if (updateData) {
        toast.success("הקרוואן עודכן בהצלחה");
      }
    } catch (err) {
      console.error("Error:", err);
    }
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
          עדכן
        </Button>
      </Box>
    </Box>
  );
};

export default EditAcc4;
