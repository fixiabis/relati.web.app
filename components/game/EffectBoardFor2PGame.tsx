import React, { useEffect, useState } from 'react';
import {
  EMPTY_PIECE,
  Game,
  PieceIndex,
  Route as RouteType,
} from '../../relati';
import { PieceFor2PGame, PlayerFor2PGame } from './definitions';
import BoardBase, { BoardProps as BoardBaseProps } from './Board';
import PieceBase, { ShapeColor } from './Piece';
import Piece from './PieceFor2PGame';
import { getKeyframesOfEffect, Keyframe } from './utils';
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
  const [state, setState] = useState({
    game,
    prevGame,
    keyframes: [] as Keyframe<PieceFor2PGame>[],
  });

  useEffect(() => {
    if (state.game !== game || state.prevGame !== prevGame) {
      const keyframes = getKeyframesOfEffect(prevGame, game).slice(1);
      setState({ game, prevGame, keyframes });
    } else if (state.keyframes.length > 1) {
      const [keyframe] = state.keyframes;

      const timeoutId = setTimeout(() => {
        if (state.game === game) {
          setState((state) => ({
            ...state,
            keyframes: state.keyframes.slice(1),
          }));
        }
      }, keyframe.duration);

      return () => clearTimeout(timeoutId);
    }
  }, [state, game, prevGame]);

  const { definition, rule } = game;
  const { playersCount, boardWidth, boardHeight } = definition;
  const playerOfTurn = (game.turn % playersCount) as PlayerFor2PGame;
  const [lastPieceIndexOfPlacement] = pieceIndexesOfPlacement.slice(-1);

  const { keyframes } = state;
  const [keyframe = null] = keyframes;

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
    const toPieceElement = (piece: PieceFor2PGame, pieceIndex: number) => {
      const key = pieceIndex;
      const [x, y] = definition.toPieceCoordinate(pieceIndex);
      const dropped = pieceIndex === lastPieceIndexOfPlacement;

      if (piece === EMPTY_PIECE && keyframes.length === 1) {
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
        <g className="effect-lines">
          {(keyframe.pieceIndexRoutesByPieceIndex as PieceIndex[][][]).map(
            (
              pieceIndexRoutes: RouteType<PieceIndex>[],
              pieceIndex: PieceIndex
            ) =>
              pieceIndexRoutes.map((pieceIndexRoute) => {
                pieceIndexRoute = [...pieceIndexRoute, pieceIndex];

                const coordinates = pieceIndexRoute.map(
                  (pieceIndex) =>
                    definition.pieceCoordinateByPieceIndex[pieceIndex]
                );

                const color =
                  ShapeColor[
                    shapeByPlayer[
                      definition.playerByPiece[game.pieces[pieceIndex]]
                    ]
                  ];

                return (
                  <Route
                    key={pieceIndexRoute.join('-')}
                    coordinates={coordinates}
                    color={color}
                    opacity={0.1}
                    reversed
                  />
                );
              })
          )}
          {(keyframe.addedPieceIndexRoutesByPieceIndex as PieceIndex[][][]).map(
            (
              pieceIndexRoutes: RouteType<PieceIndex>[],
              pieceIndex: PieceIndex
            ) =>
              pieceIndexRoutes.map((pieceIndexRoute) => {
                pieceIndexRoute = [...pieceIndexRoute, pieceIndex];

                const coordinates = pieceIndexRoute.map(
                  (pieceIndex) =>
                    definition.pieceCoordinateByPieceIndex[pieceIndex]
                );

                const color =
                  ShapeColor[
                    shapeByPlayer[
                      definition.playerByPiece[game.pieces[pieceIndex]]
                    ]
                  ];

                return (
                  <Route
                    key={pieceIndexRoute.join('-')}
                    coordinates={coordinates}
                    color={color}
                    opacity={0.4}
                    reversed
                    drawn
                  />
                );
              })
          )}
          {(keyframe.removedPieceIndexRoutesByPieceIndex as PieceIndex[][][]).map(
            (
              pieceIndexRoutes: RouteType<PieceIndex>[],
              pieceIndex: PieceIndex
            ) =>
              pieceIndexRoutes.map((pieceIndexRoute) => {
                pieceIndexRoute = [...pieceIndexRoute, pieceIndex];

                const coordinates = pieceIndexRoute.map(
                  (pieceIndex) =>
                    definition.pieceCoordinateByPieceIndex[pieceIndex]
                );

                const color =
                  ShapeColor[
                    shapeByPlayer[
                      definition.playerByPiece[game.pieces[pieceIndex]]
                    ]
                  ];

                return (
                  <Route
                    key={pieceIndexRoute.join('-')}
                    coordinates={coordinates}
                    color={color}
                    opacity={0.4}
                    reversed
                    erased
                  />
                );
              })
          )}
        </g>
        {keyframe.pieces.map(toPieceElement)}
      </BoardBase>
    );
  }
};

const EffectBoardFor2PGame = EffectBoard;

export default EffectBoardFor2PGame;
