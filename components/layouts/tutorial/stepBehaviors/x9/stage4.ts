import { LightDownIconUrl } from '../../../../../icons';

import {
  Coordinate,
  EMPTY_PIECE,
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
  [7, 7],
  [7, 8],
  [8, 7],
  [8, 8],
];

const definition = GameDefinition(2, 9, 9, DirectionRoute.P24);

const thinker = Thinker(DeepThinking(MultiInfluencesBasedThinking(definition)));

const behaviors: StepBehavior[] = [
  {
    getNoticeProps: (next) => ({
      message: '包圍區塊時，如果太過貪婪往往會圍不住呢。',
      onButtonClick: () => next(),
    }),
  },
  {
    initRecord: () => {
      const coordinates: Coordinate[] = [
        [4, 4],
        [5, 5],
        [2, 6],
        [3, 6],
        [2, 7],
        [2, 8],
        [3, 7],
        [4, 7],
        [3, 8],
        [2, 5],
        [1, 6],
        [0, 6],
        [1, 5],
        [1, 4],
        [0, 5],
        [3, 5],
        [2, 4],
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
    getNoticeProps: () => ({
      message: '在這個局面下，其實有更好的選擇，你發現了嗎？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 6 && y === 7) {
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
        if (x === 6 && y === 7) {
          const pieceIndex = game.definition.toPieceIndex([x, y]);
          place(pieceIndex);
          next();
        }
      },
    }),
    boardAdditions: {
      propsOfPieces: [
        {
          x: 6,
          y: 7,
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
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
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
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([6, 4]);
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

          if (x === 7 && y === 6) {
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([7, 6]);
        const rightPieceIndex = game.definition.toPieceIndex([6, 5]);
        const leftPieceIndex = game.definition.toPieceIndex([7, 5]);

        if (game.pieces[rightPieceIndex] !== EMPTY_PIECE) {
          place(leftPieceIndex);
        } else if (game.pieces[leftPieceIndex] !== EMPTY_PIECE) {
          place(rightPieceIndex);
        } else {
          place(pieceIndex);
        }

        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      message: '對方放下的位置就在要包圍的區塊旁邊，看來不能放這裡。',
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，築起一道包圍位置的牆壁，讓對方無法靠近吧！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      const pieceIndex = game.definition.toPieceIndex([8, 6]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方跨了一格衝到要包圍的區塊旁邊，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 7 && y === 5) {
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([8, 7]);
        const topPieceIndex = game.definition.toPieceIndex([7, 4]);
        const bottomPieceIndex = game.definition.toPieceIndex([7, 5]);

        if (game.pieces[topPieceIndex] !== EMPTY_PIECE) {
          place(bottomPieceIndex);
        } else {
          place(pieceIndex);
        }

        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      message: '對方放下的位置就在要包圍的區塊上，看來不能放這裡。',
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，截斷對方的連線，讓對方無法靠近吧！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      const pieceIndex = game.definition.toPieceIndex([8, 4]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方重新接上棋子到了包圍的區塊旁邊，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 8 && y === 5) {
            next(6);
          } else if (x === 7 && y === 4) {
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([8, 7]);
        place(pieceIndex);
        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      message: '對方放下的位置就在要包圍的區塊上，看來不能放這裡。',
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([7, 3]);
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

          if (x === 8 && y === 5) {
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([8, 5]);
        place(pieceIndex);
        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      message: '對方放下的位置就在要包圍的區塊旁邊，看來不能放這裡。',
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
        color: 'royalblue',
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([4, 8]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方換個方向靠近要包圍的區塊，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 6 && y === 8) {
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([6, 8]);
        const topPieceIndex = game.definition.toPieceIndex([5, 7]);
        const bottomPieceIndex = game.definition.toPieceIndex([5, 8]);

        if (game.pieces[topPieceIndex] !== EMPTY_PIECE) {
          place(bottomPieceIndex);
        } else if (game.pieces[bottomPieceIndex] !== EMPTY_PIECE) {
          place(topPieceIndex);
        } else {
          place(pieceIndex);
        }

        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      message: '對方放下的位置就在要包圍的區塊旁邊，看來不能放這裡。',
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message: '很好，再築起一道包圍位置的牆壁，讓對方無法靠近吧！',
      onButtonClick: () => next(),
    }),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      const pieceIndex = game.definition.toPieceIndex([6, 5]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方再換個方向靠近要包圍的區塊，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 1) !== game) {
          place(pieceIndex);

          if (x === 6 && y === 6) {
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) =>
      setTimeout(() => {
        const pieceIndex = game.definition.toPieceIndex([6, 6]);
        place(pieceIndex);
        next();
      }, 500),
    boardAdditions: {
      propsOfPieces: protectCoordinates.map(([x, y]) => ({
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
      message: '對方放下的位置就在要包圍的區塊旁邊，看來不能放這裡。',
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
        color: 'royalblue',
        opacity: 0.4,
      })),
    },
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
        shape: '#',
        color: 'royalblue',
        opacity: 0.4,
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
    getOverDialogProps: (router) => ({
      message: '恭喜你完成全部的教學！',
      onEnter: () => router.push('/'),
    }),
  },
];

export default behaviors;
