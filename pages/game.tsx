import React, { useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  Container,
  BoardForGame,
  GamePageLayout,
  Icon,
  TopLeftFixedButtonDenceGroup,
  BottomRightFixedButtonDenceGroup,
  FadeInButton,
  QueryUtil,
  PagePropsInitialized,
  useDialogState,
} from '../components';

import {
  LightRetryIconUrl,
  LightLeaveIconUrl,
  LightUndoIconUrl,
} from '../icons';

import {
  Game,
  GameDefinition,
  GameRule,
  NO_WINNER,
  PieceIndex,
} from '../relati';

import Thinker, {
  DeepThinking,
  MultiInfluencesBasedThinking,
} from '../relati/Thinker';

import { DirectionRoute, TurretBase } from '../relati/values';

const shapeByPlayer = ['O', 'X', 'D', 'E'];

type GamePageProps = {
  definition: GameDefinition<number, number>;
  players: number[];
};

const GamePage: NextPage<GamePageProps> = ({ definition, players }) => {
  const router = useRouter();

  const [records, setRecords] = useState(() => [
    { pieceIndex: -1, game: Game(GameRule(definition)) },
  ]);

  const [
    { game, pieceIndex: lastPlacedPieceIndex },
    { game: prevGame = game } = {},
  ] = records.slice(-2).reverse();

  const setRecordsByPlace = (pieceIndex: PieceIndex) => {
    const player = game.turn % game.definition.playersCount;
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

  const setRecordsByUndoUntilPlayerTurn = () =>
    setRecords((records) => {
      const [...nextRecords] = records;

      const isLastRecordPlayerTurn = () => {
        const [{ game }] = nextRecords.slice(-1);
        const playerOfTurn = (game.turn - 1) % game.definition.playersCount;
        return players.includes(playerOfTurn);
      };

      while (!isLastRecordPlayerTurn()) {
        nextRecords.pop();
      }

      nextRecords.pop();

      return nextRecords;
    });

  const resetRecords = () => setRecords(([record]) => [record]);

  const setRecordsByDefinition = () => {
    const game = Game(GameRule(definition));
    const record = { pieceIndex: -1, game };
    setRecords([record]);
  };

  useEffect(setRecordsByDefinition, [definition]);

  const overDialog = useDialogState();
  const leaveDialog = useDialogState();
  const retryDialog = useDialogState();
  const undoDialog = useDialogState();

  const winner = game.rule.getWinner(game);
  const canControlDirectly = winner !== NO_WINNER || game.turn === 0;

  const reset = () => {
    resetRecords();
    retryDialog.close();
  };

  const undo = () => {
    setRecordsByUndoUntilPlayerTurn();
    undoDialog.close();
  };

  const leave = () => router.push('/');
  const handleRetry = canControlDirectly ? reset : retryDialog.open;
  const handleLeave = canControlDirectly ? leave : leaveDialog.open;
  const handleUndo = records.length > 1 ? undoDialog.open : undefined;

  const thinker = useMemo(
    () => Thinker(DeepThinking(MultiInfluencesBasedThinking(definition), 1)),
    [definition]
  );

  useEffect(() => {
    const playerOfTurn = game.turn % game.definition.playersCount;

    if (!players.includes(playerOfTurn)) {
      setTimeout(() => {
        const pieceIndex = thinker.getPieceIndexForPlacement(game);
        setRecordsByPlace(pieceIndex);
      }, 600);
    }
  }, [game, thinker, setRecordsByPlace]);

  const handleGridClick = ({ x, y }) => {
    const playerOfTurn = game.turn % game.definition.playersCount;

    if (players.includes(playerOfTurn)) {
      const pieceIndex = game.definition.toPieceIndex([x, y]);
      setRecordsByPlace(pieceIndex);
    }

    overDialog.open();
  };

  return (
    <Container>
      <BoardForGame
        game={game}
        prevGame={prevGame}
        lastPlacedPieceIndex={lastPlacedPieceIndex}
        onGridClick={handleGridClick}
      />

      <TopLeftFixedButtonDenceGroup>
        <FadeInButton
          title="leave"
          backgroundColor="#888"
          onClick={handleLeave}
          children={<Icon url={LightLeaveIconUrl} />}
        />
      </TopLeftFixedButtonDenceGroup>

      <BottomRightFixedButtonDenceGroup>
        <FadeInButton
          title="retry"
          backgroundColor="#888"
          onClick={handleRetry}
          children={<Icon url={LightRetryIconUrl} />}
        />
        <FadeInButton
          title="undo"
          backgroundColor="#888"
          onClick={handleUndo}
          children={<Icon url={LightUndoIconUrl} />}
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

      <GamePageLayout.GameUndoDialog
        visible={undoDialog.isVisible}
        onClose={undoDialog.close}
        onUndo={undo}
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
