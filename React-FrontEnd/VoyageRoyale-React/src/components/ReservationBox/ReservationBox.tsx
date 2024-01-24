import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/configureStore";
import { setReservation } from "../../store/slices/reservationSlice";
import { getPositionList } from "../../store/slices/selectPositionSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { color } from "@mui/system";
import { Link } from "react-router-dom";

interface ReservationFormValues {
  pickUpDate: Date | null;
  returnDate: Date | null;
  position: string;
}

const validationSchema = Yup.object({
  pickUpDate: Yup.date()
    .nullable()
    .required("Pick Up date is required")
    .min(dayjs().toDate(), "Pick Up date cannot be in the past."),
  returnDate: Yup.date()
    .nullable()
    .required("Return date is required")
    .min(
      Yup.ref("pickUpDate"),
      "Return date cannot be before the Pick Up date."
    ),
  position: Yup.string().required("Position is required"),
});

const ReservationBox: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const positions = useAppSelector((state) => state.positionList.data);

  useEffect(() => {
    dispatch(getPositionList());
  }, [dispatch]);

  const initialValues: ReservationFormValues = {
    pickUpDate: dayjs().toDate(),
    returnDate: dayjs().add(1, "day").toDate(),
    position: "",
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const positionObj = positions.find(p => p.id === parseInt(values.position));
          dispatch(
            setReservation({
              pickUpDate: values.pickUpDate?.toISOString() || null, // undefined ise null döner
              returnDate: values.returnDate?.toISOString() || null, // undefined ise null döner
              position: positionObj || null
            })
          );
        }}
      >
        {({ values, setFieldValue, handleChange }) => (
          <Form>
            <Grid container maxWidth="md" spacing={2}>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  style={{ color: "#0F4037" }}
                >
                  Start a Reservation
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="position-select-label">Position</InputLabel>
                  <Select
                    labelId="position-select-label"
                    id="position"
                    name="position"
                    value={values.position}
                    label="Position"
                    onChange={handleChange}
                  >
                    {positions.map((position) => (
                      <MenuItem key={position.id} value={position.id}>
                        {position.city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <DateTimePicker
                  label="Pick Up"
                  value={values.pickUpDate ? dayjs(values.pickUpDate) : null}
                  onChange={(date) =>
                    setFieldValue(
                      "pickUpDate",
                      date 
                    )
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <DateTimePicker
                  label="Return"
                  value={values.returnDate ? dayjs(values.returnDate) : null}
                  onChange={(date) =>
                    setFieldValue(
                      "returnDate",
                      date 
                    )
                  }
                />
              </Grid>

              <Grid container item xs={2}>
             
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#0F4037",
                    "&:hover": {
                      backgroundColor: "#B58B5D",
                    },
                  }}
                >
                  Check
                </Button>
              
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default ReservationBox;
