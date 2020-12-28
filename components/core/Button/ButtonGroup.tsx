import React, { Children } from 'react';
import ButtonStyles from './Button.module.css';

const BUTTON_WIDTH = 60;
const BUTTON_MARGINS = 55;

export type ButtonGroupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className = '',
  style = {},
  ...props
}) => {
  const buttonsCount = Children.count(props.children);

  const width =
    buttonsCount * (BUTTON_WIDTH + (BUTTON_MARGINS - (buttonsCount - 1) * 15));

  return (
    <div
      className={ButtonStyles.ButtonGroup + (className && ` ${className}`)}
      style={{ width, ...style }}
      {...props}
    />
  );
};

export default ButtonGroup;
