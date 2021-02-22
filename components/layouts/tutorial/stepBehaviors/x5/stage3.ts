import { LightEnterIconUrl, LightDownIconUrl } from '../../../../../icons';

import {
  Coordinate,
  GameDefinition,
  NO_WINNER,
  Thinker,
} from '../../../../../relati';

import {
  DeepThinking,
  MultiInfluencesBasedThinking,
} from '../../../../../relati/Thinker';

import { DirectionRoute } from '../../../../../relati/values';
import { StepBehavior } from '../types';

const protectCoordinates: Coordinate[] = [
  [1, 3],
  [1, 4],
  [0, 3],
  [0, 4],
];

const opponentProtectCoordinates: Coordinate[] = [
  [0, 0],
  [1, 0],
];

const opponentLargestProtectCoordinates: Coordinate[] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [4, 1],
  [4, 2],
];

const opponentSecondProtectCoordinates: Coordinate[] = [
  [4, 3],
  [4, 4],
];

const thinker = Thinker(
  DeepThinking(
    MultiInfluencesBasedThinking(GameDefinition(2, 5, 5, DirectionRoute.P8))
  )
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
      message: '看到框住的地方了吧？要保護這個區塊，不讓對方碰到。',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([2, 1]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方放下的位置離要保護的區塊很近，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 1 && y === 2) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([1, 2]);
        place(pieceIndex);
        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，築起一道保護位置的牆壁，讓對方無法靠近吧！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([3, 2]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方換了一個方向靠近要保護的區塊，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 2 && y === 3) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([2, 3]);
        place(pieceIndex);
        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，再築起一道保護位置的牆壁，讓對方無法靠近吧！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([3, 3]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方繼續靠近要保護的區塊，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 2 && y === 4) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([2, 4]);
        place(pieceIndex);
        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，把這個方向都擋住了，對方無法靠近了！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([1, 1]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方換個方向靠近要保護的區塊，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 0 && y === 2) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([0, 2]);
        place(pieceIndex);
        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message:
        '很好，這個方向也都擋住了，對方無法用任何手段放棋子在保護的區塊了！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([0, 1]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方也把一個區塊擋住了，得想辦法靠近才行。',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 3 && y === 1) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: opponentProtectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([3, 1]);
        place(pieceIndex);
        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: opponentProtectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '完蛋了，對方擋住的區塊比較大，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
    boardAdditions: {
      propsOfPieces: opponentLargestProtectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，成功靠近了！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: opponentProtectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([2, 0]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message: '對方把區塊也都擋住了，無法用任何手段放棋子在那個區塊了！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: opponentProtectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: () => ({
      message: '現在要盡可能避免對方再圍住一個區塊。',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 3 && y === 4) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: opponentSecondProtectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([3, 4]);
        place(pieceIndex);
        next();
      }, 500),
  },
  {
    getNoticeProps: (next) => ({
      message: '對方這樣有機會再拿到一個區塊。再來是自由發揮了，小心應對吧。',
      onButtonClick: () => next(4),
    }),
    boardAdditions: {
      propsOfPieces: opponentSecondProtectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，放在了那個區塊旁邊，對方圍不起來了。',
      onButtonClick: () => next(),
    }),
  },
  {
    getNoticeProps: (next) => ({
      message: '現在，請自由發揮吧！',
      onButtonClick: () => next(),
    }),
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = thinker.getPieceIndexForPlacement(game);

        place(pieceIndex);
        const gameAfterPlaced = game.place(pieceIndex, 1);

        if (gameAfterPlaced.rule.getWinner(gameAfterPlaced) === NO_WINNER) {
          next();
        } else {
          next(2);
        }
      }, 500),
  },
  {
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);
        const gameAfterPlaced = game.place(pieceIndex, 0);

        if (gameAfterPlaced !== game) {
          place(pieceIndex);

          if (gameAfterPlaced.rule.getWinner(gameAfterPlaced) === NO_WINNER) {
            next(-1);
          } else {
            next();
          }
        }
      },
    }),
  },
  {
    getNoticeProps: (next, game) => {
      const winner = game.rule.getWinner(game);
      const result = ['平手！', '我方贏了！', '對方贏了！'][winner + 1];

      return {
        message: '無法繼續下棋就輸了，' + result,
        onButtonClick: () => next(),
      };
    },
  },
  {
    getOverDialogProps: (router) => ({
      message: '你已經完成第三階段的教學！',
      onEnter: () => router.push('/tutorial?board=x5&stage=4'),
    }),
  },
];

export default behaviors;
