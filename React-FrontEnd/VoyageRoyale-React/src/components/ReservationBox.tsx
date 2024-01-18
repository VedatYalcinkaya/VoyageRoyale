import React, { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { Button, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'; // Grid'i import edin
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/configureStore';

import { Position } from '../models/LocationModel/response';
import { getPositionList } from '../store/slices/selectPositionSlice';


type Props = {};

const ReservationBox = (props: Props) => {

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    const positions = useAppSelector(state => state.positionList.data)

    useEffect(() => {
        dispatch(getPositionList());
    }, [dispatch]);

    useEffect(() => {
        console.log(positions); // Check the structure of locations
    }, [positions]);

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [position, setPosition] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value as string);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="md">
                <Typography gutterBottom variant="h3" component="div">
                    Start a Reservation
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position}
                        label="Location"
                        onChange={handleChange}
                    >
                        {positions.map((position:Position) => (
                            <MenuItem key={position.id} value={position.city}>{position.city}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid container spacing={5}>
                    <Grid item xs={5}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="Pick Up"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </Grid>
                    <Grid item xs={5}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="Return"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </Grid>
                    <Grid item xs={2}>
                        <Button style={{ marginTop: '12px' }} variant="contained" size="large" color="success">
                            Check
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
    );
}

export default ReservationBox;
