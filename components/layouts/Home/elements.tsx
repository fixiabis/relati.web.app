import styled from '@emotion/styled';
import { slideTop, slideDownFadeIn } from './animations';

export const SlideTopWhenLogoDrawn = styled.div({
  width: '250px',
  height: '90px',
  animation: `${slideTop} 0.5s linear backwards 1s`,
});

export const SlideDownFadeInWhenLogoDrawn = styled.div({
  width: '200px',
  height: '70px',
  animation: `${slideDownFadeIn} 0.5s linear backwards 1s`,
});
