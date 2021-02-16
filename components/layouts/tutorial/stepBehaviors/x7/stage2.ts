import { LightEnterIconUrl, LightDownIconUrl } from '../../../../../icons';
import { Coordinate } from '../../../../../relati';
import { StepBehavior } from '../types';

const centralCoordinate: Coordinate = [3, 3];

const port8CoordinateRoutes: Coordinate[][] = ([
  [3, 2],
  [3, 4],
  [2, 3],
  [4, 3],
  [2, 2],
  [4, 2],
  [2, 4],
  [4, 4],
] as Coordinate[]).map((coordinate) => [centralCoordinate, coordinate]);

const port16CoordinateRoutes: Coordinate[][] = ([
  [
    [3, 2],
    [3, 1],
  ],
  [
    [3, 4],
    [3, 5],
  ],
  [
    [2, 3],
    [1, 3],
  ],
  [
    [4, 3],
    [5, 3],
  ],
  [
    [2, 2],
    [1, 1],
  ],
  [
    [4, 2],
    [5, 1],
  ],
  [
    [2, 4],
    [1, 5],
  ],
  [
    [4, 4],
    [5, 5],
  ],
] as Coordinate[][]).map((coordinates) => [centralCoordinate, ...coordinates]);

const behaviors: StepBehavior[] = [
  {
    getNoticeProps: () => ({
      message: '照著框框放下棋子吧！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        if (x === 3 && y === 3) {
          const pieceIndex = game.definition.toPieceIndex([x, y]);
          place(pieceIndex);
          next();
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: [
        {
          x: 3,
          y: 3,
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
    boardAdditions: {
      propsOfRoutes: port16CoordinateRoutes.map((coordinates) => ({
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
      propsOfRoutes: port16CoordinateRoutes.map((coordinates) => ({
        coordinates,
        color: 'crimson',
        opacity: 0.2,
      })),
    },
    getNoticeProps: (next) => ({
      message: '除了剛剛的路徑之外，還有範圍增加的路徑。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port16CoordinateRoutes.map((coordinates) => ({
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
        .filter(([x, y]) => !(x > 0 && x < 6 && y > 0 && y < 6))
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
      buttonHref: '/tutorial?board=x7&stage=3',
      message: '讓我們繼續吧！',
    }),
  },
];

export default behaviors;
