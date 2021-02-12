import { CSSObject } from '@emotion/react';

export const flexCenter: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export const overlay: CSSObject = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

export const bottomLeftFixed: CSSObject = {
  position: 'fixed',
  bottom: 0,
  left: 0,
};

export const bottomRightFixed: CSSObject = {
  position: 'fixed',
  bottom: 0,
  right: 0,
};
