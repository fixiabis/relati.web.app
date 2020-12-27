import React from 'react';
import Link, { LinkProps } from 'next/link';
import Button, { ButtonProps } from './Button';

export type LinkButtonProps = ButtonProps & Pick<LinkProps, 'href'>;

const LinkButton: React.FC<LinkButtonProps> = ({ href, ...props }) => (
  <Link href={href}>
    <a>
      <Button {...props} />
    </a>
  </Link>
);

export default LinkButton;
