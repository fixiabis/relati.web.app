import type { Game, PieceIndex, ReadonlyRecord } from '../core';

/** 思路 */
export type Thinking<Player extends number, Piece extends number> = {
  /** 取得作為該玩家的分數 */
  readonly getPointsOfPlayer: (
    game: Game<Player, Piece>,
    player: Player
  ) => number;
};

/** 可解釋的思路 */
export type ExplainableThinking<Player extends number, Piece extends number> = {
  /** 取得作為該玩家個棋子的分數 */
  readonly getEachPiecesPointsOfPlayer: (
    game: Game<Player, Piece>,
    player: Player
  ) => ReadonlyRecord<PieceIndex, number>;
} & Thinking<Player, Piece>;

/** 思考者 */
export type Thinker<Player extends number, Piece extends number> = {
  /** 取得下一步要放的棋子索引 */
  readonly getPieceIndexForPlacement: (game: Game<Player, Piece>) => number;
};

/** 無分數 */
export const NO_POINTS = 0;
