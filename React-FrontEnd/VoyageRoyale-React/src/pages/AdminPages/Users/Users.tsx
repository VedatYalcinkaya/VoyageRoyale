import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import UserTable from "../../../components/AdminComponents/UserPanel/UserTable";
import AddCustomer from "../../../components/AdminComponents/CustomerPanel/AddCustomer";
import CustomerDashboard from "../../../components/AdminComponents/CustomerPanel/CustomerDashboard";
import CorporateDashboard from "../../../components/AdminComponents/CorporatePanel/CorporateDashboard";


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
function Users() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Users
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of users with editable functionalities
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "left",
          borderRadius: 1,
          "& button": {
            borderRadius: 1,
            mb: 1,
            fontWeight: "bold",
            textAlign: "left",
          },
          mb:5,
          "& button:hover": { backgroundColor: "#f7f7f7" },
          "& button:active": { backgroundColor: "#0f4037", color: "#d4d2a9" },
          "& button.Mui-selected": {
            backgroundColor: "#0f4037",
            color: "#d4d2a9",
          },
        }}
      >
        <Tab label="Customers" sx={{ flexGrow: 1 }} />
        <Tab label="Corporates" sx={{ flexGrow: 1 }} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <CustomerDashboard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CorporateDashboard/>
      </TabPanel>
    </Box>
  );
}

export default Users;
