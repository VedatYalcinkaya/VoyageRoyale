import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Paper, Typography } from "@mui/material";
import AddColor from "../../../components/AdminComponents/ColorPanel/AddColor";
import FuelTypeDashboard from "../../../components/AdminComponents/FuelTypePanel/FuelTypeDashboard";
import GearTypeDashboard from "../../../components/AdminComponents/GearTypePanel/GearTypeDashboard";
import CarTypeDashboard from "../../../components/AdminComponents/CarTypePanel/CarTypeDashboard";
import ColorDashboard from "../../../components/AdminComponents/ColorPanel/ColorDashboard";
import BrandDashboard from "../../../components/AdminComponents/BrandPanel/BrandDashboard";
import ModelDashboard from "../../../components/AdminComponents/ModelPanel/ModelDashboard";



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

export default function ColorTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 5, pb: 50 }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Car Features
      </Typography>
      <Typography sx={{ mb: 5 }}>
        List of car features with editable functionalities
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
        <Tab label="Brands" sx={{ flexGrow: 1 }} />
        <Tab label="Models" sx={{ flexGrow: 1 }} />
        <Tab label="Colors" sx={{ flexGrow: 1 }} />
        <Tab label="Car Types" sx={{ flexGrow: 1 }} />
        <Tab label="Gear Types" sx={{ flexGrow: 1 }} />
        <Tab label="Fuel Types" sx={{ flexGrow: 1 }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <BrandDashboard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ModelDashboard/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <ColorDashboard/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CarTypeDashboard/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <GearTypeDashboard/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <FuelTypeDashboard />
      </TabPanel>
    </Box>
  );
}
