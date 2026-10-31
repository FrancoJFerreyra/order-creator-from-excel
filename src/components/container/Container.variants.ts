import { tv } from "tailwind-variants";

export const containerVariants = tv({
  base: ["flex flex-col flex-1", "w-full"],
  variants: {
    size: {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      responsive: "",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-12",
      "2xl": "p-16",
      "3xl": "p-20",
      "4xl": "p-24",
      "5xl": "p-28",
    },
    align: {
      center: "items-center",
      end: "items-end",
      start: "items-start",
    },
  },
  defaultVariants: {
    size: "responsive",
    padding: "md",
  },
});

export type ContainerSize = keyof typeof containerVariants.variants.size;
export type ContainerPadding = keyof typeof containerVariants.variants.padding;
export type ContainerAlign = keyof typeof containerVariants.variants.align;
