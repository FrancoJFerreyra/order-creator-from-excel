import * as styles from "./fields/Input.variants";
import type { ReactNode } from "react";
import FormErrorMessage from "./FormErrorMessage";
import FormField from "./FormField";
import Input from "./fields/Input";

interface Props {
  endAddon?: ReactNode;
  endAdornment?: ReactNode;
  error?: string;
  fullWidth?: boolean;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  startAddon?: ReactNode;
  value: string;
  variant?: styles.Variant;
};

const FormInput =
  ({
    endAddon,
    endAdornment,
    error,
    fullWidth = true,
    label,
    name,
    onChange,
    placeholder,
    required = false,
    startAddon,
    value,
    variant,
  }: Props) => {
    const isFullWidth = fullWidth ? "w-full" : "";
    return (
      <div className={isFullWidth}>
        <FormField
          invalid={!!error}
          name={name}
          label={label}
          startAddon={startAddon}
          endAddon={endAddon}
          required={required}
        >
          <div className={`${isFullWidth} flex flex-col gap-2`}>
            <Input
              className={isFullWidth}
              endAdornment={endAdornment}
              onChange={onChange}
              placeholder={placeholder}
              value={value}
              variant={error ? "error" : variant}
            />
            {error && <FormErrorMessage error={error} />}
          </div>
        </FormField>
      </div>
    );
  };

export default FormInput;
