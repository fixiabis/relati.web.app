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

export const getPieceShapes = (
  query: ParsedUrlQuery,
  playersCount: number = getPlayersCount(query)
) => {
  const shapes = ['O', 'X', 'D', 'U'].slice(0, playersCount);

  return (getItem(query.pieces) || '')
    .split(',')
    .filter((shape) => shapes.includes(shape));
};

export const getRoutePortsCount = (
  query: ParsedUrlQuery,
  playersCount: number = getPlayersCount(query),
  [boardWidth, boardHeight]: [number, number] = getBoardSize(query)
) =>
  Math.min(
    Math.floor(
      (Math.floor((boardWidth + boardHeight) / 2) - (playersCount * 2 + 1)) / 2
    ),
    2
  ) *
    8 +
  8;

export const getTurretPortsCount = (
  query: ParsedUrlQuery,
  playersCount: number = getPlayersCount(query),
  [boardWidth, boardHeight]: [number, number] = getBoardSize(query)
) =>
  Math.min(
    Math.floor(
      (Math.floor((boardWidth + boardHeight) / 2) - (playersCount * 4 + 1)) / 2
    ),
    1
  ) * 4;
