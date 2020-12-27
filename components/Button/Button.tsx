import React, { CSSProperties } from 'react';
import ButtonStyles from './Button.module.css';
import ButtonDenseGroup from './ButtonDenseGroup';
import ButtonGroup from './ButtonGroup';

export type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Pick<CSSProperties, 'backgroundColor' | 'backgroundImage'>;

const Button: React.FC<ButtonProps> & {
  Group: typeof ButtonGroup;
  DenceGroup: typeof ButtonDenseGroup;
} = ({ className = '', backgroundColor, backgroundImage, style, ...props }) => (
  <div
    className={ButtonStyles.Button + (className && ` ${className}`)}
    style={{ backgroundColor, backgroundImage, ...style }}
    {...props}
  />
);

Button.Group = ButtonGroup;
Button.DenceGroup = ButtonDenseGroup;

export default Button;
