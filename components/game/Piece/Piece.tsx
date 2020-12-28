import React from 'react';
import { ShapePath } from './utils';
import PieceStyles from './Piece.module.css';

export type PieceProps = Omit<React.SVGProps<SVGPathElement>, 'style'> & {
  x: number;
  y: number;
  shape?: '' | '.' | '#' | 'O' | 'X' | 'D' | 'U' | 'N' | 'K';
  color?: string;
  style?: 'double' | 'default' | 'gray' | 'light';
  dropped?: boolean;
  bouncing?: boolean;
  flickering?: boolean;
  emphasized?: boolean;
  pathStyle?: React.SVGProps<SVGPathElement>['style'];
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
  className = '',
  pathStyle: style = {},
  ...props
}) => {
  if (shape === '') {
    return <></>;
  }

  const path = `M ${x * 5} ${y * 5} ${ShapePath[shape]}`;

  if (shape === '.') {
    return <path d={path} fill={color} />;
  }

  {
    className =
      (className && ` ${className}`) +
      (isDropped
        ? isEmphasized
          ? PieceStyles.DroppedEmphasizedPiece
          : isFlickering
          ? PieceStyles.DroppedFlickeringPiece
          : isBouncing
          ? PieceStyles.DroppedBouncingPiece
          : PieceStyles.DroppedPiece
        : isEmphasized
        ? PieceStyles.EmphasizedPiece
        : isFlickering
        ? PieceStyles.FlickeringPiece
        : isBouncing
        ? PieceStyles.BouncingPiece
        : '');

    style = { transformOrigin: `${x * 5}px ${y * 5}px`, ...style };
  }

  if (pieceStyle !== 'double') {
    color =
      pieceStyle === 'gray' ? '#888' : pieceStyle === 'light' ? '#ddd' : color;

    if (isEmphasized) {
      return (
        <>
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity="0.4"
            className={className}
            style={style}
            {...props}
          />
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            className={className}
            style={style}
            {...props}
          />
        </>
      );
    } else {
      return (
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          className={className}
          style={style}
          {...props}
        />
      );
    }
  } else {
    return (
      <>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1"
          className={className}
          style={style}
          {...props}
        />

        <path
          d={path}
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="0.5"
          className={className}
          style={style}
          {...props}
        />
      </>
    );
  }
};

export default Piece;
