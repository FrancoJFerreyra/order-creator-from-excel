import { tv } from "tailwind-variants";

export const trigger = tv({
  base: [
    "input-field",
    "flex w-full items-center justify-between gap-2 text-left",
  ],
  variants: {
    size: {
      sm: "text-base py-1 px-2 min-h-input-sm",
      md: "text-base py-2 px-3 min-h-input-md",
      lg: "text-base py-3 px-4 min-h-input-lg",
    },
    variant: {
      default: "",
      error: "border-red-500 focus-visible:border-red-500",
      disabled: "bg-disabled border-input cursor-not-allowed",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export const content = tv({
  base: [
    "z-50 min-w-(--reference-width) rounded-xl border-2 border-input bg-input p-1 shadow-lg outline-none",
  ],
});

export const item = tv({
  base: [
    "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-base outline-none",
  ],
  variants: {
    selected: {
      true: "bg-ui-primary",
      false: "data-[highlighted]:bg-ui-primary/50"
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export type Size = keyof typeof trigger.variants.size;
export type Variant = keyof typeof trigger.variants.variant;
