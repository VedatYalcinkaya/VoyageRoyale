import { Box, Typography } from "@mui/material";
import LocationDashboard from "../../../components/AdminComponents/LocationPanel/LocationDashboard";

function Positions() {
  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Positions
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of positions with editable functionalities
      </Typography>
      <LocationDashboard />
    </Box>
  );
}

export default Positions;
