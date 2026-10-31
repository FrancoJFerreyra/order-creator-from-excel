import { tv } from "tailwind-variants";

const colors = [
  "primary",
  "secondary",
  "success",
  "info",
  "error",
  "warning",
] as const;
export type ButtonColor = (typeof colors)[number];

const makeCompound = (
  variant: "solid" | "ghost" | "outlined",
  fn: (color: ButtonColor) => string[],
) => colors.map((color) => ({ variant, color, className: fn(color) }));

const solidStyles: Record<ButtonColor, string[]> = {
  primary: [
    "bg-ui-primary/90",
    "text-ui-primary-foreground",
    "active:bg-ui-primary",
  ],
  secondary: [
    "bg-ui-secondary/90",
    "text-ui-secondary-foreground",
    "active:bg-ui-secondary",
  ],
  success: [
    "bg-ui-success/90",
    "text-ui-success-foreground",
    "active:bg-ui-success",
  ],
  info: ["bg-ui-info/90", "text-ui-info-foreground", "active:bg-ui-info"],
  error: ["bg-ui-error/90", "text-ui-error-foreground", "active:bg-ui-error"],
  warning: [
    "bg-ui-warning/90",
    "text-ui-warning-foreground",
    "active:bg-ui-warning",
  ],
};

const ghostStyles: Record<ButtonColor, string[]> = {
  primary: ["active:bg-ui-primary/30"],
  secondary: ["active:bg-ui-secondary/30"],
  success: ["active:bg-ui-success/30"],
  info: ["active:bg-ui-info/30"],
  error: ["active:bg-ui-error/30"],
  warning: ["active:bg-ui-warning/30"],
};

const outlinedStyles: Record<ButtonColor, string[]> = {
  primary: [
    "border-ui-primary-border text-ui-primary",
    "active:bg-ui-primary/10",
  ],
  secondary: [
    "border-ui-secondary-border text-ui-secondary",
    "active:bg-ui-secondary/10",
  ],
  success: [
    "border-ui-success-border text-ui-success",
    "active:bg-ui-success/10",
  ],
  info: ["border-ui-info-border text-ui-info", "active:bg-ui-info/10"],
  error: ["border-ui-error-border text-ui-error", "active:bg-ui-error/10"],
  warning: [
    "border-ui-warning-border text-ui-warning",
    "active:bg-ui-warning/10",
  ],
};

export const button = tv({
  base: [
    "flex justify-center items-center",
    "font-semibold text-center !leading-tight",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 focus-visible:shadow-none",
    "cursor-pointer select-none transition-all duration-200",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]",
    "rounded-2xl",
  ],
  variants: {
    variant: {
      solid: "",
      ghost: ["bg-transparent", "transition-colors duration-300"],
      outlined: ["border-2", "bg-transparent"],
      navigation: [
        "border border-ui-navigation-border/50",
        "bg-ui-navigation-foreground/10",
        "text-ui-navigation-foreground",
        "hover:bg-ui-navigation-foreground/20",
        "active:bg-ui-navigation-foreground/30",
      ],
      icon: [
        "flex items-center justify-center",
        "border border-ui-secondary-border",
        "bg-ui-secondary text-ui-secondary-foreground",
        "shadow-sm",
        "active:brightness-95",
        "rounded-2xl",
      ],
      "language-flag": ["w-20 h-20 rounded-full overflow-hidden", "border-2"],
      "home-action": [
        "flex items-center justify-start relative overflow-hidden",
        "h-44 landscape:h-28 w-full",
        "gap-8 px-12 landscape:px-8",
        "text-3xl leading-none font-semibold tracking-tight text-white",
        "shadow-2xl shadow-black/40",
      ],
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      error: "",
      warning: "",
    },
    size: {
      none: "",
      icon: ["p-2"],
      sm: ["px-3 py-2", "text-sm"],
      md: ["px-5 py-3", "text-base"],
      lg: ["px-7 py-4", "text-lg"],
      xl: ["px-8 py-5", "text-2xl"],
    },
    fullWidth: { true: ["w-full"], false: "" },
    disabled: {
      true: ["opacity-70", "cursor-not-allowed pointer-events-none"],
      false: "",
    },
    hasStartIcon: { true: ["gap-2"], false: "" },
  },
  compoundVariants: [
    ...makeCompound("solid", (color) => solidStyles[color]),
    ...makeCompound("ghost", (color) => ghostStyles[color]),
    ...makeCompound("outlined", (color) => outlinedStyles[color]),
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    disabled: false,
    size: "md",
    fullWidth: false,
    hasStartIcon: false,
  },
});

export type ButtonVariant = keyof typeof button.variants.variant;
export type ButtonSize = keyof typeof button.variants.size;
