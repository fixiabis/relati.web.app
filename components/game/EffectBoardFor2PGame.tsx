import React, { useEffect, useState } from 'react';
import { EMPTY_PIECE, Game } from '../../relati';
import { PieceFor2PGame, PlayerFor2PGame } from './definitions';
import BoardBase, { BoardProps as BoardBaseProps } from './Board';
import PieceBase, { ShapeColor } from './Piece';
import Piece from './PieceFor2PGame';
import { getKeyframesOfEffect } from './utils';
import { Route } from '.';

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
    const keyframes = getKeyframesOfEffect(prevGame, game);
    setKeyframes(keyframes);
  }, [prevGame, game]);

  useEffect(() => {
    if (keyframes.length > 1) {
      const timeoutId = setTimeout(
        () => setKeyframes((keyframes) => keyframes.slice(1)),
        500
      );
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
    const removedPieceIndexes = keyframe.removedPieceIndexesByPlayer.reduce(
      (pieceIndexes: number[], pieceIndexesOfPlayer: number[]) =>
        pieceIndexes.concat(pieceIndexesOfPlayer)
    );

    const pieceIndexes = keyframe.pieceIndexesByPlayer.reduce(
      (pieceIndexes: number[], pieceIndexesOfPlayer: number[]) =>
        pieceIndexes.concat(pieceIndexesOfPlayer)
    );

    const addedPieceIndexRoutes = keyframe.addedPieceIndexRoutesByPlayer.reduce(
      (pieceIndexRoutes: number[][], pieceIndexRoutesOfPlayer: number[][]) =>
        pieceIndexRoutes.concat(pieceIndexRoutesOfPlayer)
    );

    const pieceIndexRoutes = keyframe.pieceIndexRoutesByPlayer
      .reduce(
        (pieceIndexRoutes: number[][], pieceIndexRoutesOfPlayer: number[][]) =>
          pieceIndexRoutes.concat(pieceIndexRoutesOfPlayer)
      )
      .filter(
        (pieceIndexRoute: number[]) =>
          !addedPieceIndexRoutes.includes(pieceIndexRoute)
      );

    const removedPieceIndexRoutes = keyframe.removedPieceIndexRoutesByPlayer.reduce(
      (pieceIndexRoutes: number[][], pieceIndexRoutesOfPlayer: number[][]) =>
        pieceIndexRoutes.concat(pieceIndexRoutesOfPlayer)
    );

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
        } else if (pieceIndexes.includes(pieceIndex)) {
          piece = definition.providedPieceByPiece[piece];
        } else if (
          definition.toPieceStatus(prevGame.pieces[pieceIndex]) === 2
        ) {
          piece = prevGame.pieces[pieceIndex];
        }

        return <Piece key={key} x={x} y={y} piece={piece} dropped={dropped} />;
      }
    };

    return (
      <BoardBase width={boardWidth} height={boardHeight} {...props}>
        <g className="effect-lines">
          {pieceIndexRoutes.map((pieceIndexes: number[]) => {
            const coordinates = pieceIndexes.map(
              (pieceIndex) => definition.pieceCoordinateByPieceIndex[pieceIndex]
            );

            const color =
              ShapeColor[
                shapeByPlayer[
                  definition.playerByPiece[game.pieces[pieceIndexes[0]]]
                ]
              ];

            return (
              <Route
                key={pieceIndexes.join('-')}
                coordinates={coordinates}
                color={color}
                opacity={0.1}
                reversed
              />
            );
          })}
          {addedPieceIndexRoutes.map((pieceIndexes: number[]) => {
            const coordinates = pieceIndexes.map(
              (pieceIndex) => definition.pieceCoordinateByPieceIndex[pieceIndex]
            );

            const color =
              ShapeColor[
                shapeByPlayer[
                  definition.playerByPiece[game.pieces[pieceIndexes[0]]]
                ]
              ];

            return (
              <Route
                key={pieceIndexes.join('-')}
                coordinates={coordinates}
                color={color}
                opacity={0.4}
                reversed
                drawn
              />
            );
          })}
          {removedPieceIndexRoutes.map((pieceIndexes: number[]) => {
            const coordinates = pieceIndexes.map(
              (pieceIndex) => definition.pieceCoordinateByPieceIndex[pieceIndex]
            );

            const color =
              ShapeColor[
                shapeByPlayer[
                  definition.playerByPiece[game.pieces[pieceIndexes[0]]]
                ]
              ];

            return (
              <Route
                key={pieceIndexes.join('-')}
                coordinates={coordinates}
                color={color}
                opacity={0.4}
                reversed
                erased
              />
            );
          })}
        </g>
        <g className="pieces">{game.pieces.map(toPieceElement)}</g>
      </BoardBase>
    );
  }
};

const EffectBoardFor2PGame = EffectBoard;

export default EffectBoardFor2PGame;
