import { Game, START_INDEX, STEP } from '../../core';
import type { Thinking, ExplainableThinking } from '../definitions';

/** 無深度 */
const NO_DEPTH = 0;

/** 深度思路 */
const DeepThinking = <Player extends number, Piece extends number>(
  thinking: ExplainableThinking<Player, Piece>,
  defaultDepth: number = NO_DEPTH
): Thinking<Player, Piece> => {
  const getPointsOfPlayer = (
    game: Game<Player, Piece>,
    player: Player,
    depth: number = defaultDepth,
    alpha = -Infinity,
    beta = +Infinity
  ): number => {
    const { definition, turn } = game;
    const { playersCount, piecesCount } = definition;
    const playerOfTurn = (turn % playersCount) as Player;

    if (depth === NO_DEPTH) {
      const points = thinking.getPointsOfPlayer(game, player);
      return points;
    }

    if (player === playerOfTurn) {
      for (
        let pieceIndex = START_INDEX;
        pieceIndex < piecesCount;
        pieceIndex++
      ) {
        const simulatedGame = game.place(pieceIndex, playerOfTurn);

        if (simulatedGame === game) {
          continue;
        }

        const points = getPointsOfPlayer(
          simulatedGame,
          player,
          depth - STEP,
          alpha,
          beta
        );

        if (points > alpha) {
          alpha = points;
        }

        if (beta <= alpha) {
          break;
        }
      }

      return alpha;
    } else {
      for (
        let pieceIndex = START_INDEX;
        pieceIndex < piecesCount;
        pieceIndex++
      ) {
        const simulatedGame = game.place(pieceIndex, playerOfTurn);

        if (simulatedGame === game) {
          continue;
        }

        const points = getPointsOfPlayer(
          simulatedGame,
          player,
          depth - STEP,
          alpha,
          beta
        );

        if (points < beta) {
          beta = points;
        }

        if (beta <= alpha) {
          break;
        }
      }

      return beta;
    }
  };

  return { getPointsOfPlayer };
};

export default DeepThinking;
