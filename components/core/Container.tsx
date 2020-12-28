import React from 'react';

export type ContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Container: React.FC<ContainerProps> = ({ className = '', ...props }) => (
  <div
    className={'flex-center container-filled' + (className && ` ${className}`)}
    {...props}
  />
);

export default Container;
