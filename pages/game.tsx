import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import {
  useSwitch,
  Container,
  BoardForGame,
  BoardForGameProps,
  GameLayout,
  Icon,
  BottomRightFixedButtonDenceGroup,
  FadeInButton,
} from '../components';

import { EMPTY_PIECE, Game, GameRule, NO_WINNER } from '../relati';
import { LightRetryIconUrl, LightLeaveIconUrl } from '../icons';

const shapeByPlayer = ['O', 'X', 'D', 'U'];

type GamePageProps = {
  boardWidth: number;
  boardHeight: number;
  pieces: string[];
  playersCount: number;
  portsCount: number;
};

const GamePage: NextPage<GamePageProps> = ({
  boardWidth,
  boardHeight,
  pieces,
  playersCount,
  portsCount,
}) => {
  const definition = GameLayout.useDefinition(
    playersCount,
    boardWidth,
    boardHeight,
    portsCount
  );

  const thinker = GameLayout.useThinker(definition);

  const [game, setGame] = useState(() => Game(GameRule(definition)));
  const [prevGame, setPrevGame] = useState(game);

  const winner = game.rule.getWinner(game);
  const canControlDirectly = winner !== NO_WINNER || game.turn === 0;

  const [pieceIndexesOfPlacement, setPieceIndexesOfPlacement] = useState<
    number[]
  >([]);

  const [
    isGameOverDialogVisible,
    openGameOverDialog,
    closeGameOverDialog,
  ] = useSwitch(false);

  const [
    isGameLeaveDialogVisible,
    openGameLeaveDialog,
    closeGameLeaveDialog,
  ] = useSwitch(false);

  const [
    isGameRetryDialogVisible,
    openGameRetryDialog,
    closeGameRetryDialog,
  ] = useSwitch(false);

  useEffect(() => {
    const playerOfTurn = game.turn % playersCount;
    const shapeOfTurn = shapeByPlayer[playerOfTurn];

    if (!pieces.includes(shapeOfTurn)) {
      setTimeout(() => {
        const pieceIndex = thinker.getPieceIndexForPlacement(game);
        const gameWithPiecePlaced = game.place(pieceIndex, playerOfTurn);

        if (game !== gameWithPiecePlaced) {
          setGame(gameWithPiecePlaced);
          setPieceIndexesOfPlacement([...pieceIndexesOfPlacement, pieceIndex]);
          setPrevGame(game);
        }
      }, 600);
    }
  }, [game]);

  useEffect(() => {
    const { turn, pieces, producerPieceIndexes } = game;
    const { pieceIndexes } = game.definition;

    const { isPieceIndexHasProvidableRoute, getWinner } = game.rule;

    const winner = getWinner(game);

    if (turn < playersCount || winner !== NO_WINNER) {
      return;
    }

    const playerOfTurn = turn % playersCount;

    const hasPieceIndexOfPlayerPlaceable = pieceIndexes.some(
      (pieceIndex) =>
        pieces[pieceIndex] === EMPTY_PIECE &&
        isPieceIndexHasProvidableRoute(pieces, pieceIndex, playerOfTurn)
    );

    if (!hasPieceIndexOfPlayerPlaceable) {
      const turnPassedGame = Game(
        game.rule,
        turn + 1,
        pieces,
        producerPieceIndexes
      );

      setGame(turnPassedGame);
      setPieceIndexesOfPlacement([...pieceIndexesOfPlacement, -1]);
      setPrevGame(game);
    }
  }, [game]);

  const resetGame = () => {
    const resetedGame = Game(game.rule);
    setGame(resetedGame);
    setPrevGame(resetedGame);
    closeGameRetryDialog();
  };

  const leave = () => history.back();
  const handleRetry = canControlDirectly ? resetGame : openGameRetryDialog;
  const handleLeave = canControlDirectly ? leave : openGameLeaveDialog;

  const handleGridClick: BoardForGameProps['onGridClick'] = ({ x, y }) => {
    const player = game.turn % playersCount;
    const shape = shapeByPlayer[player];
    const pieceIndex = definition.toPieceIndex([x, y]);
    const gameWithPiecePlaced = game.place(pieceIndex, player);

    if (gameWithPiecePlaced !== game) {
      setGame(gameWithPiecePlaced);
      setPieceIndexesOfPlacement([...pieceIndexesOfPlacement, pieceIndex]);
      setPrevGame(game);
    }

    openGameOverDialog();
  };

  return (
    <Container>
      <BoardForGame
        game={game}
        prevGame={prevGame}
        pieceIndexesOfPlacement={pieceIndexesOfPlacement}
        onGridClick={handleGridClick}
      />

      <BottomRightFixedButtonDenceGroup>
        <FadeInButton
          title="retry"
          backgroundColor="#888"
          onClick={handleRetry}
          children={<Icon url={LightRetryIconUrl} />}
        />
        <FadeInButton
          title="leave"
          backgroundColor="#888"
          onClick={handleLeave}
          children={<Icon url={LightLeaveIconUrl} />}
        />
      </BottomRightFixedButtonDenceGroup>

      <GameLayout.GameOverDialog
        visible={isGameOverDialogVisible}
        onClose={closeGameOverDialog}
        winner={winner}
        onRetry={resetGame}
        onLeave={leave}
      />

      <GameLayout.GameLeaveDialog
        visible={isGameLeaveDialogVisible}
        onClose={closeGameLeaveDialog}
        onLeave={leave}
      />

      <GameLayout.GameRetryDialog
        visible={isGameRetryDialogVisible}
        onClose={closeGameRetryDialog}
        onRetry={resetGame}
      />
    </Container>
  );
};

GamePage.getInitialProps = async ({ query }) => {
  let board: number[] | string | string[] = query.board || '';
  let boardWidth: number | string = '';
  let boardHeight: number | string = '';
  let pieces: string | string[] = query.pieces || '';
  let playersCount: string | string[] | number = query.players || '';

  if (Array.isArray(board)) {
    [board] = board.slice(-1);
  }

  [boardWidth, boardHeight] = board.split('x');

  if (boardWidth === '') {
    boardWidth = boardHeight;
  }

  if (boardHeight === '') {
    boardHeight = boardWidth;
  }

  boardWidth = parseInt(boardWidth);
  boardHeight = parseInt(boardHeight);

  if (Array.isArray(playersCount)) {
    [playersCount] = playersCount.slice(-1);
  }

  playersCount = parseInt(playersCount);

  if (Array.isArray(pieces)) {
    [pieces] = pieces.slice(-1);
  }

  pieces = pieces.split(',');

  const portsCount = [8, 16, 24][
    Math.min(
      (((((boardWidth + boardHeight) / 2) | 0) - (playersCount * 2 + 1)) / 2) |
        0,
      2
    )
  ];

  return { boardWidth, boardHeight, pieces, playersCount, portsCount };
};

export default GamePage;
