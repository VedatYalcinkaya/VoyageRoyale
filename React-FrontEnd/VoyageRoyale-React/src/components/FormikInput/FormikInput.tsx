import { TextField } from "@mui/material";
import { Field, useField } from "formik";
import React from "react";

type Props = {
  label: string;
  name: string;
  type?: string; // type: string | undefined
};

const FormikInput: React.FC<Props> = ({ label, name, type, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <Field
        {...props}
        {...field}
        as={TextField}
        fullWidth
        id={name}
        label={label}
        type={type}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    </div>
  );
};

export default FormikInput;
