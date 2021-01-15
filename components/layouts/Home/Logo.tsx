import { keyframes } from '@emotion/react';
import { CSSObject } from '@emotion/styled';
import React from 'react';
import { styled } from '../../core';

export type LogoProps = {
  splash?: boolean;
};

const drawLineAndFill = keyframes({
  '0%': {
    fill: 'transparent',
    stroke: '#888',
    strokeDashoffset: 200,
  },
  '80%': {
    fill: 'transparent',
    stroke: '#888',
    strokeDashoffset: 0,
  },
});

const style: CSSObject = {
  strokeDasharray: 200,
  fill: '#888',
  stroke: 'transparent',
  strokeWidth: '2px',
};

const LogoPath = styled.path<LogoProps>(style, ({ splash: isSplash }) =>
  isSplash ? { animation: `${drawLineAndFill} 1s backwards 0.25s` } : {}
);

const pathDefinition = [
  'M 10 30 v 50 h 10 v -40 h 20 v -10 z',
  'M 50 30 v 50 h 30 v -10 h -20 v -10 h 20 v -30 z m 10 10 h 10 v 10 h -10 z',
  'M 100 20 v 60 h 20 v -10 h -10 v -60 h -20 v 10 z',
  'M 130 30 v 10 h 20 v 10 h -20 v 30 h 30 v -50 z m 10 30 h 10 v 10 h -10 z',
  'M 170 30 v 10 h 10 v 40 h 20 v -10 h -10 v -30 h 10 v -10 h -10 v -10 h -10 v 10 z',
  'M 210 30 v 10 h 10 v 40 h 20 v -10 h -10 v -40 z m 10 -20 v 10 h 10 v -10 z',
].join(' ');

const Logo: React.FC<LogoProps> = ({ splash: isSplash }) => (
  <svg width="250" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <LogoPath splash={isSplash} d={pathDefinition} />
  </svg>
);

export default Logo;
