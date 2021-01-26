import { Game, GameDefinition, PieceIndex, ReadonlyRecord } from '../../core';
import { NO_POINTS, ExplainableThinking } from '../definitions';

import InfluenceBasedThinking, {
  UNDER_INFLUENCE_POINTS,
  NO_INFLUENCE_POINTS,
} from './InfluenceBasedThinking';

/** 基於多方影響區域的思路 */
const MultiInfluencesBasedThinking = <
  Player extends number,
  Piece extends number
>(
  definition: GameDefinition<Player, Piece>
): ExplainableThinking<Player, Piece> => {
  const { piecesCount, pieceIndexes, players } = definition;
  const baseThinking = InfluenceBasedThinking(definition);

  const calcEachPiecesPointsFromBaseThinking =
    baseThinking.calcEachPiecePointsOfPlayer;

  const OVER_INFLUENCE_POINTS = piecesCount;
  const HIGHEST_INFULENCE_POINTS = OVER_INFLUENCE_POINTS - 1; // prototype is OVER_INFLUENCE_POINTS - 0

  const getEachPiecesPointsOfEachPlayer = (
    game: Game<Player, Piece>
  ): ReadonlyRecord<Player, ReadonlyRecord<PieceIndex, number>> => {
    const playerToPieceIndexToInfluencePointsMap: Record<
      Player,
      ReadonlyRecord<PieceIndex, number>
    > = [];

    for (const player of players) {
      const pieceIndexToInfluencePointsMap = calcEachPiecesPointsFromBaseThinking(
        game,
        player
      );

      playerToPieceIndexToInfluencePointsMap[
        player
      ] = pieceIndexToInfluencePointsMap;
    }

    return playerToPieceIndexToInfluencePointsMap;
  };

  const calcEachPiecePointsOfPlayer = (
    game: Game<Player, Piece>,
    player: Player
  ) => {
    const playerToPieceIndexToInfluencePointsMap = getEachPiecesPointsOfEachPlayer(
      game
    );

    const pieceIndexToInfluencePointsMap =
      playerToPieceIndexToInfluencePointsMap[player];

    const pieceIndexToPointsMap: Record<PieceIndex, number> = [];

    for (const pieceIndex of pieceIndexes) {
      const influencePoints = pieceIndexToInfluencePointsMap[pieceIndex];

      switch (influencePoints) {
        case UNDER_INFLUENCE_POINTS:
        case OVER_INFLUENCE_POINTS: {
          pieceIndexToPointsMap[pieceIndex] = NO_POINTS;
          break;
        }

        case NO_INFLUENCE_POINTS: {
          pieceIndexToPointsMap[pieceIndex] = -HIGHEST_INFULENCE_POINTS;
          break;
        }

        default: {
          let piecePoints = HIGHEST_INFULENCE_POINTS;

          for (const otherPlayer of players) {
            if (otherPlayer !== player) {
              const pieceIndexToInfluencePointsMapOfOtherPlayer =
                playerToPieceIndexToInfluencePointsMap[otherPlayer];

              const otherPlayerInfluencePoints =
                pieceIndexToInfluencePointsMapOfOtherPlayer[pieceIndex];

              if (otherPlayerInfluencePoints !== NO_INFLUENCE_POINTS) {
                const piecePointsFromMatch =
                  influencePoints - otherPlayerInfluencePoints;

                if (piecePointsFromMatch < piecePoints) {
                  piecePoints = piecePointsFromMatch;
                }
              }
            }
          }

          pieceIndexToPointsMap[pieceIndex] = piecePoints;
        }
      }
    }

    return pieceIndexToPointsMap;
  };

  const calcPointsOfPlayer = (game: Game<Player, Piece>, player: Player) => {
    const playerToPieceIndexToInfluencePointsMap = getEachPiecesPointsOfEachPlayer(
      game
    );

    const pieceIndexToInfluencePointsMap =
      playerToPieceIndexToInfluencePointsMap[player];

    let points = NO_POINTS;

    for (const pieceIndex of pieceIndexes) {
      const influencePoints = pieceIndexToInfluencePointsMap[pieceIndex];

      switch (influencePoints) {
        case UNDER_INFLUENCE_POINTS:
        case OVER_INFLUENCE_POINTS: {
          break;
        }

        case NO_INFLUENCE_POINTS: {
          points += -HIGHEST_INFULENCE_POINTS;
          break;
        }

        default: {
          let piecePoints = HIGHEST_INFULENCE_POINTS;

          for (const otherPlayer of players) {
            if (otherPlayer !== player) {
              const pieceIndexToInfluencePointsMapOfOtherPlayer =
                playerToPieceIndexToInfluencePointsMap[otherPlayer];

              const influencePointsOfOtherPlayer =
                pieceIndexToInfluencePointsMapOfOtherPlayer[pieceIndex];

              if (influencePointsOfOtherPlayer !== NO_INFLUENCE_POINTS) {
                const piecePointsOfMatchOtherPlayer =
                  influencePoints - influencePointsOfOtherPlayer;

                if (piecePointsOfMatchOtherPlayer < piecePoints) {
                  piecePoints = piecePointsOfMatchOtherPlayer;
                }
              }
            }
          }

          points += piecePoints;
        }
      }
    }

    return points;
  };

  return { calcEachPiecePointsOfPlayer, calcPointsOfPlayer };
};

export default MultiInfluencesBasedThinking;
