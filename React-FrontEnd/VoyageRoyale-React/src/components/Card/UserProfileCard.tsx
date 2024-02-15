import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button } from '@mui/material';
import { useAppSelector } from '../../store/configureStore';
import { getCustomerInfo } from '../../store/slices/CustomerSlices/customerInfoSlice';
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import { putCustomer } from '../../store/slices/CustomerSlices/updateCustomerSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getCustomerByEmail } from '../../store/slices/getCustomerByEmailSlice';
import { uploadCarImage } from '../../store/slices/addCarSlice';

const UserProfileCard: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const customer = useAppSelector(state => state.customerInfo.data);

  const [initialFormValues, setInitialFormValues] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    userEmail: '',
    tcNo: '',
    birthDate: '',
    userImagePath: ''
  });

  const email = useAppSelector(state => state.getCustomerByEmail.data?.email);
  useEffect(() => {
    dispatch(getCustomerInfo(email));
  }, [dispatch]);

  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      setInitialFormValues(JSON.parse(storedCustomer));
    }
  }, []);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('customer', JSON.stringify(customer));
      setInitialFormValues({
        id: customer?.id || 0,
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        userEmail: customer.userEmail || '',
        tcNo: customer.tcNo || '',
        birthDate: customer.birthDate || '',
        userImagePath: customer.userImagePath || ''

      });
    }
  }, [customer]);


  const validationSchema = Yup.object({
    id: Yup.number().moreThan(0),
    firstName: Yup.string()
      .required("First Name cannot be empty!"),
    lastName: Yup.string()
      .required("Last Name cannot be empty!"),
    userEmail: Yup.string()
      .email("Must be email format!")
      .required("Email is required"),
    tcNo: Yup.string().length(11, "Must be 11 character"),
    birthDate: Yup.string()
      .required("birth date is required")
  })
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files); // Seçilen dosyaları konsola yazdırır.
    if (files && files.length > 0) {
      setImageFile(files[0]);
      console.log("Dosya seçildi:", files[0]); // Seçilen ilk dosyanın detaylarını konsola yazdırır.
    } else {
      console.log("Dosya seçilmedi.");
    }
  };

  return (
    <Formik initialValues={initialFormValues} validationSchema={validationSchema}
      onSubmit={async (values: any, { setFieldValue, setValues, setSubmitting }) => {
        if (imageFile) {
          try {
            // İlk olarak resmi yükle
            const imageResponse = await dispatch(uploadCarImage(imageFile)).unwrap();
            values.userImagePath = imageResponse
            console.log(values.userImagePath)
            console.log(values)
          } catch (error) {
            console.error('Resim yükleme işlemi sırasında hata oluştu', error);
            return;
          }
        }

        const updatedValues = { ...values, userImagePath: values.userImagePath };
        dispatch(putCustomer(updatedValues))
          .unwrap()
          .then(updatedCustomer => {
            dispatch(getCustomerInfo(email))
              .unwrap()
              .then(freshCustomer => {
                setInitialFormValues(freshCustomer); // Form'un başlangıç değerlerini güncelle
                setValues(freshCustomer,false); // Formik değerlerini güncelle
              })
              .catch(error => console.error("Could not fetch updated customer:", error));
          })
          .catch(error => {
            console.error("Update failed:", error);
          })
          .finally(() => {
            setSubmitting(false); // İşlem bittiğinde submitting durumunu false yap
          });
      }}
      enableReinitialize // Bu prop initialValues her değiştiğinde formu yeniden başlatır
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Grid>
            <label htmlFor="file" style={{ cursor: 'pointer' }}>
              <input
                accept="image/*"
                type="file"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                id="file"
              />
              <Button component="span" style={{ padding: 0, borderRadius: '50%', overflow: 'hidden', display: 'inline-block' }}>
                <img src={values.userImagePath || "http://res.cloudinary.com/dklqpt5li/image/upload/v1707925414/vnxdusqgctmxjdifqqdd.png"} alt="Upload" style={{ width: 100, height: 100, objectFit: 'cover', clipPath: 'circle(50%)' }} />
              </Button>
            </label>

          </Grid>
          <Grid container spacing={2}>
            {/* Example: First Name Field */}
            <Grid item xs={12}>
              <TextField
                label="First Name"
                value={values.firstName || ''}
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
              />
              <TextField
                label="Last Name"
                value={values.lastName || ''}
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                value={values.userEmail || ''}
                name="userEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userEmail && Boolean(errors.userEmail)}
              />
              <TextField
                label="Birth Date"
                value={values.birthDate || ''}
                name="birthDate"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.birthDate && Boolean(errors.birthDate)}
              />
            </Grid>
            {/* Add other fields here in a similar fashion */}
          </Grid>
          <Button type="submit" color="primary" variant="contained" style={{ marginTop: '20px' }}>
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default UserProfileCard