import { ThunkDispatch } from "@reduxjs/toolkit/react";
import Button from "@mui/material/Button";
import { Box, Grid, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import SecondFormikInput from "../../FormikInput/SecondFormikInput";
import { toast } from "react-toastify";
import { UpdateCustomerPanelRequest } from "../../../models/CustomerModel/requests/updateCustomerPanelRequest";
import { putCustomerPanel } from "../../../store/slices/CustomerSlices/updateCustomerPanelSlice";
import { useEffect } from "react";
import { getAllCustomer } from "../../../store/slices/CustomerSlices/getAllCustomersSlice";
import { getAllUsers } from "../../../store/slices/getAllUsersSlice";

export default function UpdateCustomer() {
    const dispatch: ThunkDispatch<any, any, any> = useAppDispatch();
    const customers = useAppSelector(state => state.getAllCustomer.data)
    const users = useAppSelector(state => state.getAllUsers.data)

    const initialValues = {
        id: 0,
        firstName: "",
        lastName: "",
        tcNo: "",
        birthDate: undefined,
        userId: 0,
    };

    useEffect(() => {
        dispatch(getAllCustomer())
        dispatch(getAllUsers())
    }, [dispatch])

    const validationSchema = Yup.object({
        id: Yup.number().required("Id is required!"),
        firstName: Yup.string()
            .required("First name is required!")
            .min(2, "First name must be at least 2 characters!"),
        lastName: Yup.string()
            .required("Last name is required!")
            .min(2, "Last name must be at least 2 characters!"),
        tcNo: Yup.string().required("Identity Number is required!"),
        birthDate: Yup.number().moreThan(1900).required("Birth Date is required!"),
    });

    return (
        <>
            <Box>
                <Formik
                    initialValues={{ ...initialValues }}
                    validationSchema={validationSchema}
                    onSubmit={async (values: UpdateCustomerPanelRequest, { resetForm }) => {
                        console.log(values);
                        try {
                            resetForm();
                            await dispatch(putCustomerPanel(values))
                            dispatch(getAllCustomer())
                        } catch (error: any) {
                            toast.error(error.message);
                        }

                    }}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ borderBottom: 1, mb: 2 }}>
                                    Personal Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SecondFormikInput
                                    name="firstName"
                                    label="First Name*"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SecondFormikInput
                                    name="lastName"
                                    label="Last Name*"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field as={Select} name="id" sx={{ width: '100%' }}>
                                    <MenuItem value="0">Select The Customer Identity Number</MenuItem>
                                    {customers?.map((customer) => <MenuItem value={customer.id} key={customer.id}>{customer.tcNo}</MenuItem>)}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field as={Select} name="userId" sx={{ width: '100%' }}>
                                    <MenuItem value="0">Select The Customer Email</MenuItem>
                                    {users?.map((user) => <MenuItem value={user.id} key={user.id}>{user.email}</MenuItem>)}
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <SecondFormikInput
                                    name="birthDate"
                                    label="Birth Date"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ mb: 5 }}>
                                <SecondFormikInput
                                    name="tcNo"
                                    label="New Identity Number*"
                                    type="text"
                                />
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
                            {"Update"}
                        </Button>
                    </Form>
                </Formik>
            </Box>
        </>
    );
}
