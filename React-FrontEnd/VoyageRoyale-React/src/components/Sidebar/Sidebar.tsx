import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
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
import { setEmailDataEmpty } from "../../store/slices/getCustomerByEmailSlice";
import { isSignedIn } from "../../store/slices/signInSlice";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SignUpDetail from "../Login/SignUpDetail";
import { getCustomerInfo } from "../../store/slices/CustomerSlices/customerInfoSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { getCorporateCustomerInfo } from "../../store/slices/CorporateCustomerSlice/corporateCustomerInfoSlice";

const drawerWidth = 275;
const signInDrawerWidth = 400;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "#0B352D",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Sidebar() {
  // const [signedIn, setSignedIn] = useState(false);
  const dispatch = useAppDispatch();
  const isLogedIn = useAppSelector((state) => state.signIn.setSignedIn);
  const email = useAppSelector((state) => state.getCustomerByEmail.data?.email);
  const customer = useAppSelector((state) => state.customerInfo.data);
  const corporateCustomer = useAppSelector(
    (state) => state.corporateCustomerInfo.data
  );
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleAdminDashboardClick = () => {
    setIsAdminDashboardOpen(!isAdminDashboardOpen);
  };

  const authorities: string[] | undefined = useAppSelector(
    (state) => state.getCustomerByEmail.data?.authorities
  );
  console.log(authorities);

  useEffect(() => {
    // Check if the email is present
    if (email) {
      // Check the user's authorities to determine their role
      if (authorities?.includes("CUSTOMER")) {
        // If the user is a customer, fetch customer info
        dispatch(getCustomerInfo(email));
      } else if (authorities?.includes("CORPORATE_CUSTOMER")) {
        // If the user is a corporate customer, fetch corporate customer info
        dispatch(getCorporateCustomerInfo(email));
      }
    }
  }, [dispatch, email]);




  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [customerFromStorage, setCustomerFromStorage] = useState(
    localStorage.getItem("customer")
  );
  const [corporateCustomerFromStorage, setCorporateCustomerFromStorage] =
    useState(localStorage.getItem("corporateCustomer"));

  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.key === "customer" && e.newValue) {
        setCustomerFromStorage(JSON.parse(e.newValue));
      } else if (e.key === "corporateCustomer" && e.newValue) {
        setCorporateCustomerFromStorage(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Component unmount olduğunda event listener'ı temizle
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Customer bilgilerini yerel depolamaya kaydet
  useEffect(() => {
    if (customer) {
      localStorage.setItem("customer", JSON.stringify(customer));
    }
  }, [customer]);

  // CorporateCustomer bilgilerini yerel depolamaya kaydet
  useEffect(() => {
    if (corporateCustomer) {
      localStorage.setItem(
        "corporateCustomer",
        JSON.stringify(corporateCustomer)
      );
    }
  }, [corporateCustomer]);

  // Welcome message güncelle
  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    const storedCorporateCustomer = localStorage.getItem("corporateCustomer");

    if (storedCustomer) {
      const customerData = JSON.parse(storedCustomer);
      setWelcomeMessage(`Welcome ${customerData.firstName}`);
    } else if (storedCorporateCustomer) {
      const corporateCustomerData = JSON.parse(storedCorporateCustomer);
      setWelcomeMessage(`Welcome ${corporateCustomerData.companyName}`);
    }
  }, [customer, corporateCustomer]);

  useEffect(() => {
    if (authorities?.includes("CUSTOMER") && customerFromStorage) {
      const customerData = JSON.parse(customerFromStorage);
      setWelcomeMessage(`Welcome ${customerData.firstName}`);
    } else if (
      authorities?.includes("CORPORATE_CUSTOMER") &&
      corporateCustomerFromStorage
    ) {
      const corporateCustomerData = JSON.parse(corporateCustomerFromStorage);
      setWelcomeMessage(`Welcome ${corporateCustomerData.companyName}`);
    }
  }, [authorities]);

  const [signInDrawerOpen, setSignInDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogedIn) {
      setSignInDrawerOpen(false);
    }
  }, [isLogedIn]);

  const openSignInDrawer = () => {
    setSignInDrawerOpen(true);
  };

  const handleSignInButtonClick = () => {
    setSignInDrawerOpen(true);
    // dispatch(getCustomerInfo(email))
  };

  const handleSignInDrawerClose = () => {
    setSignInDrawerOpen(false);
  };

  const onSignOut = () => {
    tokenService.logout();
    dispatch(setEmailDataEmpty());
    dispatch(isSignedIn(false));
    handleMenuButtonClose();
    localStorage.removeItem("isSignedIn");
    axiosInstance.post("auth/logout");
    toastr.warning("You have been logged out!", "Caution");
  };

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

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenuButton = Boolean(anchorEl);
  const handleMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuButtonClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SignUpDetail openSignInDrawer={openSignInDrawer} />
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
              <ListItem>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleMenuButtonClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: "#BC9160",
                    fontSize: 12,
                    backgroundColor: "#0B352D",
                    "&:hover": {
                      backgroundColor: "#092D26",
                  }}}
                >
                  {welcomeMessage}
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={openMenuButton}
                  onClose={handleMenuButtonClose}
                >
                  <MenuItem
                    onClick={handleMenuButtonClose}
                    component={RouterLink}
                    to="/userProfile"
                    disableRipple
                  >
                    <AccountCircleIcon />
                    My Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuButtonClose}
                    component={RouterLink}
                    to="/reservations"
                    disableRipple
                  >
                    <FileCopyIcon />
                    My Reservations
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem disableRipple onClick={onSignOut}>
                    <LogoutIcon />
                    Sign Out
                  </MenuItem>
                </StyledMenu>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={onSignOut}>
                  <ListItemText primary="Sign Out" sx={{ color: "#D9D5A7" }} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <List style={{ color: "#D4D2A9"}} >
              <ListItem disablePadding>
                <Button
                  sx={{
                    ml:2,
                    color: "#BC9160",
                    fontSize: 12,
                    backgroundColor: "#0B352D",
                    "&:hover": {
                      backgroundColor: "#092D26",
                  }}}
                  onClick={handleSignInButtonClick}
                >
                  <ListItemText primary="Sign In" />
                </Button>
              </ListItem>
              <ListItem disablePadding style={{ marginLeft: 20 }}>
                <ListItemText primary="or" />
              </ListItem>
              <ListItem disablePadding>
                <Button
                  sx={{
                    ml:2,
                    textAlign: "left",
                    color: "#BC9160",
                    borderRadius: 1,
                    backgroundColor: "#0B352D",
                    "&:hover": {
                      backgroundColor: "#092D26",
                    },
                  }}
                  component={RouterLink}
                  to="/signInSignUp"
                >
                  <ListItemText primary="Create an Account" />
                </Button>
              </ListItem>
            </List>
          )}

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/">
              <ListItemText primary="Home" sx={{ color: "#D9D5A7" }} />
              <ListItemIcon>
                <KeyboardArrowRightIcon
                  fontSize="small"
                  sx={{ marginLeft: 2 }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/quickReservation">
              <ListItemText
                primary="Quick Reservation"
                sx={{ color: "#D9D5A7" }}
              />
              <ListItemIcon>
                <KeyboardArrowRightIcon
                  fontSize="small"
                  sx={{ marginLeft: 2 }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/location">
              <ListItemText primary="Locations" sx={{ color: "#D9D5A7" }} />
              <ListItemIcon>
                <KeyboardArrowRightIcon
                  fontSize="small"
                  sx={{ marginLeft: 2 }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/aboutUs">
              <ListItemText primary="About Us" sx={{ color: "#D9D5A7" }} />
              <ListItemIcon>
                <KeyboardArrowRightIcon
                  fontSize="small"
                  sx={{ marginLeft: 2 }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {authorities?.includes("ADMIN") && (
            <ListItem disablePadding>
              <Button onClick={handleClick}  sx={{color: "#BC9160",ml:1.5,mt:2,fontSize:13,
                    
                    backgroundColor: "#0B352D",
                    "&:hover": {
                      backgroundColor: "#092D26",
                    },
                    borderRadius: 1}}>Admin Dashboard
                {open ? (
                  <ExpandLess onClick={handleClick} />
                ) : (
                  <ExpandMore onClick={handleClick} />
                )}
              </Button>
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
                  <ListItemIcon>
                    <KeyboardArrowRightIcon
                      fontSize="small"
                      sx={{ marginLeft: 2 }}
                    />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/cars"
                >
                  <ListItemText primary="Cars" />
                  <ListItemIcon>
                    <KeyboardArrowRightIcon
                      fontSize="small"
                      sx={{ marginLeft: 2 }}
                    />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/carFeatures"
                >
                  <ListItemText primary="Car Features" />
                  <ListItemIcon>
                    <KeyboardArrowRightIcon
                      fontSize="small"
                      sx={{ marginLeft: 2 }}
                    />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/positions"
                >
                  <ListItemText primary="Positions" />
                  <ListItemIcon>
                    <KeyboardArrowRightIcon
                      fontSize="small"
                      sx={{ marginLeft: 2 }}
                    />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/rentals"
                >
                  <ListItemText primary="Rentals" />
                  <ListItemIcon>
                    <KeyboardArrowRightIcon
                      fontSize="small"
                      sx={{ marginLeft: 2 }}
                    />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                  sx={{ color: "#D9D5A7", pl: 3 }}
                  component={RouterLink}
                  to="adminDashboard/invoices"
                >
                  <ListItemText primary="Invoices" />
                  <ListItemIcon>
                    <KeyboardArrowRightIcon
                      fontSize="small"
                      sx={{ marginLeft: 2 }}
                    />
                  </ListItemIcon>
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
        {signInDrawerOpen && <SignIn closeSignInDrawer={closeSignInDrawer} />}
      </Drawer>
    </Box>
  );
}
