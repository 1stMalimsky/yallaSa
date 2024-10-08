import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const NavLinkComponent = ({ url, label, onClick }) => {
  const isDarkTheme = useSelector(
    (bigState) => bigState.darkThemeSlice.isDarkTheme
  );

  return (
    <NavLink to={url} onClick={onClick} className={"navLink"}>
      {({ isActive }) => (
        <Typography
          fontWeight={"bold"}
          color={
            isActive
              ? isDarkTheme
                ? "warning.dark"
                : "secondary.dark"
              : isDarkTheme
              ? "warning.light"
              : "info.dark"
          }
          sx={{ paddingX: 1.2, marginY: 1 }}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
