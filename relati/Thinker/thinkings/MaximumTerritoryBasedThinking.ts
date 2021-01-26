import { Game, GameDefinition, START_INDEX } from '../../core';
import { NO_POINTS, ExplainableThinking } from '../definitions';
import MultiInfluencesBasedThinking from './MultiInfluencesBasedThinking';

/** 基於最大可能領地的思路 */
const MaximumTerritoryBasedThinking = <
  Player extends number,
  Piece extends number
>(
  definition: GameDefinition<Player, Piece>
): ExplainableThinking<Player, Piece> => {
  const { piecesCount, pieceIndexes } = definition;
  const baseThinking = MultiInfluencesBasedThinking(definition);

  const calcEachPiecesPointsFromBaseThinking =
    baseThinking.calcEachPiecePointsOfPlayer;

  const OVER_INFLUENCE_POINTS = piecesCount;
  const HIGHEST_INFULENCE_POINTS = OVER_INFLUENCE_POINTS - 1; // prototype is OVER_INFLUENCE_POINTS - 0

  const calcEachPiecePointsOfPlayer = (
    game: Game<Player, Piece>,
    player: Player
  ) => {
    const pieceIndexToMultiInfluencesPointsMap = calcEachPiecesPointsFromBaseThinking(
      game,
      player
    );

    const pieceIndexToPointsMap = [];

    for (const pieceIndex of pieceIndexes) {
      const multiInfluencesPoints =
        pieceIndexToMultiInfluencesPointsMap[pieceIndex];

      pieceIndexToPointsMap[pieceIndex] =
        multiInfluencesPoints === 0
          ? 0
          : multiInfluencesPoints === HIGHEST_INFULENCE_POINTS
          ? HIGHEST_INFULENCE_POINTS
          : multiInfluencesPoints === -HIGHEST_INFULENCE_POINTS
          ? -HIGHEST_INFULENCE_POINTS
          : multiInfluencesPoints > 0
          ? HIGHEST_INFULENCE_POINTS / 2
          : -HIGHEST_INFULENCE_POINTS / 2;
    }

    return pieceIndexToPointsMap;
  };

  const calcPointsOfPlayer = (game: Game<Player, Piece>, player: Player) => {
    const pieceIndexToMultiInfluencesPointsMap = calcEachPiecesPointsFromBaseThinking(
      game,
      player
    );

    let points = NO_POINTS;

    for (const pieceIndex of pieceIndexes) {
      const multiInfluencesPoints =
        pieceIndexToMultiInfluencesPointsMap[pieceIndex];

      points +=
        multiInfluencesPoints === 0
          ? 0
          : multiInfluencesPoints === HIGHEST_INFULENCE_POINTS
          ? HIGHEST_INFULENCE_POINTS
          : multiInfluencesPoints === -HIGHEST_INFULENCE_POINTS
          ? -HIGHEST_INFULENCE_POINTS
          : multiInfluencesPoints > 0
          ? HIGHEST_INFULENCE_POINTS / 2
          : -HIGHEST_INFULENCE_POINTS / 2;
    }

    return points;
  };

  return { calcEachPiecePointsOfPlayer, calcPointsOfPlayer };
};

export default MaximumTerritoryBasedThinking;
