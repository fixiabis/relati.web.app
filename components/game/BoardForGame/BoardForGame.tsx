import React, { useEffect, useState } from 'react';
import { EMPTY_PIECE, Game, PieceIndex, PieceStatus } from '../../../relati';
import BoardBase, { BoardProps as BoardBaseProps } from '../Board';
import PieceBase, { PieceProps as PieceBaseProps, ShapeColor } from '../Piece';
import Route from '../Route';
import { getKeyframesOfEffect, Keyframe } from './utils';

type Player = number;
type Piece = number;

type BoardProps = Omit<BoardBaseProps, 'width' | 'height'> & {
  game: Game<Player, Piece>;
  prevGame: Game<Player, Piece>;
  pieceIndexesOfPlacement: PieceIndex[];
};

export type BoardForGameProps = BoardProps;

const shapeByPlayer: Record<Player, keyof typeof ShapeColor> = [
  'O',
  'X',
  'D',
  'U',
];

const styleByPieceStatus: Record<PieceStatus, PieceBaseProps['style']> = {
  [PieceStatus.Unknown]: 'default',
  [PieceStatus.Producer]: 'double',
  [PieceStatus.Provider]: 'default',
  [PieceStatus.Consumer]: 'gray',
  [PieceStatus.Deceased]: 'light',
};

const Board: React.FC<BoardProps> = ({
  game,
  prevGame,
  pieceIndexesOfPlacement,
  ...props
}) => {
  const [state, setState] = useState({
    game,
    prevGame,
    keyframes: [] as Keyframe<Piece>[],
  });

  useEffect(() => {
    if (state.game !== game || state.prevGame !== prevGame) {
      const keyframes = getKeyframesOfEffect(prevGame, game).slice(1);
      setState({ game, prevGame, keyframes });
    } else if (state.keyframes.length > 1) {
      const [keyframe] = state.keyframes;

      const timeout = setTimeout(
        () =>
          setState((state) =>
            state.game === game
              ? {
                  ...state,
                  keyframes: state.keyframes.slice(1),
                }
              : state
          ),
        keyframe.duration
      );

      return () => clearTimeout(timeout);
    }
  }, [state, game, prevGame]);

  const { keyframes } = state;
  const [keyframe = null] = keyframes;

  const { definition, rule } = game;

  const {
    playersCount,
    boardWidth,
    boardHeight,
    playerByPiece,
    pieceCoordinateByPieceIndex,
    toPieceStatus,
  } = definition;

  const toPieceCoordinate = (pieceIndex: PieceIndex) =>
    pieceCoordinateByPieceIndex[pieceIndex];

  const { isPieceIndexOfPlayerHasProvidablePieceIndexRoute } = rule;
  const playerOfTurn = (game.turn % playersCount) as Player;
  const [lastPieceIndexOfPlacement] = pieceIndexesOfPlacement.slice(-1);

  const colorByPiece = (piece: Piece) =>
    ShapeColor[shapeByPlayer[playerByPiece[piece]]];

  const toPieceElement = (piece: Piece, pieceIndex: number) => {
    const key = pieceIndex;
    const [x, y] = toPieceCoordinate(pieceIndex);

    if (piece === EMPTY_PIECE) {
      const shape = shapeByPlayer[playerOfTurn];
      const color = ShapeColor[shape];

      const isPiecePlaceable = isPieceIndexOfPlayerHasProvidablePieceIndexRoute(
        game.pieces,
        pieceIndex,
        playerOfTurn
      );

      if (isPiecePlaceable) {
        return <PieceBase key={key} x={x} y={y} shape="." color={color} />;
      }
    } else {
      const player = playerByPiece[piece];
      const pieceStatus = toPieceStatus(piece);
      const shape = shapeByPlayer[player];
      const color = ShapeColor[shape];
      const style = styleByPieceStatus[pieceStatus];
      const dropped = pieceIndex === lastPieceIndexOfPlacement;

      return (
        <PieceBase
          key={key}
          x={x}
          y={y}
          shape={shape}
          color={color}
          style={style}
          dropped={dropped}
        />
      );
    }
  };

  if (keyframe === null) {
    return (
      <BoardBase width={boardWidth} height={boardHeight} {...props}>
        <g className="pieces">{game.pieces.map(toPieceElement)}</g>
      </BoardBase>
    );
  } else {
    const toUnchangedPieceIndexRoutes = (
      pieceIndexRoutes: PieceIndex[][],
      pieceIndex: PieceIndex
    ) =>
      pieceIndexRoutes
        .map((pieceIndexRoute) => [...pieceIndexRoute, pieceIndex])
        .map((pieceIndexRoute) => (
          <Route
            key={pieceIndexRoute.join('-')}
            coordinates={pieceIndexRoute.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={0.1}
            reversed
          />
        ));

    const toAddedPieceIndexRoutes = (
      pieceIndexRoutes: PieceIndex[][],
      pieceIndex: PieceIndex
    ) =>
      pieceIndexRoutes
        .map((pieceIndexRoute) => [...pieceIndexRoute, pieceIndex])
        .map((pieceIndexRoute) => (
          <Route
            key={pieceIndexRoute.join('-')}
            coordinates={pieceIndexRoute.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={0.4}
            reversed
            drawn
          />
        ));

    const toRemovedPieceIndexRoutes = (
      pieceIndexRoutes: PieceIndex[][],
      pieceIndex: PieceIndex
    ) =>
      pieceIndexRoutes
        .map((pieceIndexRoute) => [...pieceIndexRoute, pieceIndex])
        .map((pieceIndexRoute) => (
          <Route
            key={pieceIndexRoute.join('-')}
            coordinates={pieceIndexRoute.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={0.4}
            reversed
            erased
          />
        ));

    return (
      <BoardBase width={boardWidth} height={boardHeight} {...props}>
        <g className="effect-lines">
          {(keyframe.pieceIndexRoutesByPieceIndex as PieceIndex[][][]).map(
            toUnchangedPieceIndexRoutes
          )}
          {(keyframe.addedPieceIndexRoutesByPieceIndex as PieceIndex[][][]).map(
            toAddedPieceIndexRoutes
          )}
          {(keyframe.removedPieceIndexRoutesByPieceIndex as PieceIndex[][][]).map(
            toRemovedPieceIndexRoutes
          )}
        </g>
        <g className="pieces">{keyframe.pieces.map(toPieceElement)}</g>
      </BoardBase>
    );
  }
};

const BoardForGame = Board;

export default BoardForGame;
