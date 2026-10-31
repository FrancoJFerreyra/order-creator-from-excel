import type { ReactNode } from "react";
import FormLabel from "./FormLabel";
import { Field } from "@ark-ui/react";

interface FormFieldProps {
  children: ReactNode;
  endAddon?: ReactNode;
  fullWidth?: boolean;
  invalid?: boolean;
  label: string;
  name: string;
  required?: boolean;
  startAddon?: ReactNode;
}

const FormField = ({
  invalid,
  name,
  label,
  required,
  fullWidth,
  startAddon,
  endAddon,
  children,
}: FormFieldProps) => {
  return (
    <Field.Root className={fullWidth ? "w-full" : ""} invalid={invalid}>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <div className="flex items-center gap-2">
        {startAddon}
        {children}
        {endAddon}
      </div>
    </Field.Root>
  );
};

export default FormField;
