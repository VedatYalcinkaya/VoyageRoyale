import React from 'react'
import CarDetailsCard from '../../components/Card/CarDetailsCard'
import SelectedReservationDetails from '../../components/Card/SelectedReservationDetails';

type Props = {}

const CarDetails = (props: Props) => {

  return (
    <div>
      <SelectedReservationDetails />
      <CarDetailsCard />
    </div>
  )
}

export default CarDetails