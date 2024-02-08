import { Box, Typography } from "@mui/material";
import InvoicesTable from "../../../components/AdminComponents/InvoicePanel/InvoicesTable";


function Invoices() {
  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Invoices
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of invoices with {<b>only reading</b>} functionality
      </Typography>
      <InvoicesTable/>
    </Box>
  );
}

export default Invoices;
