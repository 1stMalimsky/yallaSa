import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Typography, Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import OwnerMessageModal from "../../components/resManagement/OwnerMessageModal";
import getUserDetails from "../../utils/helpers/getUserDetails";

const ReservationPage = () => {
  const params = useParams();
  const [resDetails, setResDetails] = useState(null);
  const [carOnlyPrice, setCarPrice] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [cancelModalState, setCancelModalState] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState(null);

  const findRes = async (resId) => {
    if (!resId) return console.log("no res id");
    const foundRes = await axios.get(`/reservations/${resId}`);
    try {
      if (foundRes) {
        const foundOwner = await getUserDetails(
          foundRes.data.found_reservation.ownerId
        );
        const resData = foundRes.data.found_reservation;
        setOwnerDetails(foundOwner);

        setResDetails(resData);
        setCarPrice(
          +resData.priceDetails.grandTotal -
            +resData.priceDetails.totalExtras -
            +resData.priceDetails.cancelation -
            +resData.priceDetails.insurance
        );
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    console.log("params", params.resId);
    if (!params.resId) return console.log("no res id");
    else findRes(params.resId);
  }, []);

  console.log("resDetails", resDetails);

  const onCloseModal = () => {
    setModalState(false);
  };

  const handleCanelRequest = async () => {
    try {
      const request = await axios.post(
        `/reservations/messageclient/cancel/${ownerDetails._id}`,
        {
          email: "alonmalichi@gmail.com",
        }
      );
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!resDetails) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h3" sx={{ pb: 2 }}>
        פרטי הזמנה
      </Typography>
      <Grid container spacing={2}>
        <Grid
          className="elevatedNoHover"
          item
          xs={8}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 3,
            mb: 2,
          }}
        >
          <Grid item xs={4}>
            <Typography variant="body1">תאריך איסוף:</Typography>
            <Typography variant="h5">
              {dayjs.unix(resDetails.dates.start).format("MMMM D, YYYY")}
            </Typography>
            <Typography variant="body1">תאריך החזרה:</Typography>
            <Typography variant="h5">
              {dayjs.unix(resDetails.dates.end).format("MMMM D, YYYY")}
            </Typography>
            <Typography variant="body1">מספר לילות:</Typography>
            <Typography variant="h5">{resDetails.dates.numOfDays}</Typography>
            <Typography variant="h5">
              סה"כ להזמנה: ₪{resDetails.priceDetails.grandTotal}
            </Typography>
            <Typography variant="body2">
              סה"כ עמלה: {resDetails.priceDetails.grandTotal * 0.15}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">שם האורח:</Typography>
            <Typography variant="h5">{resDetails.userName}</Typography>
            <Typography variant="body1">שם הפריט:</Typography>
            <Typography variant="h5">{resDetails.listingName}</Typography>
            <Typography variant="body1">מזהה הזמנה:</Typography>
            <Typography variant="h5">{resDetails._id}</Typography>
            <Typography variant="body1">סה"כ:</Typography>
            <Typography variant="body1">
              הזמנה נוצרה ב:{" "}
              {dayjs(resDetails.createdAt).format("D MMMM, YYYY")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => setModalState(true)}
            >
              יצרת קשר עם המזמין
            </Button>
            <OwnerMessageModal
              modalState={modalState}
              closeModal={onCloseModal}
              ownerDetails={ownerDetails}
              userEmail={resDetails.email}
            />
            <Button variant="contained" color="error" sx={{ mb: 2 }}>
              בקשה לביטול ההזמנה
            </Button>
            <Modal
              open={cancelModalState}
              onClose={() => {
                setCancelModalState(false);
              }}
            >
              <Box>
                <Typography variant="h5">
                  האם אתה בטוח שאתה רוצה לבקש לבטל?
                </Typography>
                <Button variant="contained" onClick={handleCanelRequest}>
                  כן
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setCancelModalState(false)}
                >
                  לא
                </Button>
              </Box>
            </Modal>
            <Button variant="contained" color="success" sx={{ mb: 2 }}>
              צפייה בפרטי אשראי
            </Button>
          </Grid>
        </Grid>
        <Grid
          className="elevatedNoHover"
          item
          xs={8}
          sx={{ pr: 3, display: "flex" }}
        >
          <Grid item xs={6}>
            <Typography variant="h5">פירוט מחיר:</Typography>
            <Typography variant="h6">סה"כ: לילות - {carOnlyPrice}</Typography>
            <Typography variant="h6">
              סה"כ: ביטוח - {resDetails.priceDetails.insurance}
            </Typography>
            <Typography variant="h6">
              סה"כ: תוספות - {resDetails.priceDetails.totalExtras}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">פירוט תוספות:</Typography>
            {!resDetails.extras && (
              <Typography variant="body1">אין תוספות</Typography>
            )}

            {resDetails &&
              resDetails.extra &&
              Object.entries(resDetails.extras).map(([extraName, details]) => (
                <Grid item xs={12} sm={6} md={4} key={extraName}>
                  <Typography variant="h6">
                    {extraName} {details.extraSum || 0}X
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservationPage;
