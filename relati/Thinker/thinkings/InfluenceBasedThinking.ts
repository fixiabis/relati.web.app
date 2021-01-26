import {
  Coordinate,
  Direction,
  Game,
  GameDefinition,
  PieceIndex,
  ReadonlyRecord,
  STEP,
} from '../../core';

import { NO_POINTS, ExplainableThinking } from '../definitions';

export const NO_INFLUENCE_POINTS = NO_POINTS;
export const UNDER_INFLUENCE_POINTS = -1;

namespace NearbyDirection {
  export const F: Direction = [+0, -1];
  export const B: Direction = [+0, +1];
  export const L: Direction = [-1, +0];
  export const R: Direction = [+1, +0];
  export const FL: Direction = [-1, -1];
  export const FR: Direction = [+1, -1];
  export const BL: Direction = [-1, +1];
  export const BR: Direction = [+1, +1];
}

const nearbyDirections: Direction[] = [
  NearbyDirection.F,
  NearbyDirection.B,
  NearbyDirection.L,
  NearbyDirection.R,
  NearbyDirection.FL,
  NearbyDirection.FR,
  NearbyDirection.BL,
  NearbyDirection.BR,
];

/** 基於影響區域的思路 */
const InfluenceBasedThinking = <Player extends number, Piece extends number>(
  definition: GameDefinition<Player, Piece>
): ExplainableThinking<Player, Piece> => {
  const {
    piecesCount,
    pieceIndexes,
    toPieceIndex,
    toCoordinate,
    toMovedCoordinate,
    isCoordinateValid,
    isProvidableByPieceByPlayer,
  } = definition;

  const toNearbyPieceIndexes = (coordinate: Coordinate) =>
    nearbyDirections
      .map(toMovedCoordinate(coordinate))
      .filter(isCoordinateValid)
      .map(toPieceIndex);

  const nearbyPieceIndexesByPieceIndex = pieceIndexes
    .map(toCoordinate)
    .map(toNearbyPieceIndexes);

  const OVER_INFLUENCE_POINTS = piecesCount;

  const calcEachPiecePointsOfPlayer = (
    game: Game<Player, Piece>,
    player: Player
  ): ReadonlyRecord<PieceIndex, number> => {
    const { pieces } = game;
    const isProvidableByPiece = isProvidableByPieceByPlayer[player];
    const pieceIndexToInfluencePointsMap: Record<PieceIndex, number> = [];
    const providerPieceIndexes = [];

    for (const pieceIndex of pieceIndexes) {
      const piece = pieces[pieceIndex];

      if (isProvidableByPiece[piece]) {
        pieceIndexToInfluencePointsMap[pieceIndex] = OVER_INFLUENCE_POINTS;
        providerPieceIndexes.push(pieceIndex);
      } else {
        pieceIndexToInfluencePointsMap[pieceIndex] = piece
          ? UNDER_INFLUENCE_POINTS
          : NO_INFLUENCE_POINTS;
      }
    }

    for (const pieceIndex of providerPieceIndexes) {
      const influencePoints = pieceIndexToInfluencePointsMap[pieceIndex];
      const nearbyPieceIndexes = nearbyPieceIndexesByPieceIndex[pieceIndex];

      for (const pieceIndex of nearbyPieceIndexes) {
        const influencePointsOfNearbyPiece =
          pieceIndexToInfluencePointsMap[pieceIndex];

        if (influencePointsOfNearbyPiece === NO_INFLUENCE_POINTS) {
          pieceIndexToInfluencePointsMap[pieceIndex] = influencePoints - STEP;
          providerPieceIndexes.push(pieceIndex);
        }
      }
    }

    return pieceIndexToInfluencePointsMap;
  };

  const calcPointsOfPlayer = (game: Game<Player, Piece>, player: Player) => {
    const { pieces } = game;
    const isProvidableByPiece = isProvidableByPieceByPlayer[player];
    const pieceIndexToInfluencePointsMap: Record<PieceIndex, number> = [];
    const providerPieceIndexes = [];
    let points = NO_POINTS;

    for (const pieceIndex of pieceIndexes) {
      const piece = pieces[pieceIndex];

      if (isProvidableByPiece[piece]) {
        pieceIndexToInfluencePointsMap[pieceIndex] = OVER_INFLUENCE_POINTS;
        providerPieceIndexes.push(pieceIndex);
      } else {
        pieceIndexToInfluencePointsMap[pieceIndex] = piece
          ? UNDER_INFLUENCE_POINTS
          : NO_INFLUENCE_POINTS;
      }
    }

    for (const pieceIndex of providerPieceIndexes) {
      const influencePoints = pieceIndexToInfluencePointsMap[pieceIndex];
      const nearbyPieceIndexes = nearbyPieceIndexesByPieceIndex[pieceIndex];

      for (const pieceIndex of nearbyPieceIndexes) {
        const influencePointsOfNearbyPiece =
          pieceIndexToInfluencePointsMap[pieceIndex];

        if (influencePointsOfNearbyPiece === NO_INFLUENCE_POINTS) {
          pieceIndexToInfluencePointsMap[pieceIndex] = influencePoints - STEP;
          points += influencePoints - STEP;
          providerPieceIndexes.push(pieceIndex);
        }
      }
    }

    return points;
  };

  return { calcEachPiecePointsOfPlayer, calcPointsOfPlayer };
};

export default InfluenceBasedThinking;
