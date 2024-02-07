// Sidebar.tsx
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, Collapse } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SignIn from "../Login/SignIn";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import tokenService from "../../services/tokenService";

const drawerWidth = 250;
const signInDrawerWidth = 375;

interface SidebarProps {
  isSignedIn: boolean;
  onSignOut: () => void;
  userInfo: any; // You can define a type for user information
  handleSignInSuccess: () => void; // New prop for handling sign-in success
}

export default function Sidebar({
  isSignedIn,
  onSignOut,
  userInfo,
  handleSignInSuccess,
}: SidebarProps) {
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

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box  sx={{ display: "flex" }}>
      <CssBaseline />
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
            color: "#D9D5A7",
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
              width="70"
            />
          </RouterLink>
        </Box>
        <List sx={{ pl: 3 }}>
          {isSignedIn ? (
            <>
              <ListItem disablePadding>
                <ListItemText primary={`Welcome, ${userInfo.name}`} />
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton onClick={onSignOut}>
                  <ListItemText primary="Sign Out" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding>
             
              <Button sx={{
                ml:1,
                height:25,
                backgroundColor: "#B58B5D",             
                "&:hover": {
                  backgroundColor: "#A3794F",
                    }}} onClick={handleSignInButtonClick}>
                <ListItemText primary="Sign In" />
              </Button>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/quickReservation">
              <ListItemText primary="Quick Reservation" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/reservations">
              <ListItemText primary="My Reservations" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/location">
              <ListItemText primary="Locations" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/aboutUs">
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/userProfile">
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Admin Dashboard" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton
                sx={{ pl: 3 }}
                component={RouterLink}
                to="adminDashboard/users"
              >
                <ListItemText primary="Users" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 3 }}
                component={RouterLink}
                to="adminDashboard/cars"
              >
                <ListItemText primary="Cars" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 3 }}
                component={RouterLink}
                to="adminDashboard/carFeatures"
              >
                <ListItemText primary="Car Features" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 3 }}
                component={RouterLink}
                to="adminDashboard/positions"
              >
                <ListItemText primary="Positions" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 3 }}
                component={RouterLink}
                to="adminDashboard/rentals"
              >
                <ListItemText primary="Rentals" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 3 }}
                component={RouterLink}
                to="adminDashboard/invoices"
              >
                <ListItemText primary="Invoices" />
              </ListItemButton>

            </List>
          </Collapse>
        </List>
      </Drawer>
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
        {signInDrawerOpen && (
          <SignIn
          // onClose={handleSignInDrawerClose}
          // onSignIn={handleSignInSuccess} // Pass handleSignInSuccess to SignIn component
          />
        )}
      </Drawer>
    </Box>
  );
}
