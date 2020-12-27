import {
  Direction,
  PieceIndex,
  PieceStatus,
  Route,
  ReadonlyRecord,
  NoPlayer,
  START_X,
  START_Y,
  EMPTY_PIECE_COUNT,
  NO_LENGTH,
  PIECE_STATUS_COUNT,
  Coordinate,
  range,
} from './definitions';

/** 遊戲規則定義 */
type GameDefinition<Player extends number, Piece extends number> = {
  /** 玩家數 */
  readonly playersCount: number;

  /** 棋盤寬 */
  readonly boardWidth: number;

  /** 棋盤高 */
  readonly boardHeight: number;

  /** 方向路徑 */
  readonly directionRoutes: readonly Route<Direction>[];

  /** 棋子數 */
  readonly piecesCount: number;

  /** 棋子種類數 */
  readonly pieceTypesCount: number;

  /** 棋子所屬玩家 */
  readonly playerByPiece: ReadonlyRecord<Piece, Player | NoPlayer>;

  /** 各自棋子索引可用的棋子索引路徑(不含越界) */
  readonly pieceIndexRoutesByPieceIndex: ReadonlyRecord<
    PieceIndex,
    readonly Route<PieceIndex>[]
  >;

  /** 棋子在被提供資源後的樣子 */
  readonly providedPieceByPiece: ReadonlyRecord<Piece, Piece>;

  /** 棋子在被消耗資源後的樣子 */
  readonly consumedPieceByPiece: ReadonlyRecord<Piece, Piece>;

  /** 玩家的資源生產者棋子 */
  readonly producerPieceByPlayer: ReadonlyRecord<Player, Piece>;

  /** 玩家的資源提供者棋子 */
  readonly providerPieceByPlayer: ReadonlyRecord<Player, Piece>;

  /** 玩家的資源消耗者棋子 */
  readonly consumerPieceByPlayer: ReadonlyRecord<Player, Piece>;

  /** 玩家的棋子是否能夠提供資源 */
  readonly isProvidableByPieceByPlayer: ReadonlyRecord<
    Player,
    ReadonlyRecord<Piece, boolean>
  >;

  /** 玩家的棋子是否能夠消耗資源 */
  readonly isConsumableByPieceByPlayer: ReadonlyRecord<
    Player,
    ReadonlyRecord<Piece, boolean>
  >;

  /** 所有玩家 */
  readonly players: readonly Player[];

  /** 所有棋子種類 */
  readonly pieceTypes: readonly Piece[];

  /** 所有棋子索引 */
  readonly pieceIndexes: readonly PieceIndex[];

  /**
   * 取得棋子
   * @param pieceStatus 狀態
   * @param player 玩家
   */
  readonly getPiece: (pieceStatus: PieceStatus, player: Player) => Piece;

  /**
   * 取得玩家
   * @param piece 棋子種類
   */
  readonly toPiecePlayer: (piece: Piece) => Player | NoPlayer;

  /**
   * 取得狀態
   * @param piece 棋子種類
   */
  readonly toPieceStatus: (piece: Piece) => PieceStatus;

  /**
   * 取得棋子座標
   * @param pieceIndex 棋子索引
   */
  readonly toPieceCoordinate: (pieceIndex: PieceIndex) => Coordinate;

  /**
   * 取得移動後的棋子座標
   * @param pieceIndex 棋子索引
   */
  readonly toMovedPieceCoordinate: (
    coordinate: Coordinate
  ) => (direction: Direction) => Coordinate;

  /**
   * 取得棋子索引
   * @param pieceX 棋子X值
   * @param pieceY 棋子Y值
   */
  readonly toPieceIndex: (coordinate: Coordinate) => PieceIndex;

  /**
   * 是否為合法索引
   * @param pieceIndex 棋子索引
   */
  readonly isPieceCoordinateValid: (coordinate: Coordinate) => boolean;
};

const GameDefinition = <Player extends number, Piece extends number>(
  playersCount: number,
  boardWidth: number,
  boardHeight: number,
  directionRoutes: readonly Route<Direction>[]
): GameDefinition<Player, Piece> => {
  const pieceTypesCount = PIECE_STATUS_COUNT * playersCount + EMPTY_PIECE_COUNT;
  const piecesCount = boardWidth * boardHeight;
  const players = range<Player>(playersCount);
  const pieceTypes = range<Piece>(pieceTypesCount);
  const pieceIndexes = range(piecesCount);

  const getPiece = (pieceStatus: PieceStatus, player: Player) =>
    (pieceStatus * playersCount + player + EMPTY_PIECE_COUNT) as Piece;

  const toPiecePlayer = (piece: Piece) =>
    ((piece - EMPTY_PIECE_COUNT) % playersCount) as Player | NoPlayer;

  const toPieceStatus = (piece: Piece) =>
    piece
      ? ((((piece - EMPTY_PIECE_COUNT) / playersCount) | 0) as PieceStatus)
      : PieceStatus.Unknown;

  const toPieceX = (pieceIndex: PieceIndex) => pieceIndex % boardWidth;

  const toPieceY = (pieceIndex: PieceIndex) => (pieceIndex / boardWidth) | 0;

  const toPieceCoordinate = (pieceIndex: PieceIndex) =>
    [toPieceX(pieceIndex), toPieceY(pieceIndex)] as Coordinate;

  const toMovedPieceCoordinate = ([pieceX, pieceY]: Coordinate) => ([
    moveX,
    moveY,
  ]: Direction) => [pieceX + moveX, pieceY + moveY] as Coordinate;

  const toPieceIndex = ([pieceX, pieceY]: Coordinate) =>
    pieceY * boardWidth + pieceX;

  const isPieceCoordinateValid = ([pieceX, pieceY]: Coordinate) =>
    pieceX >= START_X &&
    pieceX < boardWidth &&
    pieceY >= START_Y &&
    pieceY < boardHeight;

  const playerByPiece = pieceTypes.map(toPiecePlayer);

  const toPieceIndexRoute = (coordinate: Coordinate) => (
    directionRoute: Route<Direction>
  ) => {
    const pieceIndexRoute: Route<PieceIndex> = directionRoute
      .map(toMovedPieceCoordinate(coordinate))
      .filter(isPieceCoordinateValid)
      .map(toPieceIndex);

    const isPieceIndexRouteValid =
      pieceIndexRoute.length === directionRoute.length;

    return isPieceIndexRouteValid ? pieceIndexRoute : [];
  };

  const isPieceIndexRouteValid = (pieceIndexRoute: Route<PieceIndex>) =>
    pieceIndexRoute.length > NO_LENGTH;

  const toPieceIndexRoutes = (coordinate: Coordinate) =>
    directionRoutes
      .map(toPieceIndexRoute(coordinate))
      .filter(isPieceIndexRouteValid);

  const pieceIndexRoutesByPieceIndex = pieceIndexes
    .map(toPieceCoordinate)
    .map(toPieceIndexRoutes);

  type PieceInfo = [Piece, PieceStatus, Player];

  const toPieceWithPieceStatusWithPlayer = (piece: Piece): PieceInfo => [
    piece,
    toPieceStatus(piece),
    toPiecePlayer(piece) as Player,
  ];

  const toTargetPieceOnlySourcePiece = (
    sourcePieceStatus: PieceStatus,
    targetPieceStatus: PieceStatus
  ) => ([piece, pieceStatus, player]: PieceInfo) =>
    pieceStatus === sourcePieceStatus
      ? getPiece(targetPieceStatus, player)
      : piece;

  const toProvidedPiece = toTargetPieceOnlySourcePiece(
    PieceStatus.Consumer,
    PieceStatus.Provider
  );

  const providedPieceByPiece = pieceTypes
    .map(toPieceWithPieceStatusWithPlayer)
    .map(toProvidedPiece);

  const toConsumedPiece = toTargetPieceOnlySourcePiece(
    PieceStatus.Provider,
    PieceStatus.Consumer
  );

  const consumedPieceByPiece = pieceTypes
    .map(toPieceWithPieceStatusWithPlayer)
    .map(toConsumedPiece);

  const toPieceByPlayer = (pieceStatus: PieceStatus) => (player: Player) =>
    getPiece(pieceStatus, player);

  const toProducerPiece = toPieceByPlayer(PieceStatus.Producer);

  const producerPieceByPlayer = players.map(toProducerPiece);

  const toProviderPiece = toPieceByPlayer(PieceStatus.Provider);

  const providerPieceByPlayer = players.map(toProviderPiece);

  const toConsumerPiece = toPieceByPlayer(PieceStatus.Consumer);

  const consumerPieceByPlayer = players.map(toConsumerPiece);

  const toIsProvidable = (player: Player) => {
    const producerPiece = getPiece(PieceStatus.Producer, player);
    const providerPiece = getPiece(PieceStatus.Provider, player);
    return (piece: Piece) => piece === producerPiece || piece === providerPiece;
  };

  const toPieceToIsProvidableMap = (player: Player) =>
    pieceTypes.map(toIsProvidable(player));

  const isProvidableByPieceByPlayer = players.map(toPieceToIsProvidableMap);

  const toIsConsumable = (player: Player) => {
    const consumerPiece = getPiece(PieceStatus.Consumer, player);
    return (piece: Piece) => piece === consumerPiece;
  };

  const toPieceToIsConsumableMap = (player: Player) =>
    pieceTypes.map(toIsConsumable(player));

  const isConsumableByPieceByPlayer = players.map(toPieceToIsConsumableMap);

  return {
    playersCount,
    boardWidth,
    boardHeight,
    directionRoutes,
    piecesCount,
    pieceTypesCount,
    playerByPiece,
    pieceIndexRoutesByPieceIndex,
    providedPieceByPiece,
    consumedPieceByPiece,
    producerPieceByPlayer,
    providerPieceByPlayer,
    consumerPieceByPlayer,
    isProvidableByPieceByPlayer,
    isConsumableByPieceByPlayer,
    players,
    pieceTypes,
    pieceIndexes,
    getPiece,
    toPiecePlayer,
    toPieceStatus,
    toPieceCoordinate,
    toMovedPieceCoordinate,
    toPieceIndex,
    isPieceCoordinateValid,
  };
};

export default GameDefinition;
