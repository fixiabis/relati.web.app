import {
  START_INDEX,
  NoPlayer,
  PieceIndex,
  Route,
  EMPTY_PIECE,
} from './definitions';

import type Game from './Game';
import type GameDefinition from './GameDefinition';

export type NoWinner = -2;
export const NO_PLAYER = -1;
export const NO_WINNER = -2;
const PIECE_INDEX_ROUTE_START_INDEX = 1;

/** 遊戲規則 */
type GameRule<Player extends number, Piece extends number> = {
  /** 定義 */
  readonly definition: GameDefinition<Player, Piece>;

  /**
   * 消耗棋子資源
   * @param pieces 棋子
   */
  readonly mutatePiecesToConsumed: (pieces: Piece[]) => void;

  /**
   * 供應棋子資源
   * @param pieces 棋子
   * @param producerPieceIndexes 生產者索引
   */
  readonly mutatePiecesToProvided: (
    pieces: Piece[],
    providerIndexes: PieceIndex[]
  ) => void;

  /**
   * 是否玩家棋子索引有可供應的棋子索引路徑
   * @param pieces 棋子
   * @param pieceIndex 棋子索引
   * @param player 玩家
   */
  readonly isPieceIndexHasProvidableRoute: (
    pieces: readonly Piece[],
    pieceIndex: PieceIndex,
    player: Player
  ) => boolean;

  /**
   * 取得贏家
   * @param pieces 棋子
   */
  readonly getWinner: (
    game: Game<Player, Piece>
  ) => Player | NoPlayer | NoWinner;
};

/**
 * 是否可用該棋子索引路徑
 * @param pieces 棋子
 * @param route 棋子索引路徑
 */
export const isRouteAvailable = <Piece extends number>(
  pieces: readonly Piece[],
  route: Route<PieceIndex>
): boolean => {
  for (
    let indexOfRoute = PIECE_INDEX_ROUTE_START_INDEX;
    indexOfRoute < route.length;
    indexOfRoute++
  ) {
    const pieceIndex = route[indexOfRoute];
    const piece = pieces[pieceIndex];

    if (piece !== EMPTY_PIECE) {
      return false;
    }
  }

  return true;
};

const GameRule = <Player extends number, Piece extends number>(
  definition: GameDefinition<Player, Piece>
): GameRule<Player, Piece> => {
  const {
    playersCount,
    piecesCount,
    consumedPieceByPiece,
    playerByPiece,
    providerPieceByPlayer,
    routesByPieceIndex: routesByPieceIndex,
    isConsumableByPieceByPlayer,
    isProvidableByPieceByPlayer,
  } = definition;

  const mutatePiecesToConsumed = (pieces: Piece[]) => {
    for (let pieceIndex = START_INDEX; pieceIndex < piecesCount; pieceIndex++) {
      const piece = pieces[pieceIndex];
      pieces[pieceIndex] = consumedPieceByPiece[piece];
    }
  };

  const mutatePiecesToProvided = (
    pieces: Piece[],
    providerPieceIndexes: PieceIndex[]
  ) => {
    for (const pieceIndex of providerPieceIndexes) {
      const piece = pieces[pieceIndex];
      const player = playerByPiece[piece] as Player;
      const providerPiece = providerPieceByPlayer[player];
      const routes = routesByPieceIndex[pieceIndex];
      const isConsumableByPiece = isConsumableByPieceByPlayer[player];

      for (const route of routes) {
        const [pieceIndex] = route;
        const piece = pieces[pieceIndex];

        const isRouteConsumable =
          isConsumableByPiece[piece] && isRouteAvailable<Piece>(pieces, route);

        if (isRouteConsumable) {
          pieces[pieceIndex] = providerPiece;
          providerPieceIndexes.push(pieceIndex);
        }
      }
    }
  };

  const isPieceIndexHasProvidableRoute = (
    pieces: readonly Piece[],
    pieceIndex: PieceIndex,
    player: Player
  ): boolean => {
    const isProvidableByPiece = isProvidableByPieceByPlayer[player];
    const routes = routesByPieceIndex[pieceIndex];

    for (const route of routes) {
      const [pieceIndex] = route;
      const piece = pieces[pieceIndex];

      const isRouteProvidable =
        isProvidableByPiece[piece] && isRouteAvailable<Piece>(pieces, route);

      if (isRouteProvidable) {
        return true;
      }
    }

    return false;
  };

  const getWinner = (
    game: Game<Player, Piece>
  ): Player | NoPlayer | NoWinner => {
    const { turn, pieces } = game;
    const playerOfTurn = (turn % playersCount) as Player;

    let lastPlayerWhoHasPieceIndexPlaceable:
      | Player
      | NoPlayer
      | NoWinner = NO_PLAYER;

    if (turn < playersCount) {
      return NO_WINNER;
    }

    const nextTurnOfPlayer = turn + playersCount;

    for (let passedTurn = turn; passedTurn < nextTurnOfPlayer; passedTurn++) {
      const playerOfPassedTurn = (passedTurn % playersCount) as Player;

      const hasPieceIndexPlaceable = pieces.some(
        (_, pieceIndex) =>
          pieces[pieceIndex] === EMPTY_PIECE &&
          isPieceIndexHasProvidableRoute(pieces, pieceIndex, playerOfPassedTurn)
      );

      if (hasPieceIndexPlaceable) {
        if (lastPlayerWhoHasPieceIndexPlaceable !== NO_PLAYER) {
          return NO_WINNER;
        }

        lastPlayerWhoHasPieceIndexPlaceable = playerOfPassedTurn;
      }
    }

    if (lastPlayerWhoHasPieceIndexPlaceable === playerOfTurn) {
      return NO_WINNER;
    }

    return lastPlayerWhoHasPieceIndexPlaceable;
  };

  return {
    definition,
    mutatePiecesToConsumed,
    mutatePiecesToProvided,
    isPieceIndexHasProvidableRoute,
    getWinner,
  };
};

export default GameRule;
