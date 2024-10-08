import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

const NavLinkComponent = ({ url, label, onClick }) => {
  const isDarkTheme = useSelector(
    (bigState) => bigState.darkThemeSlice.isDarkTheme
  );

  return (
    <NavLink to={url} onClick={onClick} className={"navLink"}>
      {({ isActive }) => (
        <Button variant="contained" color="primary">
          <Typography
            className={"navLink"}
            color={
              isActive
                ? isDarkTheme
                  ? "warning.dark"
                  : "secondary.dark"
                : isDarkTheme
                ? "warning.light"
                : "white"
            }
            sx={{ fontSize: 17 }}
          >
            {label}
          </Typography>
        </Button>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
