import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ReservationBox from '../../components/ReservationBox'
import Footer from '../../components/Footer/Footer'

type Props = {}

const Homepage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <ReservationBox />
      <Footer/>
    </div>
  )
}

export default Homepage