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
    getStatus: toPieceStatus,
  } = definition;

  const toPieceCoordinate = (pieceIndex: PieceIndex) =>
    pieceCoordinateByPieceIndex[pieceIndex];

  const { isPieceIndexHasProvidableRoute } = rule;
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

      const isPiecePlaceable = isPieceIndexHasProvidableRoute(
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
    const toUnchangedRoutes = (
      routes: PieceIndex[][],
      pieceIndex: PieceIndex
    ) =>
      routes
        .map((route) => [...route, pieceIndex])
        .map((route) => (
          <Route
            key={route.join('-')}
            coordinates={route.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={0.2}
            reversed
          />
        ));

    const toAddedRoutes = (routes: PieceIndex[][], pieceIndex: PieceIndex) =>
      routes
        .map((route) => [...route, pieceIndex])
        .map((route) => (
          <Route
            key={route.join('-')}
            coordinates={route.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={0.4}
            reversed
            drawn
          />
        ));

    const toRemovedRoutes = (routes: PieceIndex[][], pieceIndex: PieceIndex) =>
      routes
        .map((route) => [...route, pieceIndex])
        .map((route) => (
          <Route
            key={route.join('-')}
            coordinates={route.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={0.4}
            reversed
            erased
          />
        ));

    return (
      <BoardBase width={boardWidth} height={boardHeight} {...props}>
        <g className="effect-lines">
          {(keyframe.routesByPieceIndex as PieceIndex[][][]).map(
            toUnchangedRoutes
          )}
          {(keyframe.addedRoutesByPieceIndex as PieceIndex[][][]).map(
            toAddedRoutes
          )}
          {(keyframe.removedRoutesByPieceIndex as PieceIndex[][][]).map(
            toRemovedRoutes
          )}
        </g>
        <g className="pieces">{keyframe.pieces.map(toPieceElement)}</g>
      </BoardBase>
    );
  }
};

const BoardForGame = Board;

export default BoardForGame;
