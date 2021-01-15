import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const bouncing = keyframes({
  '0%, 100%': { transform: 'translate(0.5px, 0.5px) scale(0.8)' },
  '50%': { transform: 'translate(-0.5px, -0.5px) scale(1.2)' },
});

export const flickering = keyframes({
  from: { opacity: 0 },
});

export const dropped = keyframes({
  from: { transform: 'translate(-2px, -2px) scale(2)' },
});

export const EmphasizedPiece = styled.path({
  animationName: flickering,
  animationDuration: '1s',
  animationIterationCount: 2,
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

export const DroppedEmphasizedPiece = styled.path({
  animationName: `${dropped}, ${flickering}`,
  animationDuration: '0.5s 1s',
  animationDelay: '0s 0.5s',
  animationIterationCount: '1, 2',
  animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275), linear',
});

export const DroppedFlickeringPiece = styled.path({
  animationName: `${dropped}, ${flickering}`,
  animationDuration: '0.5s 1s',
  animationDelay: '0s 0.5s',
  animationIterationCount: '1, infinite',
  animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275), linear',
});

export const DroppedBouncingPiece = styled.path({
  animationName: `${dropped}, ${bouncing}`,
  animationDuration: '0.5s 1s',
  animationDelay: '0s 0.5s',
  animationIterationCount: '1, infinite',
  animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275), linear',
});
