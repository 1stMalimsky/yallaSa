import * as React from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { darkThemeActions } from "../../store/darkTheme";
import { authActions } from "../../store/auth";
import { Container, AppBar, Box, Hidden } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import SearchPartial from "./SearchPartial";
import MiniMenuNavLink from "./MiniMenuNavLink";
import { pages, loggedInPages, notAuthPages, adminPages } from "./navbarPages";
import logo from "../../assets/imgs/logo.png";

const MuiNavbar = () => {
  const user = useSelector((storePie) => storePie.authSlice);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const isDarkTheme = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };
  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };

  return (
    <AppBar position="static" className="navBar">
      <Container maxWidth="xl">
        <Toolbar>
          {/* AUTH/NOT-AUTH PAGES */}
          {user.isLoggedIn
            ? loggedInPages.map((page) =>
                page.label === "LIKED CARS" ? (
                  ""
                ) : page.label === "LOGOUT" ? (
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={handleLogoutClick}
                  />
                ) : (
                  <NavLinkComponent key={page.url} {...page} />
                )
              )
            : notAuthPages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
          {/* END OF AUTH/NOT-AUTH PAGES */}

          {/* DARK/LIGHT MODE BUTTON */}
          <Box>
            <IconButton onClick={changeTheme}>
              {isDarkTheme ? (
                <LightModeIcon
                  fontSize="large"
                  color={isDarkTheme ? "white" : "black"}
                />
              ) : (
                <DarkModeIcon
                  fontSize="large"
                  color={isDarkTheme ? "white" : "black"}
                />
              )}
            </IconButton>
          </Box>
          {/* END OF DARK/LIGHT MODE BUTTON */}

          {/* SPACER BOX */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "row-reverse",
            }}
          ></Box>

          {/* <SearchPartial /> */}

          {/* APPEARS ONLY IF LOGGED IN */}
          {user.isLoggedIn && (
            <NavLink to={ROUTES.PROFILE}>
              <IconButton>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </NavLink>
          )}

          {/* SORTS APPEARANCE BASED ON IF USER IS LOGGED IN */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              flexDirection: "row-reverse",
              justifyContent: "flex-start",
              alignItems: "center",
              marginRight: "1em",
            }}
          >
            {pages.map((page) => (
              <NavLinkComponent
                key={page.label}
                {...page}
                className="navLink"
              />
            ))}

            {user.isLoggedIn && (
              <NavLinkComponent
                key={loggedInPages[0].url}
                {...loggedInPages[0]}
                className="navLink"
              />
            )}

            {user.payload && user.payload.isAdmin && (
              <NavLinkComponent
                key={adminPages[0].url}
                {...adminPages[0]}
                className="navLink"
              />
            )}
          </Box>
          {/* END OF SORTS APPEARANCE BASED ON IF USER IS LOGGED IN */}

          {/* NAVBAR LOGO */}
          <NavLink to={ROUTES.HOME}>
            {isDarkTheme ? (
              <img src={logo} alt="logo" className="logoImg" />
            ) : (
              <img src={logo} alt="logo" className="logoImgDark" />
            )}
          </NavLink>

          {/*  MOBILE MENU */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", lg: "none" },
              justifyContent: "flex-start", // Align the menu button to the right in row-reverse mode
              flexDirection: "row-reverse", // Ensure it stays right-to-left
            }}
          >
            <IconButton size="large" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", xl: "none" } }}
            >
              {pages.map((page) => (
                <MiniMenuNavLink
                  to={page.url}
                  key={"miniLinks" + page.label + Date.now()}
                  onClick={handleCloseNavMenu}
                  {...page}
                />
              ))}

              {user.payload && user.payload.isAdmin && (
                <MiniMenuNavLink
                  key={"adminMiniLinks_isAdmin" + Date.now()}
                  {...adminPages[0]}
                />
              )}

              {user.isLoggedIn
                ? loggedInPages.map((page) =>
                    page.url === ROUTES.LOGOUT ? (
                      <MiniMenuNavLink
                        key={"miniLinks" + page.url + "loggedIn"}
                        {...page}
                        onClick={handleLogoutClick}
                      />
                    ) : (
                      <MiniMenuNavLink
                        key={"miniLinks" + page.url + "loggedOut"}
                        {...page}
                      />
                    )
                  )
                : notAuthPages.map((page) => (
                    <MiniMenuNavLink
                      key={"miniLinks" + page.url + "notAuth"}
                      {...page}
                      onClick={handleCloseNavMenu}
                    />
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MuiNavbar;
