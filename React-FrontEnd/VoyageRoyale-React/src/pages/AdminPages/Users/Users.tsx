import React from "react";
import { Box, Typography } from "@mui/material";
import UserTable from "../../../components/AdminComponents/UserPanel/UserTable";

function Users() {
  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Users
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of users with editable functionalities
      </Typography>
      <UserTable/>
    </Box>
  );
}

export default Users;
