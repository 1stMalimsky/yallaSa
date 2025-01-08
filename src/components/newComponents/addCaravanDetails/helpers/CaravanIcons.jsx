import { useState, useEffect, Fragment } from "react";
import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import icons from "../../helpers/icons";
const CaravanIconRow = ({ data }) => {
  const [iconData, setIconData] = useState(data);

  useEffect(() => {
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
    </Box>
  );
};

export default CaravanIconRow;
