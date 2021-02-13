import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import {
  Container,
  BoardForGame,
  BoardForGameProps,
  GamePageLayout,
  Icon,
  BottomLeftFixedButtonDenceGroup,
  BottomRightFixedButtonDenceGroup,
  FadeInButton,
  QueryUtil,
  PagePropsInitialized,
  useDialogState,
  useGameDefinition,
  useGameDeepThinker,
  useGameThinkerPlacement,
  useGamePlacementGridClickHandler,
} from '../components';

import {
  Game,
  GameDefinition,
  GameRule,
  NO_WINNER,
  PieceIndex,
} from '../relati';
import {
  LightRetryIconUrl,
  LightLeaveIconUrl,
  LightHelpIconUrl,
} from '../icons';
import { MultiInfluencesBasedThinking } from '../relati/Thinker';

const shapeByPlayer = ['O', 'X', 'D', 'U'];

type GamePageProps = {
  boardWidth: number;
  boardHeight: number;
  players: number[];
  playersCount: number;
  routePortsCount: number;
  turretPortsCount: number;
};

const GamePage: NextPage<GamePageProps> = ({
  boardWidth,
  boardHeight,
  players,
  playersCount,
  routePortsCount,
  turretPortsCount,
}) => {
  const definition = useGameDefinition(
    playersCount,
    boardWidth,
    boardHeight,
    routePortsCount,
    turretPortsCount
  );

  const thinker = useGameDeepThinker(definition, MultiInfluencesBasedThinking);

  const [records, setRecords] = useState(() => [
    { pieceIndex: -1, game: Game(GameRule(definition)) },
  ]);

  const setRecordsByPlace = (pieceIndex: PieceIndex) => {
    const player = game.turn % playersCount;
    const gameAfterPlaced = game.place(pieceIndex, player);

    if (gameAfterPlaced !== game) {
      const winnerOfGameAfterPlaced = gameAfterPlaced.rule.getWinner(
        gameAfterPlaced
      );

      if (winnerOfGameAfterPlaced === NO_WINNER) {
        setRecords((records) => [
          ...records,
          { pieceIndex, game: gameAfterPlaced.passTurnToNextPlaceablePlayer() },
        ]);
      } else {
        setRecords((records) => [
          ...records,
          { pieceIndex, game: gameAfterPlaced },
        ]);
      }
    }
  };

  const resetRecords = () => setRecords(([record]) => [record]);

  const resetRecordsByDefinition = () =>
    setRecords([
      {
        pieceIndex: -1,
        game: Game(GameRule(definition)),
      },
    ]);

  const [
    { game, pieceIndex: lastPlacedPieceIndex },
    { game: prevGame = game } = {},
  ] = records.slice(-2).reverse();

  const winner = game.rule.getWinner(game);
  const canControlDirectly = winner !== NO_WINNER || game.turn === 0;

  const gameOverDialog = useDialogState();
  const gameLeaveDialog = useDialogState();
  const gameRetryDialog = useDialogState();

  useEffect(resetRecordsByDefinition, [definition]);

  useGameThinkerPlacement(
    thinker,
    game,
    setRecordsByPlace,
    (player) => !players.includes(player)
  );

  const reset = () => {
    resetRecords();
    gameRetryDialog.close();
  };

  const leave = () => history.back();
  const handleRetry = canControlDirectly ? reset : gameRetryDialog.open;
  const handleLeave = canControlDirectly ? leave : gameLeaveDialog.open;

  const handleGridClick = useGamePlacementGridClickHandler(
    game,
    setRecordsByPlace,
    (player) => players.includes(player)
  );

  return (
    <Container>
      <BoardForGame
        game={game}
        prevGame={prevGame}
        lastPlacedPieceIndex={lastPlacedPieceIndex}
        onGridClick={handleGridClick}
      />

      <BottomLeftFixedButtonDenceGroup>
        <FadeInButton
          title="leave"
          backgroundColor="#888"
          onClick={handleLeave}
          children={<Icon url={LightLeaveIconUrl} />}
        />
        <FadeInButton
          title="retry"
          backgroundColor="#888"
          onClick={handleRetry}
          children={<Icon url={LightRetryIconUrl} />}
        />
      </BottomLeftFixedButtonDenceGroup>

      <BottomRightFixedButtonDenceGroup>
        <FadeInButton
          title="help"
          backgroundColor="#888"
          children={<Icon url={LightHelpIconUrl} />}
        />
      </BottomRightFixedButtonDenceGroup>

      <GamePageLayout.GameOverDialog
        visible={gameOverDialog.isVisible}
        onClose={gameOverDialog.close}
        winner={winner}
        onRetry={reset}
        onLeave={leave}
      />

      <GamePageLayout.GameLeaveDialog
        visible={gameLeaveDialog.isVisible}
        onClose={gameLeaveDialog.close}
        onLeave={leave}
      />

      <GamePageLayout.GameRetryDialog
        visible={gameRetryDialog.isVisible}
        onClose={gameRetryDialog.close}
        onRetry={reset}
      />
    </Container>
  );
};

export default PagePropsInitialized(GamePage)((query) => {
  const [boardWidth, boardHeight] = QueryUtil.getBoardSize(query);
  const playersCount = QueryUtil.getPlayersCount(query);
  const shapes = QueryUtil.getPieceShapes(query, playersCount);
  const players = shapes.map((shape) => shapeByPlayer.indexOf(shape));

  const routePortsCount = QueryUtil.getRoutePortsCount(query, playersCount, [
    boardWidth,
    boardHeight,
  ]);

  const turretPortsCount = QueryUtil.getTurretPortsCount(query, playersCount, [
    boardWidth,
    boardHeight,
  ]);

  return {
    boardWidth,
    boardHeight,
    players,
    playersCount,
    routePortsCount,
    turretPortsCount,
  };
});
