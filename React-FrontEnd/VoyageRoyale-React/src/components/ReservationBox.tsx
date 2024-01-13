import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker, DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { Button, Container, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'; // Grid'i import edin



const ReservationBox = () => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="md">
                <Typography gutterBottom variant="h3" component="div">
                    Start a Reservation
                </Typography>
                <TextField id="outlined-basic" label="Location" variant="outlined" fullWidth />
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
