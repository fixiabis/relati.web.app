import { LightEnterIconUrl, LightDownIconUrl } from '../../../../../icons';
import { Coordinate } from '../../../../../relati';
import { StepBehavior } from '../types';

const centralCoordinate: Coordinate = [2, 2];

const port8CoordinateRoutes: Coordinate[][] = ([
  [2, 1],
  [2, 3],
  [1, 2],
  [3, 2],
  [1, 1],
  [3, 1],
  [1, 3],
  [3, 3],
] as Coordinate[]).map((coordinate) => [centralCoordinate, coordinate]);

const behaviors: StepBehavior[] = [
  {
    getNoticeProps: () => ({
      message: '照著框框放下棋子吧！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        if (x === 2 && y === 2) {
          const pieceIndex = game.definition.toPieceIndex([x, y]);
          place(pieceIndex);
          next();
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: [
        {
          x: 2,
          y: 2,
          shape: '#',
          bouncing: true,
          color: 'crimson',
        },
      ],
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '第一個之後的棋子放下時要跟自己的棋子連接喔！',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port8CoordinateRoutes.map((coordinates) => ({
        coordinates,
        drawn: true,
        color: 'crimson',
        opacity: 0.4,
      })),
    },
    execute: (next) => setTimeout(next, 500),
  },
  {
    boardAdditions: {
      propsOfRoutes: port8CoordinateRoutes.map((coordinates) => ({
        coordinates,
        color: 'crimson',
        opacity: 0.2,
      })),
    },
    getNoticeProps: (next) => ({
      message: '這些跑出來的線段，就是連接路徑。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port8CoordinateRoutes.map((coordinates) => ({
        coordinates,
        color: 'crimson',
        erased: true,
        opacity: 0.4,
      })),
    },
    execute: (next) => setTimeout(next, 500),
  },
  {
    execute: (next, game, place) => {
      const pieceIndexesForPlacementRandomly = game.definition.pieceIndexes
        .map((pieceIndex) => game.definition.toCoordinate(pieceIndex))
        .filter(([x, y]) => !(x > 0 && x < 4 && y > 0 && y < 4))
        .map((coordinate) => game.definition.toPieceIndex(coordinate));

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
    getNoticeProps: () => ({
      message: '嘗試選個地方放吧！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);
          next();
        }
      },
    }),
  },
  {
    getNoticeProps: (next) => ({
      message: '雖然有放置提示，但建議記住連接路徑。',
      onButtonClick: () => next(),
    }),
  },
  {
    getNoticeProps: () => ({
      buttonIconUrl: LightEnterIconUrl,
      buttonColor: 'royalblue',
      buttonHref: '/tutorial?board=x5&stage=3',
      message: '讓我們繼續吧！',
    }),
  },
];

export default behaviors;
