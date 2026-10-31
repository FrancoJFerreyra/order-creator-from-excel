import { type InputHTMLAttributes, type ReactNode } from "react";
import * as styles from "./Input.variants";
import { Field } from "@ark-ui/react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  endAdornment?: ReactNode;
  variant?: styles.Variant;
}

const Input = ({
  className,
  endAdornment,
  variant,
  ...inputProps
}: InputProps) => {
  return (
    <div className="relative w-full">
      <Field.Input
        {...inputProps}
        className={styles.input({ variant, className })}
      />
      {endAdornment && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {endAdornment}
        </div>
      )}
    </div>
  );
};

export default Input;
