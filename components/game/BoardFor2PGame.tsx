import React from 'react';
import { EMPTY_PIECE, Game } from '../../relati';
import { PieceFor2PGame, PlayerFor2PGame } from './definitions';
import BoardBase, { BoardProps as BoardBaseProps } from './Board';
import PieceBase, { ShapeColor } from './Piece';
import Piece from './PieceFor2PGame';

type BoardProps = Omit<BoardBaseProps, 'width' | 'height'> & {
  game: Game<PlayerFor2PGame, PieceFor2PGame>;
  pieceIndexesOfPlacement: number[];
};

export type BoardFor2PGameProps = BoardProps;

const shapeByPlayer = ['O', 'X'];

const Board: React.FC<BoardProps> = ({
  game,
  pieceIndexesOfPlacement,
  ...props
}) => {
  const { definition, rule } = game;
  const { playersCount, boardWidth, boardHeight } = definition;
  const playerOfTurn = (game.turn % playersCount) as PlayerFor2PGame;
  const [lastPieceIndexOfPlacement] = pieceIndexesOfPlacement.slice(-1);

  const toPieceElement = (piece: PieceFor2PGame, pieceIndex: number) => {
    const key = pieceIndex;
    const [x, y] = definition.toPieceCoordinate(pieceIndex);
    const dropped = pieceIndex === lastPieceIndexOfPlacement;

    if (piece === EMPTY_PIECE) {
      const isPiecePlaceable = rule.isPieceIndexOfPlayerHasProvidablePieceIndexRoute(
        game.pieces,
        pieceIndex,
        playerOfTurn
      );

      if (isPiecePlaceable) {
        return (
          <PieceBase
            key={key}
            x={x}
            y={y}
            shape="."
            color={ShapeColor[shapeByPlayer[playerOfTurn]]}
          />
        );
      }
    } else {
      return <Piece key={key} x={x} y={y} piece={piece} dropped={dropped} />;
    }
  };

  return (
    <BoardBase width={boardWidth} height={boardHeight} {...props}>
      {game.pieces.map(toPieceElement)}
    </BoardBase>
  );
};

const BoardFor2PGame = Board;

export default BoardFor2PGame;
