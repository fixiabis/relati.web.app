import { LightDownIconUrl } from '../../../../../icons';
import { Coordinate, GameDefinition } from '../../../../../relati';
import { DirectionRoute } from '../../../../../relati/values';
import { StepBehavior } from '../types';

const definition = GameDefinition(2, 9, 9, DirectionRoute.P24);

const centralCoordinate: Coordinate = [4, 4];

const port8CoordinateRoutes: Coordinate[][] = DirectionRoute.P8.map(
  (directions) =>
    directions.map(definition.toMovedCoordinate(centralCoordinate)).reverse()
);

const port16CoordinateRoutes: Coordinate[][] = DirectionRoute.P16.slice(
  8
).map((directions) =>
  directions.map(definition.toMovedCoordinate(centralCoordinate)).reverse()
);

const port24CoordinateRoutesPart1: Coordinate[][] = DirectionRoute.P24.slice(
  16,
  16 + 8
).map((directions) =>
  directions.map(definition.toMovedCoordinate(centralCoordinate)).reverse()
);

const port24CoordinateRoutesPart2: Coordinate[][] = DirectionRoute.P24.slice(
  24,
  24 + 8
).map((directions) =>
  directions.map(definition.toMovedCoordinate(centralCoordinate)).reverse()
);

const port24CoordinateRoutesPart3: Coordinate[][] = DirectionRoute.P24.slice(
  32,
  32 + 8
).map((directions) =>
  directions.map(definition.toMovedCoordinate(centralCoordinate)).reverse()
);

const port24CoordinateRoutesOfFFL: Coordinate[][] = DirectionRoute.P24.filter(
  ([[x, y]]) => x === -1 && y === -2
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
        if (x === 4 && y === 4) {
          const pieceIndex = game.definition.toPieceIndex([x, y]);
          place(pieceIndex);
          next();
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: [
        {
          x: 4,
          y: 4,
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
    boardAdditions: {
      propsOfRoutes: port24CoordinateRoutesPart1.map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesPart1.map((coordinates) => ({
        coordinates,
        color: 'crimson',
        opacity: 0.2,
      })),
    },
    getNoticeProps: (next) => ({
      message: '這個不只涵蓋範圍不同外，擁有了三條連線路徑，這是第一條。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port24CoordinateRoutesPart1.map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesPart2.map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesPart2.map((coordinates) => ({
        coordinates,
        color: 'crimson',
        opacity: 0.2,
      })),
    },
    getNoticeProps: (next) => ({
      message: '這是三條連線路徑中的第二條。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port24CoordinateRoutesPart2.map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesPart3.map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesPart3.map((coordinates) => ({
        coordinates,
        color: 'crimson',
        opacity: 0.2,
      })),
    },
    getNoticeProps: (next) => ({
      message: '這是三條連線路徑中的第三條。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port24CoordinateRoutesPart3.map((coordinates) => ({
        coordinates,
        color: 'crimson',
        erased: true,
        opacity: 0.4,
      })),
    },
    execute: (next) => setTimeout(next, 500),
  },
  {
    getNoticeProps: (next) => ({
      message: '看起來有點難懂？那我們便針對一個點來介紹吧。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(0, 1)
        .map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(0, 1)
        .map((coordinates) => ({
          coordinates,
          color: 'crimson',
          opacity: 0.2,
        })),
    },
    getNoticeProps: (next) => ({
      message: '這是三條連線路徑中的第一條。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(0, 1)
        .map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(1, 2)
        .map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(1, 2)
        .map((coordinates) => ({
          coordinates,
          color: 'crimson',
          opacity: 0.2,
        })),
    },
    getNoticeProps: (next) => ({
      message: '這是三條連線路徑中的第二條。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(1, 2)
        .map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(2, 3)
        .map((coordinates) => ({
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
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(2, 3)
        .map((coordinates) => ({
          coordinates,
          color: 'crimson',
          opacity: 0.2,
        })),
    },
    getNoticeProps: (next) => ({
      message: '這是三條連線路徑中的第三條。',
      onButtonClick: () => next(),
    }),
  },
  {
    boardAdditions: {
      propsOfRoutes: port24CoordinateRoutesOfFFL
        .slice(2, 3)
        .map((coordinates) => ({
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
        .filter(([x, y]) => !(x > 0 && x < 7 && y > 0 && y < 7))
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
      onEnter: () => router.push('/tutorial?board=x9&stage=3'),
    }),
  },
];

export default behaviors;
