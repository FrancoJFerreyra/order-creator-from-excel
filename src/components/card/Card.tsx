import React from "react";
import * as variantStyles from "./Card.variants";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: variantStyles.CardPadding;
  radius?: variantStyles.CardRadius;
  shadows?: variantStyles.CardShadows;
  color?: variantStyles.CardColor;
  height?: variantStyles.CardHeight;
};

const Card = ({ onClick = () => {}, children, ...variants }: Props) => {
  return (
    <div className={variantStyles.card({ ...variants })} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
