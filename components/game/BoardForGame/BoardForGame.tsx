import React, { useEffect, useState } from "react";
import { EMPTY_PIECE, Game, PieceIndex, PieceStatus } from "../../../relati";
import BoardBase, { BoardProps as BoardBaseProps } from "../Board";
import PieceBase, { PieceProps as PieceBaseProps, ShapeColor } from "../Piece";
import Route from "../Route";
import { getKeyframesOfEffect, getPieceIndexToEffectMap, Keyframe, shapeByPlayer, styleByPieceStatus } from "./utils";

type Player = number;
type Piece = number;

type BoardProps = Omit<BoardBaseProps, "width" | "height"> & {
  game: Game<Player, Piece>;
  prevGame: Game<Player, Piece>;
  lastPlacedPieceIndex: PieceIndex;
};

export type BoardForGameProps = BoardProps;

const Board: React.FC<BoardProps> = ({ game, prevGame, lastPlacedPieceIndex, children, ...props }) => {
  const [state, setState] = useState({
    game,
    prevGame,
    effectByPieceIndex: [] as Record<PieceIndex, Partial<PieceBaseProps>>,
    keyframes: [] as Keyframe<Piece>[],
  });

  useEffect(() => {
    if (state.game !== game || state.prevGame !== prevGame) {
      const keyframes = getKeyframesOfEffect(prevGame, game).slice(1);
      const effectByPieceIndex = getPieceIndexToEffectMap(game.pieces, game.rule);

      setState({ game, effectByPieceIndex, prevGame, keyframes });
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

  const toPieceCoordinate = (pieceIndex: PieceIndex) => pieceCoordinateByPieceIndex[pieceIndex];

  const { isPieceIndexHasProvidableRoute } = rule;
  const playerOfTurn = (game.turn % playersCount) as Player;

  const colorByPiece = (piece: Piece) => ShapeColor[shapeByPlayer[playerByPiece[piece]]];

  const toPieceElement = (piece: Piece, pieceIndex: number) => {
    const key = pieceIndex;
    const [x, y] = toPieceCoordinate(pieceIndex);
    const effect = state.effectByPieceIndex[pieceIndex];

    if (piece === EMPTY_PIECE) {
      const shape = shapeByPlayer[playerOfTurn];
      const color = ShapeColor[shape];

      const isPiecePlaceable = isPieceIndexHasProvidableRoute(game.pieces, pieceIndex, playerOfTurn);

      if (isPiecePlaceable) {
        return <PieceBase key={key} x={x} y={y} shape="." color={color} {...effect} />;
      } else {
        return <PieceBase key={key} x={x} y={y} {...effect} />;
      }
    } else {
      const player = playerByPiece[piece];
      const pieceStatus = toPieceStatus(piece);
      const shape = shapeByPlayer[player];
      const color = ShapeColor[shape];
      const style = styleByPieceStatus[pieceStatus];
      const dropped = pieceIndex === lastPlacedPieceIndex;

      return (
        <PieceBase key={key} x={x} y={y} shape={shape} color={color} style={style} dropped={dropped} {...effect} />
      );
    }
  };

  if (keyframe === null) {
    return (
      <BoardBase width={boardWidth} height={boardHeight} {...props}>
        {children}
        <g className="pieces">{game.pieces.map(toPieceElement)}</g>
      </BoardBase>
    );
  } else {
    const toUnchangedRoutes = (routes: PieceIndex[][], pieceIndex: PieceIndex) =>
      routes
        .map((route) => [...route, pieceIndex])
        .map((route) => (
          <Route
            key={route.join("-")}
            coordinates={route.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={1}
            reversed
          />
        ));

    const toAddedRoutes = (routes: PieceIndex[][], pieceIndex: PieceIndex) =>
      routes
        .map((route) => [...route, pieceIndex])
        .map((route) => (
          <Route
            key={route.join("-")}
            coordinates={route.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={1}
            reversed
            drawn
          />
        ));

    const toRemovedRoutes = (routes: PieceIndex[][], pieceIndex: PieceIndex) =>
      routes
        .map((route) => [...route, pieceIndex])
        .map((route) => (
          <Route
            key={route.join("-")}
            coordinates={route.map(toPieceCoordinate)}
            color={colorByPiece(game.pieces[pieceIndex])}
            opacity={1}
            reversed
            erased
          />
        ));

    return (
      <BoardBase width={boardWidth} height={boardHeight} {...props}>
        {children}
        <g className="effect-lines" style={{ opacity: 0.2 }}>
          {(keyframe.routesByPieceIndex as PieceIndex[][][]).map(toUnchangedRoutes)}
        </g>
        <g className="effect-lines" style={{ opacity: 0.4 }}>
          {(keyframe.addedRoutesByPieceIndex as PieceIndex[][][]).map(toAddedRoutes)}
          {(keyframe.removedRoutesByPieceIndex as PieceIndex[][][]).map(toRemovedRoutes)}
        </g>
        <g className="pieces">{keyframe.pieces.map(toPieceElement)}</g>
      </BoardBase>
    );
  }
};

const BoardForGame = Board;

export default BoardForGame;
