/** 唯讀資料 */
export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<
  Record<K, V>
>;

/** 座標 */
export type Coordinate = readonly [number, number];

/** 方向 */
export type Direction = readonly [number, number];

/** 棋子索引 */
export type PieceIndex = number;

/** 棋子狀態 */
export enum PieceStatus {
  /** 未知 */
  Unknown = -1,

  /** 生產者 */
  Producer,

  /** 提供者 */
  Provider,

  /** 消耗者 */
  Consumer,

  /** 死者 */
  Deceased,
}

/** 路徑 */
export type Route<T> = readonly T[];

/** 無玩家 */
export type NoPlayer = -1;

/** 一步驟 */
export const STEP = 1;

/** 開始索引 */
export const START_INDEX = 0;

/** 無長度 */
export const NO_LENGTH = 0;

/** 開始X值 */
export const START_X = START_INDEX;

/** 開始Y值 */
export const START_Y = START_INDEX;

/** 開始回合 */
export const START_TURN = START_INDEX;

/** 空格棋子 */
export const EMPTY_PIECE = 0;

/** 第一個玩家 */
export const FIRST_PLAYER = START_INDEX;

/** 棋子狀態數 */
export const PIECE_STATUS_COUNT = 4;

/** 空格棋子數 */
export const EMPTY_PIECE_COUNT = 1;

/** 建立陣列(初始為索引值) */
export const range = <Value extends number>(length: number) =>
  Array.from({ length }, (_, value) => value as Value);
