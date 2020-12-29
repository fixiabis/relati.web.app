import {
  START_INDEX,
  FIRST_PLAYER,
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
  readonly isPieceIndexOfPlayerHasProvidablePieceIndexRoute: (
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
 * @param pieceIndexRoute 棋子索引路徑
 */
export const isPieceIndexRouteAvailable = <Piece extends number>(
  pieces: readonly Piece[],
  pieceIndexRoute: Route<PieceIndex>
): boolean => {
  for (
    let indexOfPieceIndexRoute = PIECE_INDEX_ROUTE_START_INDEX;
    indexOfPieceIndexRoute < pieceIndexRoute.length;
    indexOfPieceIndexRoute++
  ) {
    const pieceIndex = pieceIndexRoute[indexOfPieceIndexRoute];
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
    pieceIndexRoutesByPieceIndex,
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
      const pieceIndexRoutes = pieceIndexRoutesByPieceIndex[pieceIndex];
      const isConsumableByPiece = isConsumableByPieceByPlayer[player];

      for (const pieceIndexRoute of pieceIndexRoutes) {
        const [pieceIndex] = pieceIndexRoute;
        const piece = pieces[pieceIndex];

        const isPieceIndexRouteConsumable =
          isConsumableByPiece[piece] &&
          isPieceIndexRouteAvailable<Piece>(pieces, pieceIndexRoute);

        if (isPieceIndexRouteConsumable) {
          pieces[pieceIndex] = providerPiece;
          providerPieceIndexes.push(pieceIndex);
        }
      }
    }
  };

  const isPieceIndexOfPlayerHasProvidablePieceIndexRoute = (
    pieces: readonly Piece[],
    pieceIndex: PieceIndex,
    player: Player
  ): boolean => {
    const isProvidableByPiece = isProvidableByPieceByPlayer[player];
    const pieceIndexRoutes = pieceIndexRoutesByPieceIndex[pieceIndex];

    for (const pieceIndexRoute of pieceIndexRoutes) {
      const [pieceIndex] = pieceIndexRoute;
      const piece = pieces[pieceIndex];

      const isPieceIndexRouteProvidable =
        isProvidableByPiece[piece] &&
        isPieceIndexRouteAvailable<Piece>(pieces, pieceIndexRoute);

      if (isPieceIndexRouteProvidable) {
        return true;
      }
    }

    return false;
  };

  const getWinner = (
    game: Game<Player, Piece>
  ): Player | NoPlayer | NoWinner => {
    const { turn, pieces } = game;

    let lastPlayerPlaceablePieceIndexesCount = 0;

    let lastPlayerWhoHasPieceIndexPlaceable:
      | Player
      | NoPlayer
      | NoWinner = NO_PLAYER;

    if (turn < playersCount) {
      return NO_WINNER;
    }

    for (let player = FIRST_PLAYER as Player; player < playersCount; player++) {
      const placeablePieceIndexesCount = pieces.filter(
        (_, pieceIndex) =>
          pieces[pieceIndex] === EMPTY_PIECE &&
          isPieceIndexOfPlayerHasProvidablePieceIndexRoute(
            pieces,
            pieceIndex,
            player
          )
      );

      if (placeablePieceIndexesCount.length > 0) {
        if (lastPlayerWhoHasPieceIndexPlaceable !== NO_PLAYER) {
          return NO_WINNER;
        }

        lastPlayerWhoHasPieceIndexPlaceable = player;

        lastPlayerPlaceablePieceIndexesCount =
          placeablePieceIndexesCount.length;
      }
    }

    if (lastPlayerPlaceablePieceIndexesCount === 1) {
      return NO_WINNER;
    }

    return lastPlayerWhoHasPieceIndexPlaceable;
  };

  return {
    definition,
    mutatePiecesToConsumed,
    mutatePiecesToProvided,
    isPieceIndexOfPlayerHasProvidablePieceIndexRoute,
    getWinner,
  };
};

export default GameRule;
