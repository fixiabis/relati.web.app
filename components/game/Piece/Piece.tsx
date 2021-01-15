import React from 'react';

import {
  BouncingPiece,
  DroppedBouncingPiece,
  DroppedEmphasizedPiece,
  DroppedFlickeringPiece,
  DroppedPiece,
  EmphasizedPiece,
  FlickeringPiece,
} from './elements';

import { ShapePath } from './utils';

export type PieceProps = {
  x: number;
  y: number;
  shape?: '' | '.' | '#' | 'O' | 'X' | 'D' | 'U' | 'N' | 'K';
  color?: string;
  style?: 'double' | 'default' | 'gray' | 'light';
  dropped?: boolean;
  bouncing?: boolean;
  flickering?: boolean;
  emphasized?: boolean;
};

const Piece: React.FC<PieceProps> = ({
  x,
  y,
  shape = '',
  color = '#888',
  style: pieceStyle = 'default',
  dropped: isDropped = false,
  bouncing: isBouncing = false,
  flickering: isFlickering = false,
  emphasized: isEmphasized = false,
}) => {
  if (shape === '') {
    return <></>;
  }

  const path = `M ${x * 5} ${y * 5} ${ShapePath[shape]}`;

  const PieceBase = isDropped
    ? isEmphasized
      ? DroppedEmphasizedPiece
      : isFlickering
      ? DroppedFlickeringPiece
      : isBouncing
      ? DroppedBouncingPiece
      : DroppedPiece
    : isEmphasized
    ? EmphasizedPiece
    : isFlickering
    ? FlickeringPiece
    : isBouncing
    ? BouncingPiece
    : 'path';

  const style = { transformOrigin: `${x * 5}px ${y * 5}px` };

  color =
    pieceStyle === 'gray' ? '#888' : pieceStyle === 'light' ? '#ddd' : color;

  if (shape === '.') {
    return <PieceBase d={path} fill={color} style={style} />;
  }

  if (shape === '#') {
    return (
      <PieceBase
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="0.4"
        style={style}
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
        />
        <PieceBase
          d={path}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5"
          style={style}
        />
      </>
    );
  }
};

export default Piece;
