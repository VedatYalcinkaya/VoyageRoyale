import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import UserTable from "../../../components/AdminComponents/UserPanel/UserTable";
import AddCustomer from "../../../components/AdminComponents/CustomerPanel/AddCustomer";
import CustomerDashboard from "../../../components/AdminComponents/CustomerPanel/CustomerDashboard";
import CorporateDashboard from "../../../components/AdminComponents/CorporatePanel/CorporateDashboard";
import PositionDashboard from "../../../components/AdminComponents/PositionPanel/PositionDashboard";


function TabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function Positions() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Positions
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of positions with editable functionalities
      </Typography>
      <PositionDashboard/>
    </Box>
  );
}

export default Positions;
