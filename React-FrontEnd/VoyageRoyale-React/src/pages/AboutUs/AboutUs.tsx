import React from "react";
import { Box, Typography, Paper, Grid, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const developers = [
  {
    name: "Tarık Direk",
    github: "https://github.com/Tarikdirek",
    linkedin: "https://www.linkedin.com/in/m-tarik-direk/",
    photo: "https://github.com/Tarikdirek.png",
  },
  {
    name: "Özge Gül",
    github: "https://github.com/ozgegul",
    linkedin: "https://www.linkedin.com/in/ozge-gul-/",
    photo: "https://github.com/ozgegul.png",
  },
  {
    name: "Rümeysa Kopuz",
    github: "https://github.com/RumeysaaKopuz",
    linkedin: "https://www.linkedin.com/in/rümeysakpz-337b481a2/",
    photo: "https://github.com/RumeysaaKopuz.png",
  },
  {
    name: "Vedat Yalçınkaya",
    github: "https://github.com/VedatYalcinkaya",
    linkedin: "https://www.linkedin.com/in/vedat-yalçınkaya-898681212/",
    photo: "https://github.com/VedatYalcinkaya.png",
  },
  {
    name: "Oğuz Kağan Batı",
    github: "https://github.com/oguzkaganbati",
    linkedin: "https://www.linkedin.com/in/oğuz-kağan-bati-52669624b/",
    photo: "https://github.com/oguzkaganbati.png",
  },
  // Add more developers as needed
];

const AboutUs = () => {
  return (
    <Box sx={{ textAlign: "center", paddingLeft: 7, paddingRight: 7, marginBottom:20 }}>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, color: "#0F4037" }}>
        Meet Our Developers
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 4, color: "#0F4037", marginBottom: 2, padding: 2 }}
      >
        Thank you for getting to know our amazing team!{<br/>} We are passionate about
        creating awesome applications and are always eager to learn and
        collaborate.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {developers.map((developer, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 5,
                backgroundColor: "rgba(240, 240, 240, 0.3)",
                borderColor: "#0F4037",
                borderWidth: 1,
                borderStyle: "solid",
                "&:hover": {
                  backgroundColor: "rgba(15, 64, 55, 0.05)"}
              }}
            >
              <img
                src={developer.photo}
                alt={developer.name}
                style={{ width: "50%", borderRadius: "50%" }}
              />
              <Typography variant="h6" sx={{ mt: 2, color: "#0F4037" }}>
                {developer.name}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <IconButton
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon sx={{ color: "#0F4037" }} />
                </IconButton>
                <IconButton
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon sx={{ color: "#0F4037" }} />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutUs;
