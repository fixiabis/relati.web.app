import { LightDownIconUrl } from '../../../../../icons';

import {
  Coordinate,
  Game,
  GameDefinition,
  GameRule,
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
  [4, 0],
  [4, 1],
  [5, 0],
  [5, 1],
  [5, 2],
  [6, 0],
  [6, 1],
  [6, 2],
];

const definition = GameDefinition(2, 7, 7, DirectionRoute.P16);

const thinker = Thinker(DeepThinking(MultiInfluencesBasedThinking(definition)));

const behaviors: StepBehavior[] = [
  {
    getNoticeProps: (next) => ({
      message:
        '也許你會覺得有些截斷沒有必要，但也不好說，來看看不截斷會發生什麼吧？',
      onButtonClick: () => next(),
    }),
  },
  {
    initRecord: () => {
      const coordinates: Coordinate[] = [
        [3, 3],
        [3, 2],
        [2, 4],
        [2, 3],
        [1, 4],
        [4, 5],
        [3, 4],
        [4, 3],
      ];

      const game = coordinates.reduce(
        (game, coordinate) =>
          game.place(
            game.definition.toPieceIndex(coordinate),
            game.turn % game.definition.playersCount
          ),
        Game(GameRule(definition))
      );

      return { pieceIndex: -1, game };
    },
    execute: (next) => setTimeout(next, 500),
  },
  {
    getNoticeProps: (next) => ({
      message: '看起來令人熟悉，不是嗎？',
      onButtonClick: () => next(),
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([2, 5]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message: '現在你作為後手，對方不做截斷直接擋住了你。',
      onButtonClick: () => next(),
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([3, 6]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message: '然後你靠近對方的區塊。',
      onButtonClick: () => next(),
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([2, 6]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message: '對方把這個方向都擋住了，你無法靠近了！',
      onButtonClick: () => next(),
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([0, 3]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message: '於是你換一個方向靠近對方的區塊。',
      onButtonClick: () => next(),
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([0, 4]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message: '對方把這個方向也都擋住了，無法用任何手段放棋子在對方的區塊了！',
      onButtonClick: () => next(),
    }),
  },
  {
    getNoticeProps: (next) => ({
      message: '無須擔心，我們能夠贏的，你發現了嗎？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 4 && y === 2) {
            setTimeout(() => next(4), 500);
          } else {
            next();
          }
        }
      },
    }),
  },

  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '嗯，可惜，不是這裡。',
      onButtonClick: () => {
        undoGame();
        next();
      },
    }),
  },
  {
    getNoticeProps: (next) => ({
      message: '照著框框放下棋子吧！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        if (x === 4 && y === 2) {
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
          y: 2,
          shape: '#',
          bouncing: true,
          color: 'royalblue',
        },
      ],
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '注意看，這裡是不是有一個區塊？',
      onButtonClick: () => next(2),
    }),
    getBoardProps: (next) => ({ onGridClick: () => next(2) }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '^',
        color: 'royalblue',
        flickering: true,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '沒錯，這裡有一個區塊！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '^',
        color: 'royalblue',
        flickering: true,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([4, 4]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方放下的位置離這個區塊很近，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 5 && y === 3) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([5, 3]);
        place(pieceIndex);
        next();
      }, 500),
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
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
        shape: '^',
        color: 'royalblue',
        flickering: true,
      })),
    },
  },

  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([6, 4]);
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

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 6 && y === 3) {
            next(6);
          } else if (x === 5 && y === 4) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([6, 3]);
        place(pieceIndex);
        next();
      }, 500),
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([5, 5]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '想法不錯，但是對方重新接上了，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 6 && y === 3) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([6, 3]);
        place(pieceIndex);
        next();
      }, 500),
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
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
        shape: '^',
        color: 'royalblue',
        flickering: true,
      })),
    },
  },

  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([2, 2]);
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

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 3 && y === 1) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([3, 1]);
        place(pieceIndex);
        next();
      }, 500),
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
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
        shape: '^',
        color: 'royalblue',
        flickering: true,
      })),
    },
  },

  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([2, 0]);
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

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 3 && y === 0) {
            next(6);
          } else if (x === 2 && y === 1) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([3, 0]);
        place(pieceIndex);
        next();
      }, 500),
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([1, 1]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '想法不錯，但是對方重新接上了，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 3 && y === 0) {
            next(3);
          } else {
            next();
          }
        }
      },
    }),
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([3, 0]);
        place(pieceIndex);
        next();
      }, 500),
  },
  {
    getNoticeProps: (next, game, place, undoGame) => ({
      message: '對方放下的位置就在要保護的區塊旁邊，看來不能放這裡。',
      onButtonClick: () => {
        next(-2);
        undoGame(2);
      },
    }),
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，把這個方向都擋住了，對方無法靠近了！再來是自由發揮了。',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
        x,
        y,
        shape: '^',
        color: 'royalblue',
        flickering: true,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = thinker.getPieceIndexForPlacement(game);

        place(pieceIndex);
        const gameAfterPlaced = game.place(pieceIndex, 0);

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
        const gameAfterPlaced = game.place(pieceIndex, 1);

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
      const result = ['平手！', '對方贏了！', '我方贏了！'][winner + 1];
      const hint = winner === 0 ? '多截斷，產生缺口，對方就圍不起來了！' : '';

      return {
        message: '無法繼續下棋就輸了，' + result + hint,
        onButtonClick: () => next(),
      };
    },
  },
  {
    getNoticeProps: () => ({
      buttonHref: '/',
      message: '恭喜你完成全部的教學！',
    }),
  },
];

export default behaviors;
