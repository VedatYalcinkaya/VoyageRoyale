import {  TextField } from "@mui/material";
import {Field, useField} from "formik";

type Props = {
	label: string;
	name: string;
    type: string | undefined
};

const SecondFormikInput = (props:Props) => {
  const [field, meta] = useField(props.name);

	return (<>
    
    <Field 
        as={TextField}
        name={props.name}
        label={props.label}
        type={props.type || "text"}
        fullWidth
        value={field.value ?? ""} 
        onChange={field.onChange} 
        onBlur={field.onBlur} // 
        error={meta.touched && Boolean(meta.error)} 
        helperText={meta.touched && meta.error} 
        >

        </Field>

    
    </>
        
	);
};

export default SecondFormikInput;
