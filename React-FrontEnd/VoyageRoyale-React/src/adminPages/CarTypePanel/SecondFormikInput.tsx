import {  TextField } from "@mui/material";
import { Field} from "formik";

type Props = {
	label: string;
	name: string;
    type: string | undefined
};

const SecondFormikInput = (props:Props) => {

	return (
        <Field 
        as={TextField}
        name={props.name}
        label={props.label}
        type={props.type || "text"}
        >

        </Field>
	);
};

export default SecondFormikInput;