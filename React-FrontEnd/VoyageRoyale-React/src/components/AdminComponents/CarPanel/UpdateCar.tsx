import { Button, MenuItem, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { useAppDispatch, useAppSelector } from '../../../store/configureStore';
import { useEffect, useState } from 'react';
import { getCarBrandType } from "../../../store/slices/CarSlices/carBrandTypeSlice";
import { getCarFuelType } from "../../../store/slices/CarSlices/carFuelTypeSlice";
import { getCarGearType } from "../../../store/slices/CarSlices/carGearTypeSlice";
import { getPositionList } from "../../../store/slices/selectPositionSlice";
import { getAllColor } from "../../../store/slices/CarSlices/carColorSlice";
import { getAllModel } from "../../../store/slices/CarSlices/carModelSlice";
import { CarFuelType } from "../../../models/CarFuelTypeModel/responses/response";
import { Position } from "../../../models/LocationModel/responses/response";
import { GetAllColorResponse } from "../../../models/ColorModel/responses/getAllColorResponse";
import { GetAllModelResponse } from "../../../models/ModelModel/responses/getAllModelResponse";
import { getAllCar } from "../../../store/slices/CarSlices/getAllCarSlice";
import { Car } from "../../../models/CarModel/responses/response";
import { updateCar } from "../../../store/slices/updateCarSlice";
import { UpdateCarRequest } from "../../../models/CarModel/requests/updateCarRequest";
import { getCarCarType } from "../../../store/slices/CarSlices/carCarTypeSlice";
import { uploadCarImage } from "../../../store/slices/addCarSlice";
import { CarGearType } from "../../../models/carGearTypeModel/responses/response";
import { CarCarType } from "../../../models/CarCarTypeModel/responses/response";

type Props = {};

function UpdateCar() {
  const dispatch = useAppDispatch();
  const carCategories: CarCarType[] = useAppSelector(
    (state) => state.carCarType.data
  );
  const carFuels: CarFuelType[] = useAppSelector(
    (state) => state.carFuelType.data
  );
  const carGears: CarGearType[]  = useAppSelector(
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

  const cars: Car[] = useAppSelector(
    (state) => state.getAllCar.data
  );

  const initialValues = {
    id: 0,
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
    imagePath: "",
  };

  const validationSchema = Yup.object({
    id: Yup.number().positive(),
    plate: Yup.string()
      .required("Plate field must be fill")
      .min(2, "Plate format must be TR"),
    kilometer: Yup.number().moreThan(0),
    year: Yup.number().moreThan(0),
    dailyPrice: Yup.number().moreThan(0),
    modelId: Yup.number().moreThan(0),
    colorId: Yup.number().moreThan(0),
    gearTypeId: Yup.number().moreThan(0),
    fuelTypeId: Yup.number().moreThan(0),
    carTypeId: Yup.number().moreThan(0),
    positionId: Yup.number().moreThan(0),
    imagePath: Yup.string()
  });

  useEffect(() => {
    dispatch(getCarBrandType());
    dispatch(getCarCarType());
    dispatch(getCarFuelType());
    dispatch(getCarGearType());
    dispatch(getPositionList());
    dispatch(getAllColor());
    dispatch(getAllModel());
    dispatch(getAllCar());
  }, []);

  const [imageFile2, setImageFile2] = useState<File | null>(null);

  const handleFileSelect2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files); // Seçilen dosyaları konsola yazdırır.
    if (files && files.length > 0) {
      setImageFile2(files[0]);
      console.log("Dosya seçildi:", files[0]); // Seçilen ilk dosyanın detaylarını konsola yazdırır.
    } else {
      console.log("Dosya seçilmedi.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: UpdateCarRequest, { resetForm }) => {

        if (imageFile2 instanceof File && imageFile2.size > 0) {
          try {
            const imageResponse = await dispatch(uploadCarImage(imageFile2)).unwrap();
            values.imagePath = imageResponse; // Sunucunun döndürdüğü URL burada ayarlanacak
            // Resim yükleme işlemi başarılı olduğunda, imagePath'i form verilerine ekle
            console.log(values.imagePath)
            console.log(values)
          } catch (error) {
            console.error('Resim yükleme işlemi sırasında hata oluştu', error);
            return;
          }
        }

        try {
          // Form verilerini ve imagePath'i gönder
          console.log(values)
          await dispatch(updateCar(values)).unwrap();
          resetForm();
          dispatch(getAllCar())
        } catch (error) {
          console.error('Failed to update car', error);
        }
      

      }}
    >
      <Form>

        <Field as={Select} name="id">
          <MenuItem value="0">Select Plate ID</MenuItem>
          {cars.map((car) => (
            <MenuItem value={car.id} key={car.id}>
              {car.plate}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

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
              {fuel.name}
            </MenuItem>
          ))}
        </Field>
        <br />
        <br />

        <Field as={Select} name="gearTypeId">
          <MenuItem value="0">Select A Gear</MenuItem>
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
        <input
          accept="image/*"
          type="file"
          onChange={handleFileSelect2}
          style={{ display: 'none' }}
          id="file2"
        />
        <label htmlFor="file2">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>

        <br />
        <br />


        <Button type="submit" variant="contained">Update</Button>
      </Form>
    </Formik>
  );
}

export default UpdateCar;
