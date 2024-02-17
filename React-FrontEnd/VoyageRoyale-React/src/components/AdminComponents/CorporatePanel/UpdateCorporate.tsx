import { ThunkDispatch } from "@reduxjs/toolkit/react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import SecondFormikInput from "../../FormikInput/SecondFormikInput";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { useEffect } from "react";
import { getAllCorporate } from "../../../store/slices/CorporateCustomerSlice/getAllCorporateSlice";
import { UpdateCorporatePanelRequest } from "../../../models/CorporateCustomerModel/requests/updateCorporatePanelRequest";
import { putCorporate } from "../../../store/slices/CorporateCustomerSlice/updateCorporatePanelSlice";
import { getAllUsers } from "../../../store/slices/getAllUsersSlice";
export default function UpdateCorporate() {
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
    const corporate = useAppSelector(state => state.getAllCorporate.data)
    const users = useAppSelector(state => state.getAllUsers.data)

    useEffect(() => {
        dispatch(getAllCorporate())
        dispatch(getAllUsers())
    }, []);


    const initialValues = {
        id: 0,
        companyName: "",
        taxNo: "",
        userId: 0,
    };

    const validationSchema = Yup.object({
        id: Yup.number().required("Id is required!"),
        companyName: Yup.string()
            .required("Company name is required!")
            .min(2, "Type at least 2 characters"),
        taxNo: Yup.string()
            .required("Tax Number is required")
            .min(11, "Tax number must be 11 characters"),
        userId: Yup.number().required("User Id is required!"),
    });

    return (
        <>
            <Box>
                <Formik
                    initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={async (values: UpdateCorporatePanelRequest, { resetForm }) => {
                        console.log(values);
                        resetForm();
                        await dispatch(putCorporate(values))
                        dispatch(getAllCorporate())
                    }}
                >

                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ borderBottom: 1, mb: 2 }}>
                                    Corporate Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SecondFormikInput
                                    name="companyName"
                                    label="Company Name*"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                                <SecondFormikInput
                                    name="taxNo"
                                    label="New Tax Number*"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field as={Select} name="id" sx={{ width: '100%' }}>
                                    <MenuItem value="0">Select The Customer Tax Number</MenuItem>
                                    {corporate?.map((corporate) => <MenuItem value={corporate.id} key={corporate.id}>{corporate.taxNo}</MenuItem>)}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field as={Select} name="userId" sx={{ width: '100%' }}>
                                    <MenuItem value="0">Select The Corporate Email</MenuItem>
                                    {users?.map((user) => <MenuItem value={user.id} key={user.id}>{user.email}</MenuItem>)}
                                </Field>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                height: 40,
                                color: "#D4D2A9",
                                backgroundColor: "#0F4037",
                                "&:hover": {
                                    backgroundColor: "#A3794F",
                                    color: "#0F4037",
                                },
                            }}
                        >
                            {"Save"}
                        </Button>
                    </Form>

                </Formik>
            </Box>
        </>
    );
}
