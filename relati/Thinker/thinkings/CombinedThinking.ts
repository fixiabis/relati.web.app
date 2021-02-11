import { Game } from '../../core';
import type { Thinking, ExplainableThinking } from '../definitions';

const CombinedThinking = <Player extends number, Piece extends number>(
  thinkings: ExplainableThinking<Player, Piece>[]
): Thinking<Player, Piece> => {
  const calcPointsOfPlayer = (game: Game<Player, Piece>, player: Player) =>
    thinkings.reduce(
      (points, thinking) => points + thinking.calcPointsOfPlayer(game, player),
      0
    );

  return { calcPointsOfPlayer };
};

export default CombinedThinking;
