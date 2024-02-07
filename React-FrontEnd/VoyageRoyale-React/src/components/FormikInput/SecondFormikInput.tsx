import {  TextField } from "@mui/material";
import { ErrorMessage, Field} from "formik";

type Props = {
	label: string;
	name: string;
    type: string | undefined
};

const SecondFormikInput = (props:Props) => {

	return (<>
    
    <Field 
        as={TextField}
        name={props.name}
        label={props.label}
        type={props.type || "text"}
        >

        </Field>
        <br />
        <ErrorMessage name={props.name}></ErrorMessage>
    
    </>
        
	);
};

export default SecondFormikInput;