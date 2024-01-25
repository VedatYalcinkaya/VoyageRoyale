import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        padding: "20px",
        paddingLeft: "200px",
        zIndex: 1000,
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
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
