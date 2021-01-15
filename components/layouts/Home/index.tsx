import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const slideTop = keyframes({
  from: { transform: 'translateY(35px)' },
});

const slideDownFadeIn = keyframes({
  from: { transform: 'translateY(-35px)', opacity: 0 },
});

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

export { default as Logo } from './Logo';
