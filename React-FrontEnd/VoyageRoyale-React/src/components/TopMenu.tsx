import React from 'react'
import { AppBar } from "@mui/material";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignUpSignInSelect from './SignUpSignInSelect';


type Props = {}

const TopMenu = (props: Props) => {
    return (
        <Box position="static" style={{ backgroundColor: 'transparent' }} sx={{ flexGrow: 1 }}>
          <Toolbar>
            {/* Burada diğer öğelerinizi yerleştirebilirsiniz */}
            
            <Box sx={{ flexGrow: 1 }} /> {/* Bu boşluk sola olan tüm öğeleri itecek */}
  
            <SignUpSignInSelect /> {/* Bu, sağa itilmiş olacak */}
          </Toolbar>
      </Box>
    );
  }
export default TopMenu