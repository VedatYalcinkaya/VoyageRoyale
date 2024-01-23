import React, { useState } from 'react';
import { Link as RouterLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Switch } from '@mui/material';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SignIn from '../Login/SignIn';
import QuickReservation from '../../pages/QuickReservation/QuickReservation';

const drawerWidth = 275;
const signInDrawerWidth = 400;

export default function Sidebar() {
  const [signInDrawerOpen, setSignInDrawerOpen] = useState(false);

  const handleSignInButtonClick = () => {
    setSignInDrawerOpen(true);
  };

  const handleSignInDrawerClose = () => {
    setSignInDrawerOpen(false);
  };

  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
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
          <Box className="logo-container">
            <img
              src="https://i.ibb.co/Q69fC4x/Logo-bej.png"
              alt="Logo"
              width="110"
            />
          </Box>
          <List>
            {["Sign in", "Quick Reservation"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={index === 0 ? '/' : '/quick-reservation'} // Define the routes
                  onClick={index === 0 ? handleSignInButtonClick : undefined}
                >
                  <ListItemText primary={text} />
                  <ListItemIcon>
                    <PlayArrowIcon fontSize="small" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Locations", "About Us"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={RouterLink} to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}>
                  <ListItemText primary={text} />
                  <ListItemIcon>
                    <PlayArrowIcon fontSize="small" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
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
          <SignIn onClose={handleSignInDrawerClose} />
        </Drawer>
      </Box>
  );
}
