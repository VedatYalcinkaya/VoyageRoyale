import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <Grid
      container sx={{ borderTop:1,p:5,mt:10}}
    >
      <Grid item xs={2} textAlign="left" >
        <img src="https://i.ibb.co/wZkGJP8/Logo-Ye-il.png" width="30%" />
      </Grid>
      <Grid item xs={4} textAlign="left"sx={{ alignItems: 'left',color:"#0f4037"}}>
        <Typography variant="h5" sx={{fontWeight:"bold"}}>Experience Elegance <br/>on Every Journey</Typography>
      </Grid>
      <Grid item xs={3} textAlign="left"sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',ml:-6,mr:5 }}>
        <Typography sx={{fontSize:12}}>© 2024 VoyageRoyale. All rights reserved.</Typography>
      </Grid>
      <Grid item xs={3} sx={{  alignItems: 'center' }}>
        <Grid container >
          <Grid item textAlign={"center"} xs={12} marginBottom={2} sx={{mt:-2}}>
        <Typography>Opening Hours</Typography>
        </Grid>
        <Grid item xs={6} textAlign={"center"} sx={{borderBottom:1}}>
        <Typography sx={{fontSize:12}}>Mon - Thu</Typography>
        </Grid>
        <Grid item xs={6} textAlign={"center"} sx={{borderBottom:1}}>
        <Typography sx={{fontSize:12}}>8am - 9pm</Typography>
        </Grid>
        <Grid item xs={6} textAlign={"center"} sx={{borderBottom:1}}>
        <Typography sx={{fontSize:12}}>Fri - Sat</Typography>
        </Grid>
        <Grid item xs={6} textAlign={"center"} sx={{borderBottom:1}}>
        <Typography sx={{fontSize:12}}>8am - 1am</Typography>
        </Grid>
        <Grid item xs={6} textAlign={"center"} sx={{borderBottom:1}}>
        <Typography sx={{fontSize:12}}>Sunday</Typography>
        </Grid>
        <Grid item xs={6} textAlign={"center"} sx={{borderBottom:1}}>
        <Typography sx={{fontSize:12}}>9am - 10pm</Typography>
        </Grid>
        </Grid>
      </Grid>
      
      <Grid container>
        <Grid item xs={12}>
        
        </Grid>

      </Grid>
      
    </Grid>
  );
};

export default Footer;
