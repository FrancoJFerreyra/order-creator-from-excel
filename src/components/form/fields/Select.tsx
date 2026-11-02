import { useMemo } from "react";
import { Select as ArkSelect, createListCollection } from "@ark-ui/react";
import { CheckIcon } from "lucide-react";
import * as styles from "./Select.variants";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends Omit<
    ArkSelect.RootProps<SelectOption>,
    "collection" | "onValueChange" | "value"
  > {
  className?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  variant?: styles.Variant;
}

const Select = ({
  className,
  onValueChange,
  options,
  placeholder = "Selecciona una opción",
  value,
  variant,
  ...selectProps
}: SelectProps) => {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label,
      }),
    [options],
  );

  return (
    <ArkSelect.Root
      {...selectProps}
      className="w-full"
      collection={collection}
      value={value ? [value] : []}
      onValueChange={(details) => onValueChange?.(details.value[0] ?? "")}
    >
      <ArkSelect.HiddenSelect />
      <ArkSelect.Control>
        <ArkSelect.Trigger className={styles.trigger({ variant, className })}>
          <ArkSelect.ValueText placeholder={placeholder} />
          <ArkSelect.Indicator>
            <svg
              className="size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </ArkSelect.Indicator>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      <ArkSelect.Positioner>
        <ArkSelect.Content className={styles.content()}>
          <ArkSelect.List>
            {collection.items.map((item) => (
              <ArkSelect.Item
                key={item.value}
                item={item}
                className={styles.item({ selected: item.value === value })}
              >
                <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                <ArkSelect.ItemIndicator>
                  <CheckIcon className="size-4" />
                </ArkSelect.ItemIndicator>
              </ArkSelect.Item>
            ))}
          </ArkSelect.List>
        </ArkSelect.Content>
      </ArkSelect.Positioner>
    </ArkSelect.Root>
  );
};

export default Select;
