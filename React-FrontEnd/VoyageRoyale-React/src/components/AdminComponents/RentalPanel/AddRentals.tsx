import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { getAllCar } from "../../../store/slices/CarSlices/getAllCarSlice";
import { AddRentalRequest } from "../../../models/RentalModel/requests/addRentalRequest";
import { Car } from "../../../models/CarModel/responses/response";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import SecondFormikInput from "../../FormikInput/SecondFormikInput";
import { postRental } from "../../../store/slices/addRentalSlice";
import { getAllRentals } from "../../../store/slices/getAllRentalSlice";
import { getAllUsers } from "../../../store/slices/getAllUsersSlice";
import { GetAllUsersResponse } from "../../../models/UserModel/responses/getAllUsersResponse";
import dayjs from "dayjs";
import { getCustomRentals } from "../../../store/slices/getCustomRentalSlice";

function AddRentals() {
  const dispatch = useAppDispatch();
  const cars: Car[] = useAppSelector((state) => state.getAllCar.data);
  const users: GetAllUsersResponse[] | null = useAppSelector(
    (state) => state.getAllUsers.data
  );

  const initialValues = {
    startDate: undefined,
    endDate: undefined,
    carId: 0,
    userId: 0,
  };

  const validationSchema = Yup.object({
    startDate: Yup.date()
    .required("Start Date is required!").min(dayjs().toDate(), "Start Date cannot be in the past."),
    endDate: Yup.date()
    .required("End Date is required!"),
    carId: Yup.number().moreThan(0, "Please select a car"),
    userId: Yup.number().moreThan(0, "Please select a user"),
  });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCar());
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: AddRentalRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        await dispatch(postRental(values));
       await dispatch(getAllRentals());
        dispatch(getCustomRentals())
      }}
    >
      <Form>
        <InputLabel htmlFor="startDate">Start Date</InputLabel>
        <SecondFormikInput name="startDate" label="" type="date" />
        <br />
        <br />

        <InputLabel htmlFor="endDate">End Date</InputLabel>
        <SecondFormikInput name="endDate" label="" type="date" />
        <br />
        <br />

        <Field as={Select} name="carId">
          <MenuItem value={0}>Select A Car</MenuItem>
          {cars.map((car) => (
            <MenuItem value={car.id} key={car.id}>
              {car.plate}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Field as={Select} name="userId">
          <MenuItem value={0}>Select A User</MenuItem>
          {users?.map((user) => (
            <MenuItem value={user.id} key={user.id}>
              {user.email}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Button type="submit" variant="contained">
          Save
        </Button>
      </Form>
    </Formik>
  );
}

export default AddRentals;
