import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import {
  Container,
  BoardForGame,
  GamePageLayout,
  Icon,
  BottomLeftFixedButtonDenceGroup,
  BottomRightFixedButtonDenceGroup,
  FadeInButton,
  QueryUtil,
  PagePropsInitialized,
  useDialogState,
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
import { DirectionRoute, TurretBase } from '../relati/values';

const shapeByPlayer = ['O', 'X', 'D', 'U'];

type GamePageProps = {
  definition: GameDefinition<number, number>;
  players: number[];
};

const GamePage: NextPage<GamePageProps> = ({ definition, players }) => {
  const [records, setRecords] = useState(() => [
    { pieceIndex: -1, game: Game(GameRule(definition)) },
  ]);

  const [
    { game, pieceIndex: lastPlacedPieceIndex },
    { game: prevGame = game } = {},
  ] = records.slice(-2).reverse();

  const setRecordsByPlace = (pieceIndex: PieceIndex) => {
    const player = game.turn % players.length;
    const gameAfterPlaced = game.place(pieceIndex, player);

    if (gameAfterPlaced !== game) {
      const winner = gameAfterPlaced.rule.getWinner(gameAfterPlaced);

      const game =
        winner === NO_WINNER
          ? gameAfterPlaced.passTurnToNextPlaceablePlayer()
          : gameAfterPlaced;

      const record = { pieceIndex, game };

      setRecords((records) => [...records, record]);
    }
  };

  const setRecordsByDefinition = () =>
    setRecords([
      {
        pieceIndex: -1,
        game: Game(GameRule(definition)),
      },
    ]);

  const resetRecords = () => setRecords(([record]) => [record]);

  useEffect(setRecordsByDefinition, [definition]);

  const handleGridClick = useGamePlacementGridClickHandler(
    game,
    setRecordsByPlace,
    (player) => players.includes(player)
  );

  const thinker = useGameDeepThinker(definition, MultiInfluencesBasedThinking);

  useGameThinkerPlacement(
    thinker,
    game,
    setRecordsByPlace,
    (player) => !players.includes(player)
  );

  const overDialog = useDialogState();
  const leaveDialog = useDialogState();
  const retryDialog = useDialogState();

  const winner = game.rule.getWinner(game);
  const canControlDirectly = winner !== NO_WINNER || game.turn === 0;

  const reset = () => {
    resetRecords();
    retryDialog.close();
  };

  const leave = () => history.back();
  const handleRetry = canControlDirectly ? reset : retryDialog.open;
  const handleLeave = canControlDirectly ? leave : leaveDialog.open;

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
        visible={overDialog.isVisible}
        onClose={overDialog.close}
        winner={winner}
        onRetry={reset}
        onLeave={leave}
      />

      <GamePageLayout.GameLeaveDialog
        visible={leaveDialog.isVisible}
        onClose={leaveDialog.close}
        onLeave={leave}
      />

      <GamePageLayout.GameRetryDialog
        visible={retryDialog.isVisible}
        onClose={retryDialog.close}
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

  const definition = GameDefinition(
    playersCount,
    boardWidth,
    boardHeight,
    DirectionRoute['P' + routePortsCount],
    TurretBase['P' + turretPortsCount]
  );

  return { definition, players };
});
