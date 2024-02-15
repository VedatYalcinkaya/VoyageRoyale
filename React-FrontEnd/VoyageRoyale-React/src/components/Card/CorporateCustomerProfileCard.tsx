import React from 'react'
//AŞAĞIDAKİ KODLARI YORUM SATIRINA ALINCA SİTE ÇALIŞMADI. O YÜZDEN DEFAULT FONKSİYON VAR
function CorporateCustomerProfileCard() {
  return (
    <div>CorporateCustomerProfileCard</div>
  )
}

export default CorporateCustomerProfileCard
// import React, { useEffect, useState } from "react";
// import { Grid, TextField, Button, Paper, Typography } from "@mui/material";
// import { useAppSelector } from "../../store/configureStore";
// import { getCustomerInfo } from "../../store/slices/CustomerSlices/customerInfoSlice";
// import * as Yup from "yup";
// import { Form, Formik } from "formik";
// import { putCustomer } from "../../store/slices/CustomerSlices/updateCustomerSlice";
// import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

// import { uploadCarImage } from "../../store/slices/addCarSlice";
// import { getCorporateCustomerInfo } from "../../store/slices/CorporateCustomerSlice/corporateCustomerInfoSlice";
// import { CorporateCustomer } from "../../models/CorporateCustomerModel/getCorporateCustomerByEmail";

// const UserProfileCard: React.FC = () => {
//   const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
//   const corporateCustomer = useAppSelector(
//     (state) => state.corporateCustomerInfo.data
//   );
//   const email = useAppSelector((state) => state.getCustomerByEmail.data?.email);

//   const [initialFormValues, setInitialFormValues] = useState({
//     id: 0,
//     companyName: "",
//     taxNo: "",
//     userEmail: "",
//   });

//   const [isFormDirty, setIsFormDirty] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   useEffect(() => {
//     dispatch(getCorporateCustomerInfo(email));
//   }, [dispatch]);

//   useEffect(() => {
//     const storedCorporateCustomer = localStorage.getItem("corporateCustomer");
//     if (storedCorporateCustomer) {
//       setInitialFormValues(JSON.parse(storedCorporateCustomer));
//     }
//   }, []);

//   useEffect(() => {
//     if (corporateCustomer) {
//       localStorage.setItem("customer", JSON.stringify(corporateCustomer));
//       setInitialFormValues({
//         id: corporateCustomer?.id || 0,
//         companyName: corporateCustomer.companyName || "",
//         taxNo: corporateCustomer.taxNo || "",
//         userEmail: corporateCustomer.userEmail || "",
//       });
//     }
//   }, [corporateCustomer]);

//   const validationSchema = Yup.object({
//     id: Yup.number().moreThan(0),
//     companyName: Yup.string().required("Company Name cannot be empty!"),
//     taxNo: Yup.string().required("Tax No cannot be empty!"),
//     userEmail: Yup.string()
//       .email("Must be email format!")
//       .required("Email is required"),
//   });

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       setImageFile(files[0]);
//     }
//   };

//   return (
//     <Formik
//       initialValues={initialFormValues}
//       validationSchema={validationSchema}
//       onSubmit={async (values: any, { setSubmitting }) => {
//         if (imageFile) {
//           try {
//             const imageResponse = await dispatch(
//               uploadCarImage(imageFile)
//             ).unwrap();
//             values.userImagePath = imageResponse;
//           } catch (error) {
//             console.error("Error uploading image", error);
//             setSubmitting(false);
//             return;
//           }
//         }

//         dispatch(putCustomer(values))
//           .unwrap()
//           .then((updatedCorporateCustomer) => {
//             dispatch(getCustomerInfo(email))
//               .unwrap()
//               .then((freshCustomer: Customer) => {
//                 const freshCorporateCustomer =
//                   freshCustomer as CorporateCustomer; 
//                 setInitialFormValues({
//                   id: freshCorporateCustomer.id || 0,
//                   companyName: freshCorporateCustomer.companyName || "",
//                   taxNo: freshCorporateCustomer.taxNo || "",
//                   userEmail: freshCorporateCustomer.userEmail || "",
//                 });
//               })
//               .catch((error) =>
//                 console.error("Could not fetch updated customer:", error)
//               );
//           })
//           .catch((error) => {
//             console.error("Update failed:", error);
//           })
//           .finally(() => {
//             setSubmitting(false);
//             setIsFormDirty(false);
//           });
//       }}
//       enableReinitialize
//     >
//       {({ values, errors, touched, handleChange, handleBlur }) => (
//         <Form>
//           <Grid container sx={{ pl: 10, pr: 10 }}>
//             <Grid item xs={12} textAlign={"center"}>
//               <Paper
//                 elevation={3}
//                 style={{
//                   padding: "20px",
//                   backgroundColor: "#0F4037",
//                   height: 100,
//                 }}
//               >
//                 <label htmlFor="file" style={{ cursor: "pointer" }}>
//                   <input
//                     accept="image/*"
//                     type="file"
//                     onChange={handleFileSelect}
//                     style={{ display: "none" }}
//                     id="file"
//                   />
//                   <Button component="span">
//                     <img
//                       src={
//                         values.userImagePath ||
//                         "https://i.ibb.co/4KynzQ7/avatar2.png"
//                       }
//                       alt="Upload"
//                       style={{
//                         width: 130,
//                         height: 130,
//                         objectFit: "cover",
//                         clipPath: "circle(50%)",
//                         marginBottom: "-100px",
//                       }}
//                     />
//                   </Button>
//                 </label>
//               </Paper>
//             </Grid>
//             <Grid item xs={12}>
//               <Paper
//                 elevation={3}
//                 style={{ padding: "20px", backgroundColor: "white" }}
//               >
//                 <Typography variant="h5" sx={{ mb: 4 }}>
//                   Account
//                 </Typography>
//                 <Typography variant="h6" sx={{ mb: 3, borderBottom: 1 }}>
//                   Profile
//                 </Typography>
//                 <TextField
//                   label="Company Name"
//                   value={values.companyName || ""}
//                   name="companyName"
//                   onChange={handleChange}
//                   onBlur={(e) => {
//                     handleBlur(e);
//                     setIsFormDirty(true);
//                   }}
//                   error={touched.companyName && Boolean(errors.companyName)}
//                   style={{ marginBottom: "20px", marginRight: "20px" }}
//                 />
//                 <TextField
//                   label="Tax No"
//                   value={values.taxNo || ""}
//                   name="taxNo"
//                   onChange={handleChange}
//                   onBlur={(e) => {
//                     handleBlur(e);
//                     setIsFormDirty(true);
//                   }}
//                   error={touched.taxNo && Boolean(errors.taxNo)}
//                 />
//                 <Typography variant="h6" sx={{ mb: 3, borderBottom: 1 }}>
//                   Email
//                 </Typography>
//                 <TextField
//                   label="E-mail"
//                   value={values.userEmail || ""}
//                   name="userEmail"
//                   onChange={handleChange}
//                   onBlur={(e) => {
//                     handleBlur(e);
//                     setIsFormDirty(true);
//                   }}
//                   error={touched.userEmail && Boolean(errors.userEmail)}
//                   style={{ marginBottom: "20px", marginRight: "20px" }}
//                 />
//                 <br />
//                 <Button
//                   type="submit"
//                   color="primary"
//                   variant="contained"
//                   style={{ marginTop: "20px" }}
//                   disabled={!isFormDirty}
//                 >
//                   Update
//                 </Button>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default UserProfileCard;
