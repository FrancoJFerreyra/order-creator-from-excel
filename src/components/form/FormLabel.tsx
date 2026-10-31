import React from "react";
import { Field } from "@ark-ui/react";

type Props = {
  children: React.ReactNode;
  required?: boolean;
  htmlFor: string;
};

const FormLabel = ({ children, required, htmlFor }: Props) => {
  return (
    <Field.Label htmlFor={htmlFor} className="pb-1">
      {children} {required && <span className="text-error">*</span>}
    </Field.Label>
  );
};

export default FormLabel;
