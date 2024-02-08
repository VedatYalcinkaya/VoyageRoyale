import { Button, MenuItem, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import SecondFormikInput from "../../FormikInput/SecondFormikInput";
import { UpdateRentalRequest } from "../../../models/RentalModel/requests/updateRentalRequest";
import { useEffect } from "react";
import { updateRental } from "../../../store/slices/updateRentalSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/configureStore";
import { Car } from "../../../models/CarModel/responses/response";

function UpdateRental() {
  const dispatch = useAppDispatch();
  const rentals = useAppSelector((state) => state.getAllRentals.data);
  const cars: Car[] = useAppSelector((state) => state.carList.data);
  const userResponse = useAppSelector(
    (state: RootState) => state.getCustomerByEmail.data
  );

  const users = userResponse ? [userResponse] : [];

  const initialValues = {
    id: 0,
    startDate: "",
    endDate: "",
    returnDate: "",
    startKilometer: 0,
    endKilometer: 0,
    carId: 0,
    userId: 0,
  };

  const validationSchema = Yup.object({
    id: Yup.number().moreThan(0, "Please select a rental"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    returnDate: Yup.string().required("Return Date is required"),
    startKilometer: Yup.number().moreThan(
      0,
      "Start Kilometer must be greater than 0"
    ),
    endKilometer: Yup.number().moreThan(
      0,
      "End Kilometer must be greater than 0"
    ),
    carId: Yup.number().moreThan(0, "Please select a car"),
    userId: Yup.number().moreThan(0, "Please select a user"),
  });

  useEffect(() => {}, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (
        values: UpdateRentalRequest,
        { resetForm }: { resetForm: () => void }
      ) => {
        console.log(values);
        resetForm();
        await dispatch(updateRental(values));
      }}
    >
      <Form>
        <Field as={Select} name="id">
          <MenuItem value={0}>Select A Rental</MenuItem>
          {rentals?.map((rental) => (
            <MenuItem value={rental.id} key={rental.id}>
              {rental.id}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <SecondFormikInput
          name="startDate"
          label="Updated Start Date"
          type="text"
        />
        <br />

        <SecondFormikInput
          name="endDate"
          label="Updated End Date"
          type="text"
        />
        <br />

        <SecondFormikInput
          name="returnDate"
          label="Updated Return Date"
          type="text"
        />
        <br />

        <SecondFormikInput
          name="startKilometer"
          label="Updated Start Kilometer"
          type="number"
        />
        <br />

        <SecondFormikInput
          name="endKilometer"
          label="Updated End Kilometer"
          type="number"
        />
        <br />

        <Field as={Select} name="carId">
          <MenuItem value="0">Select A Car</MenuItem>
          {cars.map((car) => (
            <MenuItem value={car.id} key={car.id}>
              {car.id}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Field as={Select} name="userId">
          <MenuItem value="0">Select A User</MenuItem>
          {users.map((user) => (
            <MenuItem value={user.id} key={user.id}>
              {user.id}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Button type="submit" variant="contained">
          Update
        </Button>
      </Form>
    </Formik>
  );
}

export default UpdateRental;
