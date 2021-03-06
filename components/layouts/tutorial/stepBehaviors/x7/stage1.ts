import { LightDownIconUrl } from '../../../../../icons';
import { EMPTY_PIECE } from '../../../../../relati';
import { StepBehavior } from '../types';

const behaviors: StepBehavior[] = [
  {
    getNoticeProps: () => ({
      message: '遊戲開始，選擇任何空格放下棋子吧！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);
        place(pieceIndex);
        next();
      },
    }),
  },
  {
    getNoticeProps: (next) => ({
      message: '當然，對方也能選擇任何空格放下棋子。',
      onButtonClick: () => next(),
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndexesForPlacementRandomly = game.definition.pieceIndexes
        .map((pieceIndex) => game.definition.toCoordinate(pieceIndex))
        .filter(([x, y]) => x > 2 && x < 5 && y > 2 && y < 5)
        .map((coordinate) => game.definition.toPieceIndex(coordinate))
        .filter((pieceIndex) => game.pieces[pieceIndex] === EMPTY_PIECE);

      const indexOfPieceIndexForPlacementRandomly = Math.floor(
        Math.random() * pieceIndexesForPlacementRandomly.length
      );

      const pieceIndexForPlacementRandomly =
        pieceIndexesForPlacementRandomly[indexOfPieceIndexForPlacementRandomly];

      place(pieceIndexForPlacementRandomly);
      setTimeout(next, 500);
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '第一個棋子放下的位置會影響到後面的局面喔！',
      onButtonClick: () => next(),
    }),
  },
  {
    getOverDialogProps: (router) => ({
      message: '你已經完成第一階段的教學！',
      onEnter: () => router.push('/tutorial?board=x7&stage=2'),
    }),
  },
];

export default behaviors;
