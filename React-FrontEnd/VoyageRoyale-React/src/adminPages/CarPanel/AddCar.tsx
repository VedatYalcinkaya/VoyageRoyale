import { Button, MenuItem, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import SecondFormikInput from '../../components/FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { useEffect } from 'react';
import { getCarBrandType } from '../../store/slices/CarSlices/carBrandTypeSlice';
import { AddCarRequest } from '../../models/CarModel/requests/addCarRequest';
import { getCarCategory } from '../../store/slices/CarSlices/carCategorySlice';
import { getCarFuelType } from '../../store/slices/CarSlices/carFuelTypeSlice';
import { getCarGearType } from '../../store/slices/CarSlices/carGearTypeSlice';
import { getPositionList } from '../../store/slices/selectPositionSlice';
import { getAllColor } from '../../store/slices/CarSlices/carColorSlice';
import { getAllModel } from '../../store/slices/CarSlices/carModelSlice';
import { CarCategory } from '../../models/CarCategoryModel/responses/response';
import { CarFuelType } from '../../models/CarFuelTypeModel/response';
import { Position } from '../../models/LocationModel/response';
import { GetAllColorResponse } from '../../models/ColorModel/responses/getAllColorResponse';
import { GetAllModelResponse } from '../../models/ModelModel/responses/getAllModelResponse';
import { postCar } from '../../store/slices/addCarSlice';

type Props = {};

function AddCar() {
  const dispatch = useAppDispatch();
  const carCategories: CarCategory[] = useAppSelector(
    (state) => state.carCategory.data
  );
  const carFuels: CarFuelType[] = useAppSelector(
    (state) => state.carFuelType.data
  );
  const carGears: CarGearType[] = useAppSelector(
    (state) => state.carGearType.data
  );
  const carColors: GetAllColorResponse[] = useAppSelector(
    (state) => state.carColor.data
  );
  const carModels: GetAllModelResponse[] = useAppSelector(
    (state) => state.carModel.data
  );
  const positions: Position[] = useAppSelector(
    (state) => state.positionList.data
  );

  const initialValues = {
    kilometer: 0, // input number
    plate: "", //input string
    year: 0, // input number
    dailyPrice: 0, // input number
    modelId: 0, // veri çekilecek
    colorId: 0, //veri çekilecek
    gearTypeId: 0, //hazır
    fuelTypeId: 0, // hazır
    carTypeId: 0, // hazır
    positionId: 0,
  };

  const validationSchema = Yup.object({
    plate: Yup.string()
      .required("Filling name field is must.")
      .min(2, "Name must be at least 2 character."),
    kilometer: Yup.number().moreThan(0),
    year: Yup.number().moreThan(0),
    dailyPrice: Yup.number().moreThan(0),
    modelId: Yup.number().moreThan(0),
    colorId: Yup.number().moreThan(0),
    gearTypeId: Yup.number().moreThan(0),
    fuelTypeId: Yup.number().moreThan(0),
    carTypeId: Yup.number().moreThan(0),
    positionId: Yup.number().moreThan(0),
  });

  useEffect(() => {
    dispatch(getCarBrandType());
    dispatch(getCarCategory());
    dispatch(getCarFuelType());
    dispatch(getCarGearType());
    dispatch(getPositionList());
    dispatch(getAllColor());
    dispatch(getAllModel());
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: AddCarRequest, { resetForm }) => {
        console.log(values);
        resetForm();
        dispatch(postCar(values));
      }}
    >
      <Form>
        <SecondFormikInput name="plate" label="Plate" type="text" />
        <br />
        <br />

        <SecondFormikInput name="kilometer" label="Kilometer" type="number" />
        <br />
        <br />

        <SecondFormikInput name="year" label="Year" type="number" />
        <br />
        <br />

        <SecondFormikInput
          name="dailyPrice"
          label="Daily Price"
          type="number"
        />
        <br />
        <br />

        <Field as={Select} name="carTypeId">
          <MenuItem value="0">Select A Category</MenuItem>
          {carCategories.map((category) => (
            <MenuItem value={category.id} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Field as={Select} name="fuelTypeId">
          <MenuItem value="0">Select A Fuel Type</MenuItem>
          {carFuels.map((fuel) => (
            <MenuItem value={fuel.id} key={fuel.id}>
              {fuel.fuel_name}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Field as={Select} name="gearTypeId">
          <MenuItem value="0">Select A Category</MenuItem>
          {carGears.map((gear) => (
            <MenuItem value={gear.id} key={gear.id}>
              {gear.name}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Field as={Select} name="positionId">
          <MenuItem value="0">Select A Position</MenuItem>
          {positions.map((position) => (
            <MenuItem value={position.id} key={position.id}>
              {position.city}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Field as={Select} name="colorId">
          <MenuItem value="0">Select A Color</MenuItem>
          {carColors.map((color) => (
            <MenuItem value={color.id} key={color.id}>
              {color.name}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Field as={Select} name="modelId">
          <MenuItem value="0">Select A Model</MenuItem>
          {carModels.map((model) => (
            <MenuItem value={model.id} key={model.id}>
              {model.name}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Button type="submit">Save</Button>
      </Form>
    </Formik>
  );
}

export default AddCar;
