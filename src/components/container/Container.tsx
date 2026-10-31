import * as ContainerVariants from "./Container.variants";

type Props = {
  children: React.ReactNode;
  className?: string;
  size?: ContainerVariants.ContainerSize;
  align?: ContainerVariants.ContainerAlign;
  padding?: ContainerVariants.ContainerPadding;
};

const Container = ({ children, className, size, align, padding }: Props) => {
  return (
    <div
      className={ContainerVariants.containerVariants({
        size,
        align,
        padding,
        className,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
