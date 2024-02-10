// import { ErrorMessage, Field } from "formik";
// import * as React from "react";
// import DatePicker from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { TextField } from "@mui/material";
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// interface Props {
//   name: string;
//   label: string;
// }

// const ThirdFormikInput: React.FC<Props> = ({ name, label, ...props }) => (
//   <>
//     <LocalizationProvider 
//       dateAdapter={AdapterDayjs} 
//     >
//       <Field
//         as={DatePicker}
//         name={name}
//         label={label}
//         format="dd-MM-yyyy" 
//         renderInput={(params:any) => (
//           <TextField {...params} placeholder="Birth Date" /> 
//         )}
//         KeyboardButtonProps={{ 
//           icon: <CalendarTodayIcon />, 
//           label: "Select Date",
//         }}
//       />
//     </LocalizationProvider>
//     <br />
//     <ErrorMessage name={name} />
//   </>
// );

// export default ThirdFormikInput;
