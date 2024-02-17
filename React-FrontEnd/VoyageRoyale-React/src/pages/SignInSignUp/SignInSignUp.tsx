import React, { useState } from "react";
import SignUp from "../../components/Login/SignUp";
import Grid from "@mui/material/Grid";
import CorporateSignUp from "../../components/Login/CorporateSignUp";
import SignUpDetail from "../../components/Login/SignUpDetail";
import { Box, Tab, Tabs, Typography } from "@mui/material";

function TabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function SignInSignUp() {
  const [signInDrawerOpen, setSignInDrawerOpen] = useState(false);

  const openSignInDrawer = () => {
    setSignInDrawerOpen(true);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Grid container sx={{ boxShadow: 10 }}>
      <Grid item xs={6} sx={{ padding: 5, pt: 5 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 6 }}>
          Create Your Account
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "left",
            borderRadius: 1,
            "& button": {
              borderRadius: 1,
              
              fontWeight: "bold",
              textAlign: "left",
            },
            mb: 5,
            "& button:hover": { backgroundColor: "#f7f7f7" },
            "& button:active": { backgroundColor: "#0f4037", color: "#d4d2a9" },
            "& button.Mui-selected": {
              backgroundColor: "#0f4037",
              color: "#d4d2a9",
            },
          }}
        >
          <Tab label="Individual" sx={{ flexGrow: 1 }} />
          <Tab label="Corporate" sx={{ flexGrow: 1 }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <SignUp/>
          </TabPanel>
        <TabPanel value={value} index={1}>
          <CorporateSignUp/>
        </TabPanel>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ padding: 5, backgroundColor: "#0F4037", pt: 10, pb: 20 }}
      >
        <SignUpDetail openSignInDrawer={openSignInDrawer} />
      </Grid>
    </Grid>
  );
}

export default SignInSignUp;
