import React from 'react';

export type DescriptionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Description: React.FC<DescriptionProps> = ({
  className = '',
  style = {},
  ...props
}) => (
  <div
    className={'flex-center' + (className && ` ${className}`)}
    style={{ height: 90, padding: 10, ...style }}
    {...props}
  />
);

export default Description;
