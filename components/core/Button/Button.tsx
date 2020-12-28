import React from 'react';
import ButtonStyles from './Button.module.css';
import ButtonDenseGroup from './ButtonDenseGroup';
import ButtonGroup from './ButtonGroup';

export type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { color?: React.CSSProperties['backgroundColor'] };

const Button: React.FC<ButtonProps> & {
  Group: typeof ButtonGroup;
  DenceGroup: typeof ButtonDenseGroup;
} = ({ className = '', color, style, ...props }) => (
  <div
    className={ButtonStyles.Button + (className && ` ${className}`)}
    style={{ backgroundColor: color, ...style }}
    {...props}
  />
);

Button.Group = ButtonGroup;
Button.DenceGroup = ButtonDenseGroup;

export default Button;
