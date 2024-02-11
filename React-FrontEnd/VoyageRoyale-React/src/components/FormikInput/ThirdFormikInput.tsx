import { DateField, DatePicker } from "@mui/x-date-pickers";

type Props = {
  name: string;
  label: string;
};

const ThirdFormikInput = (props: Props) => {
  return (
    <>
      <DateField>
        <DatePicker name={props.name} label={props.label} />

        <br />
      </DateField>
    </>
  );
};

export default ThirdFormikInput;
