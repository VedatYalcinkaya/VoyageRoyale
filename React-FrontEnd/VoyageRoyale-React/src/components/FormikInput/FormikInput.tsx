import { Button, TextField } from "@mui/material";
import {ErrorMessage, Field, Form, useField} from "formik";

type Props = {
	label: string;
	name: string;
	type?: string; // type: string | undefined
};

const FormikInput = ({...props}:any) => {
    console.log(props)
    const [field,meta] = useField(props)
    console.log(field)
	return (
        <Field 
        as={TextField}
        fullWidth
        id={props.id}
        name={props.name}
        label={props.label}
        value={props.formikBag.values.name}
        >
            

        </Field>
	);
};

export default FormikInput;