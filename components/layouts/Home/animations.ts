import { keyframes } from '@emotion/react';

export const slideTop = keyframes({
  from: { transform: 'translateY(35px)' },
});

export const slideDownFadeIn = keyframes({
  from: { transform: 'translateY(-35px)', opacity: 0 },
});
