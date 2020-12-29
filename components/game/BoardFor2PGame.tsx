import React from 'react';
import { Game } from '../../relati';
import { PieceFor2PGame, PlayerFor2PGame } from './definitions';
import BoardBase, { BoardProps as BoardBaseProps } from './Board';
import Piece from './PieceFor2PGame';

type BoardProps = Omit<BoardBaseProps, 'width' | 'height'> & {
  game: Game<PlayerFor2PGame, PieceFor2PGame>;
  pieceIndexesOfPlacement: number[];
};

export type BoardFor2PGameProps = BoardProps;

const Board: React.FC<BoardProps> = ({
  game,
  pieceIndexesOfPlacement,
  ...props
}) => {
  const { definition } = game;
  const { boardWidth, boardHeight } = definition;
  const [lastPieceIndexOfPlacement] = pieceIndexesOfPlacement.slice(-1);

  const toPieceElement = (piece: PieceFor2PGame, pieceIndex: number) => {
    const key = pieceIndex;
    const [x, y] = definition.toPieceCoordinate(pieceIndex);
    const dropped = pieceIndex === lastPieceIndexOfPlacement;
    return <Piece key={key} x={x} y={y} piece={piece} dropped={dropped} />;
  };

  return (
    <BoardBase width={boardWidth} height={boardHeight} {...props}>
      {game.pieces.map(toPieceElement)}
    </BoardBase>
  );
};

const BoardFor2PGame = Board;

export default BoardFor2PGame;
