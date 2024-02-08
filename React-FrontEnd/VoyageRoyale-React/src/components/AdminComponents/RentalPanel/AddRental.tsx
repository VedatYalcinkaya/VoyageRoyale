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
import { getCustomerByEmail } from "../../../store/slices/getCustomerByEmailSlice";
import { GetCustomerByEmailResponse } from "../../../models/CustomerModel/responses/getCustomerByEmailResponse";

const AddRental = () => {
  const dispatch = useAppDispatch();
  const cars: Car[] = useAppSelector((state) => state.carList.data);
  const userResponse: GetCustomerByEmailResponse | null = useAppSelector(
    (state) => state.getCustomerByEmail.data
  );

  const initialValues = {
    startDate: "",
    endDate: "",
    carId: 0,
    userId: userResponse ? userResponse.id : 0,
  };

  const validationSchema = Yup.object({
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    carId: Yup.number().moreThan(0, "Please select a car"),
    userId: Yup.number().moreThan(0, "Please select a user"),
  });

  useEffect(() => {
    const userEmail = "user@example.com";
    dispatch(getCustomerByEmail(userEmail));
    dispatch(getAllCar());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: AddRentalRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        await dispatch(postRental(values));
        dispatch(getAllCar());
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
          <MenuItem value={userResponse ? userResponse.id : 0}>
            Select A User
          </MenuItem>
          {userResponse ? (
            <MenuItem value={userResponse.id} key={userResponse.id}>
              {`${userResponse.email}`}
            </MenuItem>
          ) : null}
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

export default AddRental;
