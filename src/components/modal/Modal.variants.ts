import { tv } from "tailwind-variants";

export const modal = tv({
  base: ["m-auto w-full bg-transparent p-0 backdrop:bg-black/60 text-inherit"],
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const modalContent = tv({
  base: ["flex flex-col gap-4"],
});

export type ModalSize = keyof typeof modal.variants.size;
