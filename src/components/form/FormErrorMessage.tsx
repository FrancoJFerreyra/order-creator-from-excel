import { Field } from "@ark-ui/react";

type Props = {
  error?: string;
};

const FormErrorMessage = ({ error = "" }: Props) => {
  return (
    <Field.ErrorText
      className={`w-full wrap-break-word whitespace-normal text-error text-xs`}
    >
      {error}
    </Field.ErrorText>
  );
};

export default FormErrorMessage;
