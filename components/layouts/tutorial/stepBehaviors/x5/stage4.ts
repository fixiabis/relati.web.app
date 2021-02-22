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
  [2, 0],
  [3, 0],
  [4, 0],
  [4, 1],
  [4, 2],
];

const definition = GameDefinition(2, 5, 5, DirectionRoute.P8);

const thinker = Thinker(DeepThinking(MultiInfluencesBasedThinking(definition)));

const behaviors: StepBehavior[] = [
  {
    getNoticeProps: (next) => ({
      message: '也許你會覺得先手必勝，但也不好說，當一次後手看看吧？',
      onButtonClick: () => next(),
    }),
  },
  {
    initRecord: () => {
      const coordinates: Coordinate[] = [
        [2, 2],
        [2, 1],
        [1, 2],
        [3, 2],
        [2, 3],
        [3, 3],
        [2, 4],
        [1, 1],
        [0, 2],
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

          if (x === 3 && y === 1) {
            setTimeout(() => next(5), 500);
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
        if (x === 3 && y === 1) {
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
          y: 1,
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
      const pieceIndex = game.definition.toPieceIndex([0, 1]);
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

          if (x === 1 && y === 0) {
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
        const pieceIndex = game.definition.toPieceIndex([1, 0]);
        place(pieceIndex);
        next();
      }, 500),
  },
  {
    getNoticeProps: (next) => ({
      message: '對方放下的位置就在這個區塊旁邊，再來是自由發揮了，小心應對吧。',
      onButtonClick: () => next(3),
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

      return {
        message: '無法繼續下棋就輸了，' + result,
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
