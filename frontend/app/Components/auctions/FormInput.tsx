import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps;
export default function FormInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <div className="mb-2 w-full">
      {props.showLabel && (
        <label className="label">
          <span className="label-text-alt">{props.label}</span>
        </label>
      )}
      <input
        {...props}
        {...field}
        type={props.type || "text"}
        placeholder={props.label}
        className={`text-xs input input-bordered w-full rounded-full focus:outline-none focus:border-primary ${
          fieldState.error
            ? "input-error"
            : !fieldState.isDirty
            ? ""
            : "input-success"
        } `}
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
