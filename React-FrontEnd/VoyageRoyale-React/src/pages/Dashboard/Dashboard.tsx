import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ReservationBox from '../../components/ReservationBox'
import Homepage from '../Homepage/Homepage'
import UserProfile from '../UserProfile/UserProfile'
import { Route, Routes } from 'react-router-dom'
import { Grid } from '@mui/material'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div> 
      <Grid>
        
      </Grid>
      <Routes>
        <Route path='/' Component={Homepage} />
        <Route path="/profile" Component={UserProfile} />
      </Routes>
    </div>
  )
}

export default Dashboard