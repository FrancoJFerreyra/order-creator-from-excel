import { NumberInput } from "@ark-ui/react";
import { type InputProps } from "./Input";
import * as styles from "./Input.variants";

interface Props extends InputProps {
  formatOptions: Intl.NumberFormatOptions;
}

const InputNumber = ({
  className,
  formatOptions,
  variant,
  value,
  onChange,
  ...inputProps
}: Props) => {
  return (
    <NumberInput.Root
      className="w-full"
      formatOptions={formatOptions}
      value={value == null ? "" : String(value)}
      onValueChange={({ valueAsNumber }) => {
        onChange?.({
          target: {
            name: inputProps.name,
            value: Number.isNaN(valueAsNumber) ? "" : valueAsNumber,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
    >
      <NumberInput.Control className="flex items-center w-full">
        <NumberInput.Input
          className={styles.input({ variant, className })}
          {...inputProps}
        />
      </NumberInput.Control>
    </NumberInput.Root>
  );
};

export default InputNumber;
