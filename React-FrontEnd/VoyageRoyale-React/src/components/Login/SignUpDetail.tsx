import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUpDetail() {
  return (
    <>
      <Grid container item xs={12} justifyContent="center">
        <img
          src="https://i.ibb.co/KszFnsq/Sign-Up.png"
          alt="Sign Up"
          style={{ maxWidth: "90%" }}
        />
      </Grid>
      <Grid item xs={12} sx={{ color: "white", mt: 5 }}>
        <Typography sx={{mb:5}}>
          It's free and easy to create an account! <br />
          <br />
          As a Voyage Royale Plus member, you'll save 5% off base rates of pay
          later reservations.
        </Typography>
        <Link to="/signInSignUp" style={{ color:"#C19C6E" }} >
          <u>You have an account? Sign In</u>
        </Link>
      </Grid>
    </>
  );
}
