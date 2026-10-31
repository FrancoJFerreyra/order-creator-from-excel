import { tv } from "tailwind-variants";

export const card = tv({
  base: ["card"],
  variants: {
    color: {
      default: "bg-card",
      contrast: "bg-card-contrast border-card-contrast-border",
    },
    padding: {
      none: "p-0",
      sm: "p-2",
      md: "p-6",
      lg: "p-10",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      "4xl": "rounded-4xl",
      "5xl": "rounded-5xl",
    },
    shadows: {
      false: "shadow-none",
      true: "shadow-lg shadow-black/30",
    },
    height: {
      full: "h-full",
      auto: "h-auto",
    },
  },
  defaultVariants: {
    padding: "md",
    radius: "md",
    shadows: true,
    color: "default",
    height: "full",
  },
});

export type CardPadding = keyof typeof card.variants.padding;
export type CardRadius = keyof typeof card.variants.radius;
export type CardShadows = boolean;
export type CardColor = keyof typeof card.variants.color;
export type CardHeight = keyof typeof card.variants.height;
