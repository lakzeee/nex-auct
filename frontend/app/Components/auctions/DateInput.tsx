import { useController, UseControllerProps } from "react-hook-form";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps &
  Partial<ReactDatePickerProps>;
export default function DateInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <div className="mb-2">
      <ReactDatePicker
        {...props}
        {...field}
        onChange={(value) => field.onChange(value)}
        selected={field.value}
        placeholderText={props.label}
        className={`input text-xs rounded-full w-[100%] flex flex-col bg-base-100 p-3 border-base-100 focus:outline-none focus:border-primary ${
          fieldState.error
            ? "input-error"
            : !fieldState.isDirty
            ? ""
            : "input-success"
        }`}
      />
      {fieldState.error?.message && (
        <label className="label">
          <span className="label-text-alt text-error">
            {fieldState.error?.message}
          </span>
        </label>
      )}
    </div>
  );
}
