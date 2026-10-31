import type { ReactNode, ButtonHTMLAttributes, JSX } from "react";
import * as styles from "./Button.variants";

const defaultLoadingSlot = (
  <span className="inline-flex shrink-0" aria-hidden>
    <span className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
  </span>
);

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  color?: styles.ButtonColor;
  disabled?: boolean;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingSlot?: ReactNode;
  size?: styles.ButtonSize;
  startIcon?: ReactNode;
  variant?: styles.ButtonVariant;
}

export const Button = ({
  children,
  className,
  color = "primary",
  disabled = false,
  endIcon,
  fullWidth = false,
  isLoading = false,
  loadingSlot,
  size = "md",
  startIcon,
  variant = "solid",
  ...props
}: IButton): JSX.Element => {
  const isBusy = disabled || isLoading;
  return (
    <button
      {...props}
      className={styles.button({
        color,
        variant,
        size,
        fullWidth,
        disabled: isBusy,
        hasStartIcon: Boolean(startIcon),
        className,
      })}
      disabled={isBusy}
      aria-busy={isLoading || undefined}
    >
      <div className="flex items-center gap-2">
        {startIcon ? (
          <span className="inline-flex shrink-0">{startIcon}</span>
        ) : null}
        {isLoading ? (loadingSlot ?? defaultLoadingSlot) : children}
        {endIcon ? (
          <span className="inline-flex shrink-0">{endIcon}</span>
        ) : null}
      </div>
    </button>
  );
};
