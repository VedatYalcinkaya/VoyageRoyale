import React from "react";
import { Box, Typography } from "@mui/material";
import PositionTable from "../../../components/AdminComponents/PositionPanel/PositionTable";


function Positions() {
  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Positions
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of positions with editable functionalities
      </Typography>
      <PositionTable/>
    </Box>
  );
}

export default Positions;
