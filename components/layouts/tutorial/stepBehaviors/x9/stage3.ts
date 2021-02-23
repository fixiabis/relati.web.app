import { LightDownIconUrl } from '../../../../../icons';

import {
  Coordinate,
  EMPTY_PIECE,
  GameDefinition,
  NO_WINNER,
  Thinker,
} from '../../../../../relati';

import {
  DeepThinking,
  MultiInfluencesBasedThinking,
} from '../../../../../relati/Thinker';

import { DirectionRoute } from '../../../../../relati/values';
import { PieceProps } from '../../../../game';
import { StepBehavior } from '../types';

const protectCoordinates: Coordinate[] = [
  [1, 7],
  [1, 8],
  [0, 7],
  [0, 8],
];

const opponentProtectCoordinates: Coordinate[] = [
  [6, 6],
  [6, 7],
  [6, 8],
  [7, 6],
  [7, 7],
  [7, 8],
  [8, 6],
  [8, 7],
  [8, 8],
];

const thinker = Thinker(
  DeepThinking(
    MultiInfluencesBasedThinking(GameDefinition(2, 9, 9, DirectionRoute.P24))
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
      message: '看到框住的地方了吧？要包圍這個區塊，不讓對方碰到。',
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
      const pieceIndex = game.definition.toPieceIndex([5, 5]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方放下的位置離要包圍的區塊不遠，照著框框放下棋子吧！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    boardAdditions: {
      propsOfPieces: [
        {
          x: 2,
          y: 6,
          shape: '#',
          bouncing: true,
          color: 'crimson',
        },
        ...protectCoordinates.map(
          ([x, y]) =>
            ({
              x,
              y,
              shape: '#',
              color: 'crimson',
              opacity: 0.4,
            } as Partial<PieceProps>)
        ),
      ],
    },
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        if (x === 2 && y === 6) {
          const pieceIndex = game.definition.toPieceIndex([x, y]);
          place(pieceIndex);
          next();
        }
      },
    }),
  },
  {
    execute: (next) => setTimeout(next, 500),
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
      const pieceIndex = game.definition.toPieceIndex([3, 6]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方放下的位置離要包圍的區塊很近，再來要怎麼做呢？',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        const pieceIndex = game.definition.toPieceIndex([x, y]);

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 2 && y === 7) {
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
        const pieceIndex = game.definition.toPieceIndex([2, 7]);
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
        color: 'crimson',
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
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([2, 8]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方跨了一格衝到要包圍的區塊旁邊，照著框框放下棋子截斷它！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    boardAdditions: {
      propsOfPieces: [
        {
          x: 3,
          y: 7,
          shape: '#',
          bouncing: true,
          color: 'crimson',
        },
        ...protectCoordinates.map(
          ([x, y]) =>
            ({
              x,
              y,
              shape: '#',
              color: 'crimson',
              opacity: 0.4,
            } as Partial<PieceProps>)
        ),
      ],
    },
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        if (x === 3 && y === 7) {
          const pieceIndex = game.definition.toPieceIndex([x, y]);
          place(pieceIndex);
          next();
        }
      },
    }),
  },
  {
    getNoticeProps: (next) => ({
      message: '沒錯，跨格連線是可以截斷的，被截斷的棋子不能被用來連接放置喔！',
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
      const pieceIndex = game.definition.toPieceIndex([4, 7]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message: '不過，被截斷的棋子是可以重新接上的！',
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
    getNoticeProps: () => ({
      message:
        '因為對方重新接上的關係，下一步就要衝到包圍的區塊了，照著框框放下棋子再截斷它！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    boardAdditions: {
      propsOfPieces: [
        {
          x: 3,
          y: 8,
          shape: '#',
          bouncing: true,
          color: 'crimson',
        },

        ...protectCoordinates.map(
          ([x, y]) =>
            ({
              x,
              y,
              shape: '#',
              color: 'crimson',
              opacity: 0.4,
            } as Partial<PieceProps>)
        ),
      ],
    },
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        if (x === 3 && y === 8) {
          const pieceIndex = game.definition.toPieceIndex([x, y]);
          place(pieceIndex);
          next();
        }
      },
    }),
  },
  {
    execute: (next) => setTimeout(next, 500),
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
      const pieceIndex = game.definition.toPieceIndex([2, 5]);
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

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 1 && y === 6) {
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
        const pieceIndex = game.definition.toPieceIndex([1, 6]);
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
        color: 'crimson',
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
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([0, 6]);
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

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 1 && y === 5) {
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
        const pieceIndex = game.definition.toPieceIndex([1, 7]);
        const rightPieceIndex = game.definition.toPieceIndex([0, 5]);
        const leftPieceIndex = game.definition.toPieceIndex([1, 5]);

        if (game.pieces[rightPieceIndex] !== EMPTY_PIECE) {
          place(leftPieceIndex);
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
        color: 'crimson',
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
        color: 'crimson',
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
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([1, 4]);
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

        if (game.place(pieceIndex, 0) !== game) {
          place(pieceIndex);

          if (x === 0 && y === 5) {
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
        const pieceIndex = game.definition.toPieceIndex([1, 7]);
        const topPieceIndex = game.definition.toPieceIndex([0, 4]);
        const bottomPieceIndex = game.definition.toPieceIndex([0, 5]);

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
        color: 'crimson',
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
        color: 'crimson',
        opacity: 0.4,
      })),
    },
  },
  {
    getNoticeProps: (next) => ({
      message:
        '很好，這個方向也都擋住了，對方無法用任何手段放棋子在包圍的區塊了！',
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
      const pieceIndex = game.definition.toPieceIndex([3, 5]);
      place(pieceIndex);
    },
    getNoticeProps: () => ({
      message: '對方準備把我們圍住的地方給攔住，照著框框放下棋子重新接上！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    boardAdditions: {
      propsOfPieces: [
        {
          x: 2,
          y: 4,
          shape: '#',
          bouncing: true,
          color: 'crimson',
        },
      ],
    },
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        if (x === 2 && y === 4) {
          const pieceIndex = game.definition.toPieceIndex([x, y]);
          place(pieceIndex);
          next();
        }
      },
    }),
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([5, 7]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message: '對方看起來好像要圍住一個很大的區塊，照著框框放下棋子靠近他！',
      buttonIconUrl: LightDownIconUrl,
      buttonColor: '#888',
    }),
    getBoardProps: (next, game, place) => ({
      onGridClick: ({ x, y }) => {
        if (x === 6 && y === 4) {
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
          y: 4,
          shape: '#',
          bouncing: true,
          color: 'crimson',
        },
        ...opponentProtectCoordinates.map(
          ([x, y]) =>
            ({
              x,
              y,
              shape: '#',
              color: 'royalblue',
              opacity: 0.4,
            } as Partial<PieceProps>)
        ),
      ],
    },
  },
  {
    execute: (next, game, place) => {
      const pieceIndex = game.definition.toPieceIndex([6, 5]);
      place(pieceIndex);
    },
    getNoticeProps: (next) => ({
      message:
        '對方打算擋住你，再來是自由發揮了，小心應對吧。',
      onButtonClick: () => next(2),
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
      const hint = winner !== 0 ? '多靠近對方的缺口，壓制對方！' : '';

      return {
        message: '無法繼續下棋就輸了，' + result + hint,
        onButtonClick: () => next(),
      };
    },
  },
  {
    getOverDialogProps: (router) => ({
      message: '你已經完成第三階段的教學！',
      onEnter: () => router.push('/tutorial?board=x9&stage=4'),
    }),
  },
];

export default behaviors;
