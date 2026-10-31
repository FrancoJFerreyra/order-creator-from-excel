import { tv } from "tailwind-variants";

export const input = tv({
  base: ["input-field"],
  variants: {
    size: {
      sm: "text-base py-1 px-2 min-h-input-sm",
      md: "text-base py-2 px-3 min-h-input-md",
      lg: "text-base py-3 px-4 min-h-input-lg",
    },
    variant: {
      default: "",
      focused: "border-ui-primary focus:border-ui-primary",
      error: "border-red-500 focus:border-red-500",
      success: "border-green-500 focus:border-green-500",
      disabled: "bg-disabled border-input cursor-not-allowed",
      outlined: "border",
      filled: "border-none",
      underlined: "border-b",
      ghost: "border-none bg-transparent",
    },
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    fullWidth: true,
    textAlign: "left",
  },
});

export type Size = keyof typeof input.variants.size;
export type Variant = keyof typeof input.variants.variant;
export type TextAlign = keyof typeof input.variants.textAlign;
