import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/configureStore";
import { setReservation } from "../../store/slices/reservationSlice";
import { getPositionList } from "../../store/slices/selectPositionSlice";
import { Formik, Form } from "formik";
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
  Typography,
} from "@mui/material";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // Eğer bu eklentiyi kullanacaksanız yüklemeniz gerekebilir
import { toast } from "react-toastify";
import timezone from "dayjs/plugin/timezone";
import { red } from "@mui/material/colors";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const errorColor = red[500];

dayjs.extend(utc);
dayjs.extend(timezone);

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
  position: Yup.string().required("You should select a city!"),
});

const ReservationBox: React.FC = () => {
  const { t } = useTranslation();

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const positions = useAppSelector((state) => state.positionList.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPositionList());
  }, [dispatch]);

  const getCityInfoFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const cityParam = searchParams.get("city");

    return positions.find((position) => position.city === cityParam);
  };
  const selectedCity = getCityInfoFromUrl();

  const initialValues: ReservationFormValues = {
    pickUpDate: dayjs().toDate(),
    returnDate: dayjs().add(1, "day").toDate(),
    position: selectedCity ? String(selectedCity.id) : "",
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => {
          formikBag.setSubmitting(true);
          formikBag.validateForm().then((errors) => {
            console.log("Validation Errors:", errors);
            if (Object.keys(errors).length) {
              Object.values(errors).forEach((error) => {
                if (error) toast.error(error);
              });
              formikBag.setSubmitting(false);
            } else {
              const positionObj = positions.find(
                (p) => p.id === parseInt(values.position)
              );
              if (positionObj) {
                dispatch(
                  setReservation({
                    pickUpDate: dayjs(values.pickUpDate).toISOString(),
                    returnDate: dayjs(values.returnDate).toISOString(),
                    position: positionObj,
                    city: positionObj?.city,
                  })
                );
                Cookies.set(
                  "selectedPickUpDate",
                  dayjs(values.pickUpDate).toISOString()
                );
                Cookies.set(
                  "selectedReturnDate",
                  dayjs(values.returnDate).toISOString()
                );
                Cookies.set("selectedCity", String(positionObj.city));
                Cookies.set("selectedPositionId", String(positionObj.id));
                navigate("/cars");
              } else {
                toast.error("Invalid position selected");
              }
              formikBag.setSubmitting(false);
              formikBag.resetForm();
            }
          });
        }}
      >
        {(formikBag) => (
          <Form>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ paddingLeft: 15, paddingRight: 15 }}
            >
              <Grid item xs={12}>
                <Typography gutterBottom variant="h4" component="div">
                  {t("startReservation")}
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign={"left"}>
                <FormControl fullWidth>
                  <InputLabel id="position-select-label">
                    {t("selectCity")}
                  </InputLabel>
                  <Select
                    labelId="position-select-label"
                    id="position"
                    name="position"
                    value={formikBag.values.position}
                    label="Position"
                    onChange={formikBag.handleChange}
                  >
                    {positions.map((position) => (
                      <MenuItem key={position.id} value={position.id}>
                        {position.city}
                      </MenuItem>
                    ))}
                  </Select>
                  {formikBag.errors.position && formikBag.touched.position && (
                    <Typography color={errorColor}>
                      {formikBag.errors.position}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <DateTimePicker
                  label={t("pickUpDateLabel")}
                  value={
                    formikBag.values.pickUpDate
                      ? dayjs(formikBag.values.pickUpDate)
                      : null
                  }
                  onChange={(date) =>
                    formikBag.setFieldValue("pickUpDate", date)
                  }
                  sx={{}}
                />
                {formikBag.errors.pickUpDate &&
                  formikBag.touched.pickUpDate && (
                    <Typography color={errorColor}>
                      {formikBag.errors.pickUpDate}
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={5}>
                <DateTimePicker
                  label={t("returnDateLabel")}
                  value={
                    formikBag.values.returnDate
                      ? dayjs(formikBag.values.returnDate)
                      : null
                  }
                  onChange={(date) =>
                    formikBag.setFieldValue("returnDate", date)
                  }
                />
                {formikBag.errors.returnDate &&
                  formikBag.touched.returnDate && (
                    <Typography color={errorColor}>
                      {formikBag.errors.returnDate}
                    </Typography>
                  )}
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
                  {t("checkButton")}
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
