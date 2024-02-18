import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/configureStore';
import { getCorporateCustomerInfo } from '../../store/slices/CorporateCustomerSlice/corporateCustomerInfoSlice';
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import { putCorporateCustomer } from '../../store/slices/CorporateCustomerSlice/updateCorporateCustomerSlice';
import { Button, Grid, TextField } from '@mui/material';

import { uploadImage } from '../../store/slices/imageUploadSlice';

const CorporateCustomerProfileCard: React.FC = () => {
const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const corporateCustomer = useAppSelector(state => state.corporateCustomerInfo.data);

  const [initialFormValues, setInitialFormValues] = useState({
    id: 0,
    companyName:  '',
    taxNo: '',
    userEmail: '',
    userImagePath: ''
  }); 
  const email = useAppSelector(state => state.getCustomerByEmail.data?.email);
  useEffect(() => {
    dispatch(getCorporateCustomerInfo(email));
  }, [dispatch]);

  useEffect(() => {
    const storedCorporateCustomer = localStorage.getItem('corporateCustomer');
    if (storedCorporateCustomer) {
      setInitialFormValues(JSON.parse(storedCorporateCustomer));
    }
  }, []);

  useEffect(() => {
    if (corporateCustomer) {
      localStorage.setItem('corporateCustomer', JSON.stringify(corporateCustomer));
      setInitialFormValues({
        id: corporateCustomer?.id || 0,
        companyName: corporateCustomer.companyName || '',
        taxNo: corporateCustomer.taxNo || '',
        userEmail: corporateCustomer.userEmail || '',
        userImagePath: corporateCustomer.userImagePath || ''
      });
    }
  }, [corporateCustomer]);

  const validationSchema = Yup.object({
    id: Yup.number().moreThan(0),
    companyName: Yup.string()
      .required("Company Name cannot be empty!"),
    taxNo: Yup.string()
      .required("Tax No cannot be empty!"),
    userEmail: Yup.string()
      .email("Must be email format!")
      .required("Email is required"),
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
      onSubmit={async (values: any, {setValues, setSubmitting }) => {
        if (imageFile) {
          try {
            // İlk olarak resmi yükle
            const imageResponse = await dispatch(uploadImage(imageFile)).unwrap();
            values.userImagePath = imageResponse
            console.log(values.userImagePath)
            console.log(values)
          } catch (error) {
            console.error('Resim yükleme işlemi sırasında hata oluştu', error);
            return;
          }
        }

        const updatedValues = { ...values, userImagePath: values.userImagePath };
        dispatch(putCorporateCustomer(updatedValues))
        .unwrap()
        .then(updatedCorporateCustomer => {
          dispatch(getCorporateCustomerInfo(email))
          .unwrap()
          .then(freshCorporateCustomer => {
            setInitialFormValues(freshCorporateCustomer); // Form'un başlangıç değerlerini güncelle
            setValues(freshCorporateCustomer); // Formik değerlerini güncelle
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
      {({ values ,errors, touched, handleChange, handleBlur }) => (
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
                label="Company Name"
                value={values.companyName || ''}
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.companyName && Boolean(errors.companyName)}
              />
              <TextField
                label="Tax Number"
                value={values.taxNo || ''}
                name="taxNo"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.taxNo && Boolean(errors.taxNo)}
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
            </Grid>
          </Grid>
          <Button type="submit" color="primary" variant="contained" style={{ marginTop: '20px' }}>
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default CorporateCustomerProfileCard