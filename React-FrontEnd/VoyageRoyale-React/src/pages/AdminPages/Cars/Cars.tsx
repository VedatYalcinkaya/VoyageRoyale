import React from "react";
import { Box, Typography } from "@mui/material";
import CarDashboard from "../../../components/AdminComponents/CarPanel/CarDashboard";

function Cars() {
  
  return (
    <Box sx={{ width: "100%",  pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Cars
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of cars with editable functionalities
      </Typography>
      <CarDashboard/>
    </Box>
  );
}

export default Cars;
