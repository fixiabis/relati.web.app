import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  GameLayouts,
  GameMode,
  useRedirectOnNotFound,
} from '../components/page/game';

type GamePageProps = {
  mode: string;
  boardWidth: number;
  boardHeight: number;
  portsCount: number;
};

const GamePage: NextPage<GamePageProps> = ({
  mode,
  boardWidth,
  boardHeight,
  portsCount,
}) => {
  const router = useRouter();

  useRedirectOnNotFound(mode);

  if (!(mode in GameLayouts)) {
    return <></>;
  }

  const GameLayout = GameLayouts[mode as GameMode];

  return (
    <GameLayout
      boardWidth={boardWidth}
      boardHeight={boardHeight}
      portsCount={portsCount}
      onLeave={() => router.back()}
    />
  );
};

GamePage.getInitialProps = async ({ query }) => {
  let mode: string | string[] = query.as || '';
  let boardSize: number[] | string | string[] = query.on || '';
  let boardWidth: number | string = '';
  let boardHeight: number | string = '';

  if (Array.isArray(mode)) {
    [mode] = mode.slice(-1);
  }

  if (Array.isArray(boardSize)) {
    [boardSize] = boardSize.slice(-1);
  }

  [boardWidth, boardHeight] = boardSize.split('x');

  if (boardWidth === '') {
    boardWidth = boardHeight;
  }

  if (boardHeight === '') {
    boardHeight = boardWidth;
  }

  boardWidth = parseInt(boardWidth);
  boardHeight = parseInt(boardHeight);

  const portsCount = [8, 16, 24][
    Math.min((((((boardWidth + boardHeight) / 2) | 0) - 5) / 2) | 0, 2)
  ];

  return { mode, boardWidth, boardHeight, portsCount };
};

export default GamePage;
