import { Button } from '@mui/material';
import { Form, Formik } from 'formik'
import * as Yup from "yup";
import { AddBrandRequest } from '../../../models/CarBrandModel/requests/addBrandRequest';
import { postBrand } from '../../../store/slices/addBrandSlice';
import { useAppDispatch } from '../../../store/configureStore';
import { getCarBrandType } from '../../../store/slices/CarSlices/carBrandTypeSlice';
import SecondFormikInput from '../../FormikInput/SecondFormikInput';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBrand() {
    const dispatch = useAppDispatch();
    const initialValues = { name: "" }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Brand name is required.")
            .min(2, "Brand name must be at least 2 characters."),
    });

    dispatch(getCarBrandType());
    return (
        <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={ async (values: AddBrandRequest, { resetForm }) => {
                console.log(values);
                resetForm();
                await dispatch(postBrand(values));
                
            }}
        >
            <Form>
                <SecondFormikInput name="name"  label="Brand Name" type='text' />
                <br />
                <Button type="submit" variant='contained'>Save</Button>
            </Form>
        </Formik>
    );
}

export default AddBrand;
