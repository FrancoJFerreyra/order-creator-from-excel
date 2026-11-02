import * as styles from "./fields/Select.variants";
import FormErrorMessage from "./FormErrorMessage";
import FormField from "./FormField";
import Select, { type SelectOption } from "./fields/Select";

interface Props {
  disabled?: boolean;
  error?: string;
  fullWidth?: boolean;
  label: string;
  name: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  value: string;
  variant?: styles.Variant;
}

const FormSelect = ({
  disabled = false,
  error,
  fullWidth = true,
  label,
  name,
  onValueChange,
  options,
  placeholder,
  required = false,
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
        required={required}
      >
        <div className={`${isFullWidth} flex flex-col gap-2`}>
          <Select
            className={isFullWidth}
            disabled={disabled || !options.length}
            ids={{ trigger: name }}
            invalid={!!error}
            onValueChange={onValueChange}
            options={options}
            placeholder={placeholder}
            value={value}
            variant={disabled || !options.length ? "disabled" : error ? "error" : variant}
          />
          {error && <FormErrorMessage error={error} />}
        </div>
      </FormField>
    </div>
  );
};

export default FormSelect;
