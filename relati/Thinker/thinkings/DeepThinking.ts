import { Game, STEP } from '../../core';
import type { Thinking, ExplainableThinking } from '../definitions';

/** 無深度 */
const NO_DEPTH = 0;

/** 深度思路 */
const DeepThinking = <Player extends number, Piece extends number>(
  thinking: ExplainableThinking<Player, Piece>,
  defaultDepth: number = NO_DEPTH
): Thinking<Player, Piece> => {
  const calcPointsOfPlayer = (
    game: Game<Player, Piece>,
    player: Player,
    depth: number = defaultDepth,
    alpha = -Infinity,
    beta = +Infinity
  ): number => {
    const { definition, turn } = game;
    const { playersCount, piecesCount, pieceIndexes } = definition;
    const playerOfTurn = (turn % playersCount) as Player;

    if (depth === NO_DEPTH) {
      const points = thinking.calcPointsOfPlayer(game, player);
      return points;
    }

    if (player === playerOfTurn) {
      for (const pieceIndex of pieceIndexes) {
        const simulatedGame = game.place(pieceIndex, playerOfTurn);

        if (simulatedGame === game) {
          continue;
        }

        const points = calcPointsOfPlayer(
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
      for (const pieceIndex of pieceIndexes) {
        const simulatedGame = game.place(pieceIndex, playerOfTurn);

        if (simulatedGame === game) {
          continue;
        }

        const points = calcPointsOfPlayer(
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

  return { calcPointsOfPlayer };
};

export default DeepThinking;
