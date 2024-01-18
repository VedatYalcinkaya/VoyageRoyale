import React, { useEffect, useState } from 'react';
import CarCard from '../../components/Card/CarCard';
import { Box, Stack } from '@mui/material';
import CarFilter from '../../components/Card/CarFilter';

type Props = {};

const CarList = (props: Props) => {

    const [selectedCarType,setSelectedCarType] = useState<string>("")

  return (
    <Box>
          <Stack direction='row' justifyContent='center' spacing={6}>
            <CarFilter onFilterChange={(type) => setSelectedCarType(type)}/>
            <CarCard selectedCarType={selectedCarType} />
          </Stack> 
    </Box>
  );
};

export default CarList;
