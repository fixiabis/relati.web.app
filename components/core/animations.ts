import { keyframes } from '@emotion/react';

export const zoomIn = keyframes({
  from: { transform: 'scale(0)' },
});

export const fadeIn = keyframes({
  from: { opacity: 0 },
});

export const slideTopFadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(100%)' },
});

export const slideLeftFadeIn = keyframes({
  from: { opacity: 0, transform: 'translateX(100%)' },
});
