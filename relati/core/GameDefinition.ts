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
  readonly routesByPieceIndex: ReadonlyRecord<
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

  /** 各棋子索引對應的座標 */
  readonly pieceCoordinateByPieceIndex: ReadonlyRecord<PieceIndex, Coordinate>;

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
  readonly toPiece: (pieceStatus: PieceStatus, player: Player) => Piece;

  /**
   * 取得玩家
   * @param piece 棋子種類
   */
  readonly getPlayer: (piece: Piece) => Player | NoPlayer;

  /**
   * 取得狀態
   * @param piece 棋子種類
   */
  readonly getStatus: (piece: Piece) => PieceStatus;

  /**
   * 取得棋子座標
   * @param pieceIndex 棋子索引
   */
  readonly toCoordinate: (pieceIndex: PieceIndex) => Coordinate;

  /**
   * 取得移動後的棋子座標
   * @param pieceIndex 棋子索引
   */
  readonly toMovedCoordinate: (
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
  readonly isCoordinateValid: (coordinate: Coordinate) => boolean;
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

  const toPiece = (pieceStatus: PieceStatus, player: Player) =>
    (pieceStatus * playersCount + player + EMPTY_PIECE_COUNT) as Piece;

  const getPlayer = (piece: Piece) =>
    ((piece - EMPTY_PIECE_COUNT) % playersCount) as Player | NoPlayer;

  const getStatus = (piece: Piece) =>
    piece
      ? ((((piece - EMPTY_PIECE_COUNT) / playersCount) | 0) as PieceStatus)
      : PieceStatus.Unknown;

  const toPieceX = (pieceIndex: PieceIndex) => pieceIndex % boardWidth;

  const toPieceY = (pieceIndex: PieceIndex) => (pieceIndex / boardWidth) | 0;

  const toCoordinate = (pieceIndex: PieceIndex) =>
    [toPieceX(pieceIndex), toPieceY(pieceIndex)] as Coordinate;

  const toMovedCoordinate = ([pieceX, pieceY]: Coordinate) => ([
    moveX,
    moveY,
  ]: Direction) => [pieceX + moveX, pieceY + moveY] as Coordinate;

  const toPieceIndex = ([pieceX, pieceY]: Coordinate) =>
    pieceY * boardWidth + pieceX;

  const isCoordinateValid = ([pieceX, pieceY]: Coordinate) =>
    pieceX >= START_X &&
    pieceX < boardWidth &&
    pieceY >= START_Y &&
    pieceY < boardHeight;

  const playerByPiece = pieceTypes.map(getPlayer);

  const toRoute = (coordinate: Coordinate) => (
    directionRoute: Route<Direction>
  ) => {
    const route: Route<PieceIndex> = directionRoute
      .map(toMovedCoordinate(coordinate))
      .filter(isCoordinateValid)
      .map(toPieceIndex);

    const isRouteValid = route.length === directionRoute.length;

    return isRouteValid ? route : [];
  };

  const isRouteValid = (route: Route<PieceIndex>) => route.length > NO_LENGTH;

  const toRoutes = (coordinate: Coordinate) =>
    directionRoutes.map(toRoute(coordinate)).filter(isRouteValid);

  const routesByPieceIndex = pieceIndexes.map(toCoordinate).map(toRoutes);

  type PieceInfo = [Piece, PieceStatus, Player];

  const toPieceWithPieceStatusWithPlayer = (piece: Piece): PieceInfo => [
    piece,
    getStatus(piece),
    getPlayer(piece) as Player,
  ];

  const toTargetPieceOnlySourcePiece = (
    sourcePieceStatus: PieceStatus,
    targetPieceStatus: PieceStatus
  ) => ([piece, pieceStatus, player]: PieceInfo) =>
    pieceStatus === sourcePieceStatus
      ? toPiece(targetPieceStatus, player)
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
    toPiece(pieceStatus, player);

  const toProducerPiece = toPieceByPlayer(PieceStatus.Producer);

  const producerPieceByPlayer = players.map(toProducerPiece);

  const toProviderPiece = toPieceByPlayer(PieceStatus.Provider);

  const providerPieceByPlayer = players.map(toProviderPiece);

  const toConsumerPiece = toPieceByPlayer(PieceStatus.Consumer);

  const consumerPieceByPlayer = players.map(toConsumerPiece);

  const toIsProvidable = (player: Player) => {
    const producerPiece = toPiece(PieceStatus.Producer, player);
    const providerPiece = toPiece(PieceStatus.Provider, player);
    return (piece: Piece) => piece === producerPiece || piece === providerPiece;
  };

  const toPieceToIsProvidableMap = (player: Player) =>
    pieceTypes.map(toIsProvidable(player));

  const isProvidableByPieceByPlayer = players.map(toPieceToIsProvidableMap);

  const toIsConsumable = (player: Player) => {
    const consumerPiece = toPiece(PieceStatus.Consumer, player);
    return (piece: Piece) => piece === consumerPiece;
  };

  const toPieceToIsConsumableMap = (player: Player) =>
    pieceTypes.map(toIsConsumable(player));

  const isConsumableByPieceByPlayer = players.map(toPieceToIsConsumableMap);

  const pieceCoordinateByPieceIndex = pieceIndexes.map(toCoordinate);

  return {
    playersCount,
    boardWidth,
    boardHeight,
    directionRoutes,
    piecesCount,
    pieceTypesCount,
    playerByPiece,
    routesByPieceIndex,
    providedPieceByPiece,
    consumedPieceByPiece,
    producerPieceByPlayer,
    providerPieceByPlayer,
    consumerPieceByPlayer,
    isProvidableByPieceByPlayer,
    isConsumableByPieceByPlayer,
    pieceCoordinateByPieceIndex,
    players,
    pieceTypes,
    pieceIndexes,
    toPiece,
    getPlayer,
    getStatus,
    toCoordinate,
    toMovedCoordinate,
    toPieceIndex,
    isCoordinateValid,
  };
};

export default GameDefinition;
