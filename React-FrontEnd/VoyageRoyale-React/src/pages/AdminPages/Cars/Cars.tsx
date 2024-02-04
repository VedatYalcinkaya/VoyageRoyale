import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import AddCar from "../../../components/AdminComponents/CarPanel/AddCar";
import CarDashboard from "../../../components/AdminComponents/CarPanel/CarDashboard";

function Cars() {

  const [value, setValue] = React.useState(0);

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
  

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
             <Typography sx={{ mb: 2 }} variant="h4">
        Cars
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of cars with editable functionalities
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
        <Tab label="Add-Update-Delete" sx={{ flexGrow: 1 }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CarDashboard/>
      </TabPanel>
    
    </Box>
  );
}

export default Cars;
