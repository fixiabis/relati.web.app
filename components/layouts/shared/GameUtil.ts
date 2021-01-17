import { ParsedUrlQuery } from 'querystring';

export const getItem = <T>(itemOrItems: T | T[]) =>
  Array.isArray(itemOrItems) ? itemOrItems.slice(-1)[0] : itemOrItems;

export const getPlayersCount = (query: ParsedUrlQuery) =>
  +(getItem(query.players) || '').replace(/\D/g, '');

export const getBoardSize = (query: ParsedUrlQuery) =>
  Object.assign(
    [0, 0],
    (getItem(query.board) || '').split('x').map(Number).filter(Boolean)
  ).map((size, index, sizes) =>
    index === 1 && size === 0 ? sizes[0] : size
  ) as [number, number];

export const getPieces = (
  query: ParsedUrlQuery,
  playersCount: number = getPlayersCount(query)
) => {
  const shapes = ['O', 'X', 'D', 'U'].slice(0, playersCount);

  return (getItem(query.pieces) || '')
    .split(',')
    .filter((shape) => shapes.includes(shape));
};

export const getPortsCount = (
  query: ParsedUrlQuery,
  playersCount: number = getPlayersCount(query),
  [boardWidth, boardHeight]: [number, number] = getBoardSize(query)
) =>
  [8, 16, 24][
    Math.min(
      (((((boardWidth + boardHeight) / 2) | 0) - (playersCount * 2 + 1)) / 2) |
        0,
      2
    )
  ];
