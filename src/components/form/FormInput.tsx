import * as styles from "./fields/Input.variants";
import type { ReactNode } from "react";
import FormErrorMessage from "./FormErrorMessage";
import FormField from "./FormField";
import Input from "./fields/Input";
import InputNumber from "./fields/InputNumber";

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
  type?: "text" | "number";
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
    type,
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
            {type == "number" ? (
              <InputNumber
                aria-invalid={!!error}
                className={isFullWidth}
                endAdornment={endAdornment}
                formatOptions={{
                  maximumFractionDigits: 1,
                }}
                id={name}
                onChange={onChange}
                placeholder={placeholder}
                step={1}
                type="number"
                value={value}
                variant={error ? "error" : variant}
              />
            ) : (
              <Input
                aria-invalid={!!error}
                className={isFullWidth}
                endAdornment={endAdornment}
                id={name}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value}
                variant={error ? "error" : variant}
              />
            )
            }
            {error && <FormErrorMessage error={error} />}
          </div>
        </FormField>
      </div>
    );
  };

export default FormInput;
