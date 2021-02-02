import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const bouncing = keyframes({
  '0%, 100%': { transform: 'translate(0.5px, 0.5px) scale(0.8)' },
  '50%': { transform: 'translate(-0.5px, -0.5px) scale(1.2)' },
});

export const shaking = keyframes({
  '0%, 100%': { transform: 'translateX(0.25px)' },
  '50%': { transform: 'translateX(-0.25px)' },
});

export const flickering = keyframes({
  from: { opacity: 0 },
});

export const dropped = keyframes({
  from: { transform: 'translate(-2px, -2px) scale(2)' },
});

export const FlickeringPiece = styled.path({
  animationName: flickering,
  animationDuration: '1s',
  animationIterationCount: 'infinite',
});

export const DroppedPiece = styled.path({
  animationName: dropped,
  animationDuration: '0.5s',
  animationIterationCount: 1,
  animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
});

export const BouncingPiece = styled.path({
  animationName: bouncing,
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
});

export const ShakingPiece = styled.path({
  animationName: shaking,
  animationDuration: '0.25s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
});

export const DroppedFlickeringPiece = styled.path({
  animationName: [dropped, flickering].join(', '),
  animationDuration: '0.5s, 1s',
  animationDelay: '0s, 0.5s',
  animationIterationCount: '1, infinite',
  animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275), linear',
});

export const DroppedBouncingPiece = styled.path({
  animationName: [dropped, bouncing].join(', '),
  animationDuration: '0.5s, 1s',
  animationDelay: '0s, 0.5s',
  animationIterationCount: '1, infinite',
  animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275), linear',
});

export const DroppedShakingPiece = styled.path({
  animationName: [dropped, shaking].join(', '),
  animationDuration: '0.5s, 0.25s',
  animationDelay: '0s, 0.5s',
  animationIterationCount: '1, infinite',
  animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275), linear',
});
