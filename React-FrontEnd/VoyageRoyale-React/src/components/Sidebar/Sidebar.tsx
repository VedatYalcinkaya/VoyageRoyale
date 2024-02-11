import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Collapse, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SignIn from "../Login/SignIn";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import tokenService from "../../services/tokenService";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import toastr from "toastr";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getCustomerByEmail, setEmailDataEmpty } from "../../store/slices/getCustomerByEmailSlice";
import { isSignedIn } from "../../store/slices/signInSlice";

const drawerWidth = 250;
const signInDrawerWidth = 400;

interface SidebarProps {}

export default function Sidebar() {
  // const [signedIn, setSignedIn] = useState(false);
  const dispatch = useAppDispatch();
  const isLogedIn = useAppSelector(state => state.signIn.setSignedIn);

  const authorities: string[] | undefined = useAppSelector(
    (state) => state.getCustomerByEmail.data?.authorities
  );
  console.log(authorities);

  const [signInDrawerOpen, setSignInDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (signedIn) {
  //     setSignInDrawerOpen(false);
  //   }
  // }, [signedIn]);



  const handleSignInButtonClick = () => {
    setSignInDrawerOpen(true);
  };

  const handleSignInDrawerClose = () => {
    setSignInDrawerOpen(false);
  };

  const onSignOut = () => {
    tokenService.logout();
    dispatch(setEmailDataEmpty())
    dispatch(isSignedIn(false));
    localStorage.removeItem("isSignedIn")
    axiosInstance.post("auth/logout").then(response => {toastr.info(`${response.data}`)})
  }


  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeSignInDrawer = () => {
    setSignInDrawerOpen(false);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  console.log(isSignedIn);
  console.log(authorities?.includes("ADMIN"));

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderColor: "#f9f9f9",
            padding: "10px",
            backgroundColor: "#0F4037",
          },
          "& .MuiTypography-root": {
            fontSize: 14,
          },
          "& .logo-container": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            marginBottom: 1,
          },
          "& .MuiListItemIcon-root": {
            color: "#BF9460",
          },
          "& .MuiDivider-root": {
            borderColor: "#BF9460",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box className="logo-container" onClick={handleLogoClick}>
          <RouterLink to="/">
            <img
              src="https://i.ibb.co/Q69fC4x/Logo-bej.png"
              alt="Logo"
              width="80"
              style={{ marginBottom: 10 }}
            />
          </RouterLink>
        </Box>
        <List sx={{ pl: 3 }}>
          {isLogedIn ? (
            <>
              <ListItem disablePadding>
                <ListItemText primary={`Welcome`} sx={{ color: "#D9D5A7" }} />
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={onSignOut}>
                  <ListItemText primary="Sign Out" sx={{ color: "#D9D5A7" }} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <List style={{ color: "#D4D2A9" }}>
              <ListItem disablePadding>
                <Button
                  sx={{
                    ml: 1,
                    height: 25,
                    color: "#0F4037",
                    backgroundColor: "#D4D2A9",
                    "&:hover": {
                      backgroundColor: "#A3794F",
                    },
                  }}
                  onClick={handleSignInButtonClick}
                >
                  <ListItemText primary="Sign In" />
                </Button>
              </ListItem>
              <ListItem disablePadding style={{ marginLeft: 10 }}>
                <ListItemText primary="or" />
              </ListItem>
              <ListItem disablePadding>
                <Button
                  sx={{
                    ml: 1,
                    height: 25,
                    color: "#0F4037",
                    backgroundColor: "#D4D2A9",
                    "&:hover": {
                      backgroundColor: "#A3794F",
                    },
                  }}
                  onClick={handleSignInButtonClick}
                >
                  <ListItemText primary="Create an Account" />
                </Button>
              </ListItem>
            </List>
          )}

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/">
              <ListItemText primary="Home" sx={{ color: "#D9D5A7" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/quickReservation">
              <ListItemText
                primary="Quick Reservation"
                sx={{ color: "#D9D5A7" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/reservations">
              <ListItemText
                primary="My Reservations"
                sx={{ color: "#D9D5A7" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/location">
              <ListItemText primary="Locations" sx={{ color: "#D9D5A7" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/aboutUs">
              <ListItemText primary="About Us" sx={{ color: "#D9D5A7" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/userProfile">
              <ListItemText primary="My Profile" sx={{ color: "#D9D5A7" }} />
            </ListItemButton>
          </ListItem>
          {authorities?.includes("ADMIN") && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary="Admin Dashboard"
                  sx={{ color: "#D9D5A7" }}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
          )}
          {authorities?.includes("ADMIN") && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/users"
                >
                  <ListItemText primary="Users" />
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/cars"
                >
                  <ListItemText primary="Cars" />
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/carFeatures"
                >
                  <ListItemText primary="Car Features" />
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/positions"
                >
                  <ListItemText primary="Positions" />
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/rentals"
                >
                  <ListItemText primary="Rentals" />
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/invoices"
                >
                  <ListItemText primary="Invoices" />
                </ListItemButton>
              </List>
            </Collapse>
          )}
        </List>
      </Drawer>
      <Drawer
        anchor="left"
        open={signInDrawerOpen}
        onClose={handleSignInDrawerClose}
        sx={{
          width: signInDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: signInDrawerWidth,
            borderColor: "#f9f9f9",
            padding: "20px",
            backgroundColor: "#0F4037",
          },
        }}
      >
        {signInDrawerOpen && (
          <SignIn
          closeSignInDrawer={closeSignInDrawer}
          />
        )}
      </Drawer>
    </Box>
  );
}
