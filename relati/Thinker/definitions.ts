import type { Game, PieceIndex, ReadonlyRecord } from '../core';

/** 思路 */
export type Thinking<Player extends number, Piece extends number> = {
  /** 取得作為該玩家的分數 */
  readonly calcPointsOfPlayer: (
    game: Game<Player, Piece>,
    player: Player
  ) => number;
};

/** 可解釋的思路 */
export type ExplainableThinking<Player extends number, Piece extends number> = {
  /** 取得作為該玩家個棋子的分數 */
  readonly calcEachPiecePointsOfPlayer: (
    game: Game<Player, Piece>,
    player: Player
  ) => ReadonlyRecord<PieceIndex, number>;
} & Thinking<Player, Piece>;

/** 無分數 */
export const NO_POINTS = 0;
