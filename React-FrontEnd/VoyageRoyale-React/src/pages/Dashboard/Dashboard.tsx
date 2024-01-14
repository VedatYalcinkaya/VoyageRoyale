import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import CarList from '../CarList/CarList'
import CarDetails from '../CarDetails/CarDetails'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div>
      <Navbar/>
      <CarDetails/>
    </div>
  )
}

export default Dashboard
