import {  Select } from '@mui/base';
import { Field } from 'formik'
import React from 'react'

type Option = {
    value: number;
    label: string;
}

type Props = {
    label: string;
    name: string;
    options: Option[]
}

const FormikSelect = (props: Props) => {
    return (

        <div>
            <label>{props.label}</label>
            <Field

                as={Select}
                fullWidth
                id="type"
                name={props.name}
                variant="outlined"
            >
              {props.options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
               
            </Field>
        </div>

    )
}

export default FormikSelect;