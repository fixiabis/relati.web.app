import React from 'react';

export type IconProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { url: string };

const Icon: React.FC<IconProps> = ({ url, style, ...props }) => (
  <div
    style={{ width: 50, height: 50, backgroundImage: `url(${url})`, ...style }}
    {...props}
  />
);

export default Icon;
