import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import AddLocation from "../LocationPanel/AddLocation";
import UpdateLocation from "../LocationPanel/UpdateLocation";
import LocationTable from "../LocationPanel/LocationTable";
import AddRentals from "./AddRentals";
import UpdateRental from "./UpdateRental";
import RentalTable from "./RentalTable";


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
function RentalDashboard() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
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
        <Tab label="Add" sx={{ flexGrow: 1 }} />
        <Tab label="Update" sx={{ flexGrow: 1 }} />
        <Tab label="Delete" sx={{ flexGrow: 1 }} />


      </Tabs>
      <TabPanel value={value} index={0}>
        <AddRentals/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <UpdateRental/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RentalTable/>
      </TabPanel>

    </Box>
  );
}

export default RentalDashboard;
