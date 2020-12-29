import { START_INDEX, Game, PieceIndex } from '../core';
import type { Thinker as ThinkerType, Thinking } from './definitions';

/** 隨機性 */
const RANDOMLY = true;

/** 取得隨機索引 */
const getRandomIndex = (count: number) => (count * Math.random()) | 0;

/** 思考者 */
const Thinker = <Player extends number, Piece extends number>(
  thinking: Thinking<Player, Piece>,
  randomly: boolean = RANDOMLY
): ThinkerType<Player, Piece> => {
  const getPieceIndexForPlacement = (game: Game<Player, Piece>) => {
    const { definition, turn } = game;
    const { playersCount, piecesCount } = definition;
    const player = (turn % playersCount) as Player;

    let pieceIndexesOfHighestPoints: PieceIndex[] = [];
    let highestPoints = (-Infinity as unknown) as Number;

    for (let pieceIndex = START_INDEX; pieceIndex < piecesCount; pieceIndex++) {
      const simulatedGame = game.place(pieceIndex, player);

      if (simulatedGame === game) {
        continue;
      }

      const points = thinking.getPointsOfPlayer(simulatedGame, player);

      if (points > highestPoints) {
        pieceIndexesOfHighestPoints = [pieceIndex];
        highestPoints = points;
      } else if (points === highestPoints) {
        pieceIndexesOfHighestPoints.push(pieceIndex);
      }
    }

    const pieceIndexOfHighestPoints =
      pieceIndexesOfHighestPoints[
        randomly
          ? getRandomIndex(pieceIndexesOfHighestPoints.length)
          : START_INDEX
      ];

    return pieceIndexOfHighestPoints;
  };

  return { getPieceIndexForPlacement };
};

export default Thinker;
