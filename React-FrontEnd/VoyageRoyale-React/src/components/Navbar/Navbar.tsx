import * as React from 'react';
import { Drawer, Box, Toolbar, Typography, IconButton, Button, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import CarService from '../../services/CarService';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  

  const [cars, setCars] = React.useState<any>([]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

      
  React.useEffect(()=>{
    fetchProducts();
},[]);

 const fetchProducts = () => {
    let service:CarService = new CarService();
    service.getAll().then((response: { data: { cars: any; }; }) => {
        console.log(response.data)
        setCars(response.data.cars)
    })
}

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.concat(settings).map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: 'block' }}
          >
            <MenuIcon />
          </IconButton>
          <AdbIcon />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
        </Toolbar>
        {/* İçerik buraya eklenebilir... */}
      </Box>
    </Box>
  );
}

export default Navbar;
