import React, { useEffect, useState } from 'react';
import { EMPTY_PIECE, Game } from '../../relati';
import { PieceFor2PGame, PlayerFor2PGame } from './definitions';
import BoardBase, { BoardProps as BoardBaseProps } from './Board';
import PieceBase, { ShapeColor } from './Piece';
import Piece from './PieceFor2PGame';
import { getKeyframesOfEffect } from './utils';
import Route from './Route';

type EffectBoardProps = Omit<BoardBaseProps, 'width' | 'height'> & {
  game: Game<PlayerFor2PGame, PieceFor2PGame>;
  prevGame: Game<PlayerFor2PGame, PieceFor2PGame>;
  pieceIndexesOfPlacement: number[];
};

export type EffectBoardFor2PGameProps = EffectBoardProps;

const shapeByPlayer: Record<PlayerFor2PGame, keyof typeof ShapeColor> = [
  'O',
  'X',
];

const EffectBoard: React.FC<EffectBoardProps> = ({
  game,
  prevGame,
  pieceIndexesOfPlacement,
  ...props
}) => {
  const { definition, rule } = game;
  const { playersCount, boardWidth, boardHeight } = definition;
  const playerOfTurn = (game.turn % playersCount) as PlayerFor2PGame;
  const [lastPieceIndexOfPlacement] = pieceIndexesOfPlacement.slice(-1);
  const [keyframes, setKeyframes] = useState([]);
  const [keyframe = null] = keyframes;

  useEffect(() => {
    setKeyframes(getKeyframesOfEffect(prevGame, game));
  }, [prevGame, game]);

  useEffect(() => {
    if (keyframes.length > 1) {
      const timeoutId = setTimeout(() => setKeyframes(keyframes.slice(1)), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [keyframes.length]);

  if (keyframe === null) {
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
  } else {
    const pieceIndexes = keyframe.pieceIndexesByPlayer.flat();
    const addedPieceIndexes = keyframe.addedPieceIndexesByPlayer.flat();
    const removedPieceIndexes = keyframe.removedPieceIndexesByPlayer.flat();

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
        if (removedPieceIndexes.includes(pieceIndex)) {
          piece = definition.consumedPieceByPiece[piece];
        }

        if (
          pieceIndexes.includes(pieceIndex) ||
          addedPieceIndexes.includes(pieceIndex)
        ) {
          piece = definition.providedPieceByPiece[piece];
        }

        return <Piece key={key} x={x} y={y} piece={piece} dropped={dropped} />;
      }
    };

    return (
      <BoardBase width={boardWidth} height={boardHeight} {...props}>
        {prevGame.pieces.map(toPieceElement)}
      </BoardBase>
    );
  }
};

const EffectBoardFor2PGame = EffectBoard;

export default EffectBoardFor2PGame;
