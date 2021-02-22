import React from 'react';

import {
  BouncingPiece,
  DroppedBouncingPiece,
  DroppedFlickeringPiece,
  DroppedPiece,
  DroppedShakingPiece,
  FlickeringPiece,
  ShakingPiece,
} from './elements';

import { ShapePath } from './utils';

export type PieceProps = {
  x: number;
  y: number;
  shape?: '' | '.' | '^' | '+' | '#' | 'O' | 'X' | 'D' | 'E' | 'N' | 'K';
  color?: string;
  style?: 'double' | 'default' | 'gray' | 'light';
  opacity?: number;
  dropped?: boolean;
  bouncing?: boolean;
  flickering?: boolean;
  emphasized?: boolean;
  shaking?: boolean;
};

const Piece: React.FC<PieceProps> = ({
  x,
  y,
  shape = '',
  color = '#888',
  style: pieceStyle = 'default',
  opacity = 1,
  dropped: isDropped = false,
  bouncing: isBouncing = false,
  flickering: isFlickering = false,
  emphasized: isEmphasized = false,
  shaking: isShaking = false,
}) => {
  if (shape === '') {
    return <></>;
  }

  const path = `M ${x * 5} ${y * 5} ${ShapePath[shape]}`;

  const PieceBase = isDropped
    ? isFlickering
      ? DroppedFlickeringPiece
      : isBouncing
      ? DroppedBouncingPiece
      : isShaking
      ? DroppedShakingPiece
      : DroppedPiece
    : isFlickering
    ? FlickeringPiece
    : isBouncing
    ? BouncingPiece
    : isShaking
    ? ShakingPiece
    : 'path';

  const style = { transformOrigin: `${x * 5}px ${y * 5}px` };

  color =
    pieceStyle === 'gray' ? '#888' : pieceStyle === 'light' ? '#ddd' : color;

  if (shape === '.' || shape === '^') {
    return <PieceBase d={path} fill={color} style={style} opacity={opacity} />;
  }

  if (shape === '#') {
    return (
      <PieceBase
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="0.4"
        style={style}
        opacity={opacity}
      />
    );
  }

  if (pieceStyle !== 'double') {
    if (isEmphasized) {
      return (
        <>
          <PieceBase
            d={path}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity="0.4"
            style={style}
          />
          <PieceBase
            d={path}
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            style={style}
            opacity={opacity}
          />
        </>
      );
    } else {
      return (
        <PieceBase
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          style={style}
          opacity={opacity}
        />
      );
    }
  } else {
    return (
      <>
        <PieceBase
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1"
          style={style}
          opacity={opacity}
        />
        <PieceBase
          d={path}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5"
          style={style}
          opacity={opacity}
        />
      </>
    );
  }
};

export default Piece;
