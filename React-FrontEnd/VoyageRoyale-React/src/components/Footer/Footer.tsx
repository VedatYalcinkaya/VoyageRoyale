import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        padding: "20px",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          © 2024 VoyageRoyale. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
