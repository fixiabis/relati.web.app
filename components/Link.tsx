import React from 'react';
import LinkBase, { LinkProps as LinkBaseProps } from 'next/link';

export type LinkProps = LinkBaseProps;

const Link: React.FC<LinkProps> = ({ children, ...props }) => (
  <LinkBase {...props}>
    <a>{children}</a>
  </LinkBase>
);

export default Link;
