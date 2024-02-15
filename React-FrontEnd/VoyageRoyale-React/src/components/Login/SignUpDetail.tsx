import { Button, Grid, Typography } from "@mui/material";

interface Props {
  openSignInDrawer: () => void;
}

export default function SignUpDetail({ openSignInDrawer }: Props) {
  const handleSignInButtonClick = () => {
    openSignInDrawer();
  };

  return (
    <>
      <Grid container item xs={12} justifyContent="center">
        <img
          src="https://i.ibb.co/KXtRYwf/Sign-Up.png"
          alt="Sign Up"
          style={{ maxWidth: "90%" }}
        />
      </Grid>
      <Grid item xs={12} sx={{ color: "white", mt: 5 }}>
        <Typography sx={{ mb: 5 }}>
          It's free and easy to create an account! <br />
          <br />
          As a Voyage Royale Plus member, you'll save 5% off base rates of pay
          later reservations.
        </Typography>
        <Button sx={{ color: "#C19C6E" }} onClick={handleSignInButtonClick}>
          <u>You have an account? Sign In</u>
        </Button>
      </Grid>
    </>
  );
}
