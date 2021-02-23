import { LightDownIconUrl } from '../../../../../icons';
import { Coordinate, GameDefinition } from '../../../../../relati';
import { DirectionRoute } from '../../../../../relati/values';
import { StepBehavior } from '../types';

const definition = GameDefinition(2, 7, 7, DirectionRoute.P16);

const centralCoordinate: Coordinate = [3, 3];

const port8CoordinateRoutes: Coordinate[][] = DirectionRoute.P8.map(
  (directions) =>
    directions.map(definition.toMovedCoordinate(centralCoordinate)).reverse()
);

const port16CoordinateRoutes: Coordinate[][] = DirectionRoute.P16.slice(
  8
).map((directions) =>
  directions.map(definition.toMovedCoordinate(centralCoordinate)).reverse()
);

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
    getOverDialogProps: (router) => ({
      message: '你已經完成第二階段的教學！',
      onEnter: () => router.push('/tutorial?board=x7&stage=3'),
    }),
  },
];

export default behaviors;
