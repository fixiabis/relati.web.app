import React from 'react';
import { PieceFor2PGame } from './definitions';
import PieceBase, { PieceProps as PieceBaseProps } from './Piece';

const piecePropsByPiece: Record<PieceFor2PGame, Partial<PieceBaseProps>> = [
  { shape: '' },
  { shape: 'O', style: 'double', color: 'crimson' },
  { shape: 'X', style: 'double', color: 'royalblue' },
  { shape: 'O', style: 'default', color: 'crimson' },
  { shape: 'X', style: 'default', color: 'royalblue' },
  { shape: 'O', style: 'gray', color: 'crimson' },
  { shape: 'X', style: 'gray', color: 'royalblue' },
];

type PieceProps = {
  x: number;
  y: number;
  piece: PieceFor2PGame;
  dropped: boolean;
};

export type PieceFor2PGameProps = PieceProps;

const Piece: React.FC<PieceProps> = ({ x, y, piece, dropped }) => {
  const pieceProps = piecePropsByPiece[piece];
  return <PieceBase x={x} y={y} dropped={dropped} {...pieceProps} />;
};

const PieceFor2PGame = Piece;

export default PieceFor2PGame;
