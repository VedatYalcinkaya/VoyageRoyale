import React from "react";
import { Box, Typography } from "@mui/material";
import InvoiceTable from "../../../components/AdminComponents/InvoicePanel/InvoiceTable";


function Invoices() {
  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Invoices
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of invoices with {<b>only reading</b>} functionality
      </Typography>
      <InvoiceTable/>
    </Box>
  );
}

export default Invoices;
