import React from 'react'
import CarCard from '../../components/Card/CarCard'
import { Box, Container, Stack } from '@mui/material'
import CarFilter from '../../components/Card/CarFilter'

type Props = {}

const CarList = (props: Props) => {
  return (
    <Box>
      <Stack direction='row' justifyContent='center' spacing={6}>
        <CarFilter/>
        <CarCard />
      </Stack>
      
    </Box>

  )
}

export default CarList