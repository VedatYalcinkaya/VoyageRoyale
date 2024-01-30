// Sidebar.tsx
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
              width="80"
            />
          </RouterLink>
        </Box>
        <List>
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
              <ListItemButton onClick={handleSignInButtonClick}>
                <ListItemText primary="Sign In" />
                <ListItemIcon>
                  <PlayArrowIcon fontSize="small" sx={{ marginLeft: 3 }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/quickReservation">
              <ListItemText primary="Quick Reservation" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 3 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/reservations">
              <ListItemText primary="My Reservations" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 3 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/location">
              <ListItemText primary="Locations" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 3 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/aboutUs">
              <ListItemText primary="About Us" />
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" sx={{ marginLeft: 3 }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
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
            onClose={handleSignInDrawerClose}
            onSignIn={handleSignInSuccess} // Pass handleSignInSuccess to SignIn component
          />
        )}
      </Drawer>
    </Box>
  );
}
