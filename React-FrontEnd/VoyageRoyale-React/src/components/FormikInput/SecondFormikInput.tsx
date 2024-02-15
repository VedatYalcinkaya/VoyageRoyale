import {  TextField } from "@mui/material";
import { ErrorMessage, Field, useField} from "formik";

type Props = {
	label: string;
	name: string;
    type: string | undefined
};

const SecondFormikInput = (props:Props) => {
  // Use the useField hook from Formik to get the field props
  const [field, meta] = useField(props.name);

	return (<>
    
    <Field 
        as={TextField}
        name={props.name}
        label={props.label}
        type={props.type || "text"}
        fullWidth
        value={field.value ?? ""} // Pass the value prop
        onChange={field.onChange} // Pass the onChange prop
        onBlur={field.onBlur} // Pass the onBlur prop
        error={meta.touched && Boolean(meta.error)} // Handle the error state
        helperText={meta.touched && meta.error} // Show the error message
        >

        </Field>

    
    </>
        
	);
};

export default SecondFormikInput;
