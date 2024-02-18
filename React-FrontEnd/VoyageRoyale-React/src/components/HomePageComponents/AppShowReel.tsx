import { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const AppShowReel = () => {
  const { t } = useTranslation();

  const boxes = [
    {
      header: t("BookYourRide"),
      description: t("BookYourRideDescription"),
      phoneMockupImage: "https://i.ibb.co/jgh27hP/App-Show-Reel-1.png",
    },
    {
      header: t("UnlockSavings"),
      description: t("UnlockSavingsDescription"),
      phoneMockupImage: "https://i.ibb.co/mNQvnLN/App-Show-Reel-2.png",
    },
    {
      header: t("ExploreEverywhere"),
      description: t("ExploreEverywhereDescription"),
      phoneMockupImage: "https://i.ibb.co/ZXB0Zdt/App-Show-Reel-3.png",
    },
  ];

  const [currentMockup, setCurrentMockup] = useState(boxes[0].phoneMockupImage);

  const handleSectionClick = (mockupImage: any) => {
    setCurrentMockup(mockupImage);
  };

  return (
    <>
      <Typography variant="h4" textAlign="center">
        {t("SIMPLIFY YOUR LIFE")}
      </Typography>
      <Typography sx={{ fontSize: 20, textAlign: "center", color: "#0f4037" }}>
        {t("GetOurApp")}
      </Typography>
      <Grid container sx={{ alignItems: "center", mt: 10 }}>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <img
            src={currentMockup}
            alt="Phone Mockup"
            style={{ maxWidth: "70%" }}
          />
        </Grid>
        <Grid item xs={6}>
          {boxes.map((box) => (
            <Box
              key={box.header}
              onMouseOver={() => handleSectionClick(box.phoneMockupImage)}
              sx={{
                textAlign: "left",
                borderLeft: 2,
                borderColor: "#ffff",
                pl: 5,
                mb: 10,
                mt: 5,
                "&:hover": { borderColor: "#000000" },
              }}
            >
              <Typography variant="h5">{box.header}</Typography>
              <Typography sx={{ fontSize: 15 }}>{box.description}</Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default AppShowReel;
