import {
  EMPTY_PIECE,
  START_TURN,
  PieceIndex,
  STEP,
  range,
} from './definitions';

import type GameDefinition from './GameDefinition';
import type GameRule from './GameRule';

/** 遊戲 */
type Game<Player extends number, Piece extends number> = {
  /** 定義 */
  readonly definition: GameDefinition<Player, Piece>;

  /** 規則 */
  readonly rule: GameRule<Player, Piece>;

  /** 回合 */
  readonly turn: number;

  /** 棋子 */
  readonly pieces: readonly Piece[];

  /** 生產者索引 */
  readonly producerIndexes: readonly PieceIndex[];

  /** 放置棋子 */
  readonly place: (pieceIndex: number, player: Player) => Game<Player, Piece>;
};

/** 建立棋子 */
const createPieces = <Piece extends number>(piecesCount: number) =>
  range(piecesCount).map(() => EMPTY_PIECE as Piece);

const Game = <Player extends number, Piece extends number>(
  rule: GameRule<Player, Piece>,
  turn: number = START_TURN,
  pieces: readonly Piece[] = createPieces(rule.definition.piecesCount),
  producerIndexes: readonly PieceIndex[] = []
): Game<Player, Piece> => {
  const {
    definition,
    isPieceIndexHasProvidableRoute,
    mutatePiecesToConsumed,
    mutatePiecesToProvided,
  } = rule;

  const {
    playersCount,
    providerPieceByPlayer,
    producerPieceByPlayer,
  } = definition;

  const place = (pieceIndex: number, player: Player) => {
    const playerOfTurn = turn % playersCount;
    const isAllProducerPlaced = turn >= playersCount;

    if (isAllProducerPlaced) {
      const isPieceIndexPlaceable =
        player === playerOfTurn &&
        pieces[pieceIndex] === EMPTY_PIECE &&
        isPieceIndexHasProvidableRoute(pieces, pieceIndex, player);

      if (isPieceIndexPlaceable) {
        const providerPiece = providerPieceByPlayer[player];
        const piecesAfterPlaced = [...pieces];

        piecesAfterPlaced[pieceIndex] = providerPiece;
        mutatePiecesToConsumed(piecesAfterPlaced);
        mutatePiecesToProvided(piecesAfterPlaced, [...producerIndexes]);

        return Game(rule, turn + STEP, piecesAfterPlaced, producerIndexes);
      }
    } else {
      const isPieceIndexPlaceable =
        player === playerOfTurn && pieces[pieceIndex] === EMPTY_PIECE;

      if (isPieceIndexPlaceable) {
        const producerPiece = producerPieceByPlayer[player];
        const piecesAfterPlaced = [...pieces];
        const producerIndexesAfterPlaced = [...producerIndexes, pieceIndex];

        piecesAfterPlaced[pieceIndex] = producerPiece;

        return Game(
          rule,
          turn + STEP,
          piecesAfterPlaced,
          producerIndexesAfterPlaced
        );
      }
    }

    return game;
  };

  const game: Game<Player, Piece> = {
    definition,
    rule,
    turn,
    pieces,
    producerIndexes,
    place,
  };

  return game;
};

export default Game;
