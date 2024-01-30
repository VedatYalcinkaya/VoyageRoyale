import React, { useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const AppShowReel = () => {
  const boxes = [
    {
        header: "Book Your Ride!",
        description: "Seize the wheel of convenience with seamless reservations. Your journey begins with a click.",
        phoneMockupImage: "https://i.ibb.co/jgh27hP/App-Show-Reel-1.png"
    },
    {
        header: "Unlock Savings!",
        description: "Rev up your adventure with exclusive offers. Drive further for less and discover unbeatable deals.",
        phoneMockupImage: "https://i.ibb.co/mNQvnLN/App-Show-Reel-2.png"
    },
    {
        header: "Explore Everywhere!",
        description: "From city streets to scenic routes, find us wherever your wanderlust takes you. Discover our rental hubs near and far.",
        phoneMockupImage: "https://i.ibb.co/ZXB0Zdt/App-Show-Reel-3.png"
    }
  ]
  
  const [currentMockup, setCurrentMockup] = useState(boxes[0].phoneMockupImage);

  const handleSectionClick = (mockupImage: any) => {
    setCurrentMockup(mockupImage);
  };

  return (
    <>
      <Typography sx={{ fontSize: 30, fontWeight:"bold", textAlign:"center", color:"#0f4037" }}>SIMPLIFY YOUR LIFE</Typography>
      <Typography sx={{ fontSize: 20, textAlign:"center", color:"#0f4037" }}>Get our app</Typography>
      <Grid container sx={{ alignItems: "center", mt: 10 }}>
      <Grid item xs={6} sx={{textAlign:"center"}} >
          <img
            src={currentMockup}
            alt="Phone Mockup"
            style={{ maxWidth: "70%" }}
          />
        </Grid>
        <Grid item xs={6}>
            {boxes.map((box,index) => (
            <Box key={box.header}
              onMouseOver={() => handleSectionClick(box.phoneMockupImage)}
              sx={{ textAlign: "left", borderLeft:2, borderColor:"#ffff", pl:5, mb:10,mt:5, "&:hover":{borderColor:"#000000"}}}
            >
              <Typography sx={{ fontSize: 25, fontWeight:"bold" }}>{box.header}</Typography>
              <Typography sx={{ fontSize: 15 }}>{box.description}</Typography>
            </Box>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default AppShowReel;
