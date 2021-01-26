import {
  NoPlayer,
  PieceIndex,
  Route,
  EMPTY_PIECE,
  Coordinate,
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
   * @param providerIndexes 生產者索引
   */
  readonly mutatePiecesToProvided: (
    pieces: Piece[],
    providerIndexes: PieceIndex[]
  ) => void;

  /**
   * 抹殺棋子
   * @param pieces 棋子
   * @param trigger 板機索引
   */
  readonly mutatePiecesToDeceased: (
    pieces: Piece[],
    triggerIndex: PieceIndex
  ) => void;

  /**
   * 是否可用該棋子索引路徑
   * @param pieces 棋子
   * @param route 棋子索引路徑
   */
  readonly isRouteAvailable: (
    pieces: readonly Piece[],
    route: Route<PieceIndex>
  ) => boolean;

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

const GameRule = <Player extends number, Piece extends number>(
  definition: GameDefinition<Player, Piece>
): GameRule<Player, Piece> => {
  const {
    playersCount,
    pieceIndexes,
    consumedPieceByPiece,
    deceasedPieceByPiece,
    playerByPiece,
    providerPieceByPlayer,
    deceasedPieceByPlayer,
    routesByPieceIndex,
    turretBasesByPieceIndex,
    isConsumableByPieceByPlayer,
    isProvidableByPieceByPlayer,
    isTargetableByPieceByPlayer,
    isAvailableForRouteByPiece,
    toCoordinate,
    toPieceIndex,
    isCoordinateValid,
  } = definition;

  const mutatePiecesToConsumed = (pieces: Piece[]) => {
    for (const pieceIndex of pieceIndexes) {
      const piece = pieces[pieceIndex];
      pieces[pieceIndex] = consumedPieceByPiece[piece];
    }
  };

  const mutatePiecesToProvided = (
    pieces: Piece[],
    providerIndexes: PieceIndex[]
  ) => {
    for (const pieceIndex of providerIndexes) {
      const piece = pieces[pieceIndex];
      const player = playerByPiece[piece] as Player;
      const isProvidableByPiece = isProvidableByPieceByPlayer[player];

      if (isProvidableByPiece[piece]) {
        const routes = routesByPieceIndex[pieceIndex];
        const providerPiece = providerPieceByPlayer[player];
        const isConsumableByPiece = isConsumableByPieceByPlayer[player];

        for (const route of routes) {
          const [pieceIndex] = route;
          const piece = pieces[pieceIndex];

          const isRouteConsumable =
            isConsumableByPiece[piece] && isRouteAvailable(pieces, route);

          if (isRouteConsumable) {
            pieces[pieceIndex] = providerPiece;
            providerIndexes.push(pieceIndex);
          }
        }
      }
    }
  };

  const mutatePiecesToDeceased = (pieces: Piece[], bulletIndex: PieceIndex) => {
    const bullet = pieces[bulletIndex];
    const player = playerByPiece[bullet] as Player;
    const isTargetableByPiece = isTargetableByPieceByPlayer[player];
    const turretBases = turretBasesByPieceIndex[bulletIndex];
    const [bulletX, bulletY] = toCoordinate(bulletIndex);

    for (const turretBase of turretBases) {
      const [triggerIndex] = turretBase;

      const isTurretFulfilled = isTurretBaseFulfilled(
        pieces,
        turretBase,
        player
      );

      if (isTurretFulfilled) {
        const [triggerX, triggerY] = toCoordinate(triggerIndex);
        const deltaX = triggerX - bulletX;
        const deltaY = triggerY - bulletY;

        let targetX = bulletX + deltaX;
        let targetY = bulletY + deltaY;
        let targetCoordinate: Coordinate = [targetX, targetY];

        while (isCoordinateValid(targetCoordinate)) {
          const targetIndex = toPieceIndex(targetCoordinate);
          const target = pieces[targetIndex];
          const isTargetTargetable = isTargetableByPiece[target];

          if (isTargetTargetable) {
            pieces[targetIndex] = deceasedPieceByPiece[target];
            pieces[bulletIndex] = deceasedPieceByPiece[bullet];
            break;
          }

          targetX += deltaX;
          targetY += deltaY;
          targetCoordinate = [targetX, targetY];
        }
      }
    }
  };

  const isTurretBaseFulfilled = (
    pieces: readonly Piece[],
    turretBase: Route<PieceIndex>,
    player: Player
  ): boolean => {
    for (const pieceIndex of turretBase) {
      const piece = pieces[pieceIndex];
      const playerOfPiece = playerByPiece[piece];

      if (playerOfPiece !== player) {
        return false;
      }
    }

    return true;
  };

  const isRouteAvailable = (
    pieces: readonly Piece[],
    route: Route<PieceIndex>
  ): boolean => {
    const availableRoute = route.slice(PIECE_INDEX_ROUTE_START_INDEX);

    for (const pieceIndex of availableRoute) {
      const piece = pieces[pieceIndex];

      if (!isAvailableForRouteByPiece[piece]) {
        return false;
      }
    }

    return true;
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
        isProvidableByPiece[piece] && isRouteAvailable(pieces, route);

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
    mutatePiecesToDeceased,
    isRouteAvailable,
    isPieceIndexHasProvidableRoute,
    getWinner,
  };
};

export default GameRule;
