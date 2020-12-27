import React, { Children } from 'react';
import ButtonStyles from './Button.module.css';

const BUTTON_WIDTH = 60;
const BUTTON_MARGINS = 10;

export type ButtonDenseGroupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ButtonDenseGroup: React.FC<ButtonDenseGroupProps> = ({
  className = '',
  style = {},
  ...props
}) => {
  const buttonsCount = Children.count(props.children);

  const width =
    buttonsCount * BUTTON_WIDTH +
    BUTTON_MARGINS * Math.max(1, buttonsCount - 1);

  return (
    <div
      className={ButtonStyles.ButtonDenseGroup + (className && ` ${className}`)}
      style={{ width, ...style }}
      {...props}
    />
  );
};

export default ButtonDenseGroup;
