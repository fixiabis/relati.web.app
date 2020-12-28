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
  boardSize: number;
};

const GamePage: NextPage<GamePageProps> = ({ mode, boardSize }) => {
  const router = useRouter();

  useRedirectOnNotFound(mode);

  if (!(mode in GameLayouts)) {
    return <></>;
  }

  const GameLayout = GameLayouts[mode as GameMode];

  return <GameLayout boardSize={boardSize} onLeave={() => router.back()} />;
};

GamePage.getInitialProps = async ({ query }) => {
  let mode: string | string[] = query.as || '';
  let boardSize: string | string[] | number = query.on || '';

  if (Array.isArray(mode)) {
    [mode] = mode.slice(-1);
  }

  if (Array.isArray(boardSize)) {
    [boardSize] = boardSize.slice(-1);
  }

  boardSize = parseInt(boardSize.replace('x', ''));

  return { mode, boardSize };
};

export default GamePage;
