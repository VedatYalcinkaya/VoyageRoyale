import React from "react";
import { Box, Typography } from "@mui/material";
import RentalTable from "../../../components/AdminComponents/RentalPanel/RentalTable";


function Rentals() {
  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Rentals
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of rentals with editable functionalities
      </Typography>
      <RentalTable/>
    </Box>
  );
}

export default Rentals;
