import { Box, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { fontSize } from "@mui/system";
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const ResResultItem = ({ resArr }) => {
  const navigate = useNavigate();
  const [resArray, setResArray] = useState(resArr);

  useEffect(() => {
    setResArray(resArr);
  }, [resArr]);

  if (!resArr) return <CircularProgress />;

  return (
    <Box>
      {resArr.length === 0 && (
        <Typography variant="h5">לא נמצאו הזמנות</Typography>
      )}
      {resArr.map((item) => (
        <Grid
          container
          className="elevated"
          key={item._id}
          spacing={1}
          sx={{ margin: 1 }}
        >
          <Grid item xs={4}>
            <Typography variant="h6">{item.userName}</Typography>
            <Typography variant="subtitle1">
              שם הפריט: {item.listingName}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.8em" }}>
              מזהה הזמנה:
              <br />
              {item._id}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              {dayjs.unix(item.dates.start).format("MMMM D, YYYY")} -{" "}
              {dayjs.unix(item.dates.end).format("MMMM D, YYYY")}
            </Typography>
            <Typography varint="body1">
              איסוף: {item.dates.pickupTime}
            </Typography>
            <Typography varint="body1">
              החזרה: {item.dates.dropoffTime}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">
              ₪{item.priceDetails.grandTotal}
            </Typography>
            <Typography variant="body1">
              בוצעה ב{dayjs(item.createdAt).format("MMMM D,YYYY HH:mm")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            onClick={() => navigate(`/reservationPage/${item._id}`)}
          >
            <Button>clcik</Button>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ResResultItem;
