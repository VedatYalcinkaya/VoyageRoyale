import React from "react";
import { Box, Typography } from "@mui/material";
import CarTable from "../../../components/AdminComponents/CarPanel/CarTable";

function Cars() {
  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Cars
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of cars with editable functionalities
      </Typography>
      <CarTable/>
    </Box>
  );
}

export default Cars;
