import React, { useState } from "react";
import {
  Link as RouterLink,
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SignIn from "../Login/SignIn";
import QuickReservation from "../../pages/QuickReservation/QuickReservation";
import Location from "../../pages/Location/Location";
import Homepage from "../../pages/Homepage/Homepage";

const drawerWidth = 275;
const signInDrawerWidth = 400;

export default function Sidebar() {
  const [signInDrawerOpen, setSignInDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignInButtonClick = () => {
    setSignInDrawerOpen(true);
  };

  const handleSignInDrawerClose = () => {
    setSignInDrawerOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Main Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderColor: "#f9f9f9",
            padding: "20px",
            backgroundColor: "#0F4037",
          },
          "& .MuiTypography-root": {
            color: "#D9D5A7",
          },
          "& .logo-container": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
            marginBottom: 4,
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
              width="110"
            />
          </RouterLink>
        </Box>
        <List sx={{ marginLeft: 1 }}>
          <ListItem disablePadding>
            {/* Open the second drawer on Sign In button click */}
            <ListItemButton onClick={handleSignInButtonClick}>
              <ListItemText primary="Sign In" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 2 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/quickReservation">
              <ListItemText primary="Quick Reservation" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 2 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List sx={{ marginLeft: 1 }}>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/reservations">
              <ListItemText primary="My Reservations" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 2 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/location">
              <ListItemText primary="Locations" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 2 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/aboutUs">
              <ListItemText primary="About Us" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 2 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Second Drawer for Sign In */}
      <Drawer
        anchor="left"
        open={signInDrawerOpen}
        onClose={handleSignInDrawerClose}
        sx={{
          marginLeft: drawerWidth,
          width: signInDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: signInDrawerWidth,
            boxSizing: "border-box",
            borderColor: "#f9f9f9",
            padding: "20px",
            backgroundColor: "#0F4037",
          },
        }}
      >
        {signInDrawerOpen && <SignIn onClose={handleSignInDrawerClose} />}
      </Drawer>
    </Box>
  );
}
