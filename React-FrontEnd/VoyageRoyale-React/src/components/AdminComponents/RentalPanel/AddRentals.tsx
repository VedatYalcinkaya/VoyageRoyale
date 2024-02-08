import { Button, MenuItem, Select } from "@mui/material";
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

function AddRentals(){
  const dispatch = useAppDispatch();
  const cars: Car[] = useAppSelector((state) => state.getAllCar.data);
  const users: GetAllUsersResponse[]|null = useAppSelector((state)=> state.getAllUsers.data);

  const initialValues = {
    startDate: "",
    endDate: "",
    carId: 0,
    userId: 0
  };

  const validationSchema = Yup.object({
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    carId: Yup.number().moreThan(0, "Please select a car"),
    userId: Yup.number().moreThan(0, "Please select a user"),
  });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCar());
  }, []);

console.log(users);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: AddRentalRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        await dispatch(postRental(values));
        dispatch(getAllRentals());
      }}
    >
      <Form>
        <SecondFormikInput name="startDate" label="Start Date" type="text" />
        <br />
        <br />

        <SecondFormikInput name="endDate" label="End Date" type="text" />
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
          <MenuItem value={0}>
            Select A User
          </MenuItem>
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
};

export default AddRentals;
