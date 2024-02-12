import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {
  return (
    <Grid container textAlign="center">
      <Grid item>
        <img
          src="https://s13.gifyu.com/images/SCD0s.gif"
          alt="Phone Mockup"
          style={{ maxWidth: "70%" }}
        />
        <Grid item>
          <Typography variant="h6">Look like you are lost.</Typography>
          <Typography>
            The page you are looking for is not available!
          </Typography>
        </Grid>
        <Grid item>
          <Button sx={{
                    mt: 3,
                    mb: 10,
                    color:"#D9D5A7",
                    backgroundColor: "#0F4037",
                    "&:hover": {
                      backgroundColor: "#B58B5D",
                    },
                  }} component={RouterLink}
                  to="/">Go to home</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NotFound;
