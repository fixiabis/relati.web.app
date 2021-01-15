import styled from '@emotion/styled';
import { animations } from '../core';

export const FadeIn = styled.div({
  animationName: animations.fadeIn,
  animationDuration: '0.25s',
  animationTimingFunction: 'linear',
  animationFillMode: 'backwards',
});

export const SlideLeftFadeIn = styled.div<{ animationDelay: string }>(
  {
    animationName: animations.slideLeftFadeIn,
    animationDuration: '0.25s',
    animationTimingFunction: 'linear',
    animationFillMode: 'backwards',
  },
  ({ animationDelay }) => ({ animationDelay })
);
