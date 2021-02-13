import { styled } from './utils';

export type IconProps = { url: string };

const Icon = styled.div<IconProps>(
  { width: 50, height: 50, flexShrink: 0 },
  ({ url }) => ({
    backgroundImage: `url(${url})`,
  })
);

export default Icon;
