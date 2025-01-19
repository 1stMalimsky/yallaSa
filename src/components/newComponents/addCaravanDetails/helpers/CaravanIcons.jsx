import { useState, useEffect, Fragment } from "react";
import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import icons from "../../helpers/icons";
import towCaravan from "../../../../assets/imgs/caravanIcons/towCarIconSmall.png";
import fullCaravan from "../../../../assets/imgs/caravanIcons/drivingCamperIconSmall.png";
import integratedCaravan from "../../../../assets/imgs/caravanIcons/transitIconSmall.png";

const CaravanIconRow = ({ data }) => {
  const [iconData, setIconData] = useState(data);
  const [iconImg, setIconImg] = useState(data.vehicleType);
  useEffect(() => {
    switch (data.vehicleType) {
      case "towCaravan":
        setIconImg(towCaravan);
        break;
      case "fullCaravan":
        setIconImg(fullCaravan);
        break;
      case "integratedCarvan":
        setIconImg(integratedCaravan);
        break;
      default:
        setIconImg(towCaravan);
    }
    setIconData(data);
  }, [data]);

  //console.log("iconData", iconData);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" className="CaravanFacilities">
        {iconData[0].numOfsleepers}
        <icons.HotelIcon className="CaravanFacilitiesIcons" />
      </Typography>
      <Divider className="CaravanDivider" orientation="vertical" />
      <Typography variant="h6" className="CaravanFacilities">
        {iconData[0].numOfseats}
        <icons.EventSeatIcon className="CaravanFacilitiesIcons" />
      </Typography>
      {iconData[1].bathroom.some((item) => "hasIndoorShower" in item) && (
        <Fragment>
          <Divider className="CaravanDivider" orientation="vertical" />
          <Typography variant="h6" className="CaravanFacilities">
            <icons.BathtubIcon className="CaravanFacilitiesIcons" />
          </Typography>
        </Fragment>
      )}
      {iconData[1].kitchen.length > 0 && (
        <Fragment>
          <Divider className="CaravanDivider" orientation="vertical" />
          <Typography variant="h6" className="CaravanFacilities">
            <icons.KitchenIcon className="CaravanFacilitiesIcons" />
          </Typography>
        </Fragment>
      )}
      <Divider className="CaravanDivider" orientation="vertical" />
      <Typography variant="h6" className="CaravanFacilities">
        {iconData[1].measurements.length}x{iconData[1].measurements.width}
        <icons.StraightenIcon className="CaravanFacilitiesIcons" />
      </Typography>
      <Divider className="CaravanDivider" orientation="vertical" />
      <Typography variant="h6" className="CaravanFacilities">
        {iconData[1].measurements.weight}
        <icons.ScaleIcon className="CaravanFacilitiesIcons" />
      </Typography>
      <Divider className="CaravanDivider" orientation="vertical" />
      <Typography variant="h6" className="CaravanFacilities">
        {iconData[1].measurements.licenseClass}
        <icons.DriveEtaIcon className="CaravanFacilitiesIcons" />
      </Typography>
      {/*  <Box sx={{ width: "50px" }}>
        <img src={iconImg} alt="vehicleTypeIcon" style={{ width: "100%" }} />
      </Box> */}
    </Box>
  );
};

export default CaravanIconRow;
