import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  Container,
  BoardForGame,
  TutorialPageLayout,
  Icon,
  BottomLeftFixedButtonDenceGroup,
  FadeInButton,
  QueryUtil,
  PagePropsInitialized,
  useDialogState,
  PieceProps,
  Piece,
  Route,
  RouteProps,
} from '../components';

import {
  LightBackIconUrl,
  LightLeaveIconUrl,
  LightNextIconUrl,
} from '../icons';

import {
  Game,
  GameDefinition,
  GameRule,
  NO_WINNER,
  PieceIndex,
} from '../relati';

import { DirectionRoute, TurretBase } from '../relati/values';
import { StepBehavior } from '../components/layouts/tutorial/stepBehaviors/types';

type TutorialPageProps = {
  definition: GameDefinition<number, number>;
  behaviors: StepBehavior[];
};

const TutorialPage: NextPage<TutorialPageProps> = ({
  definition,
  behaviors,
}) => {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const nextStep = (stepForChange: number = 1) =>
    setStep((step) => step + stepForChange);

  useEffect(() => setStep(0), [behaviors]);

  const behavior = behaviors[step] || {};

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

  const resetRecords = () => setRecords(([record]) => [record]);

  const undoRecord = (step: number = 1) => {
    setRecords((records) => {
      const recordsAfterUndo = records.slice(0, -step);

      if (recordsAfterUndo.length === 0) {
        return records.slice(0, 1);
      }

      return recordsAfterUndo;
    });
  };

  const setRecordsByDefinition = () => {
    const game = Game(GameRule(definition));
    const record = { pieceIndex: -1, game };
    setRecords([record]);
  };

  useEffect(setRecordsByDefinition, [definition]);
  useEffect(resetRecords, [behaviors]);

  useEffect(
    () => behavior.execute?.(nextStep, game, setRecordsByPlace, undoRecord),
    [step]
  );

  useEffect(() => {
    if (behavior.initRecord) {
      setRecords((records) => [...records, behavior.initRecord()]);
    }
  }, [behavior]);

  const leaveDialog = useDialogState();
  const bottomNotice = useDialogState();

  const canControlDirectly = behaviors.length === step;

  const leave = () => router.push('/');
  const handleLeave = canControlDirectly ? leave : leaveDialog.open;

  useEffect(leaveDialog.close, [behaviors]);
  useEffect(bottomNotice.open, [step, behaviors]);

  const boardProps = behavior.getBoardProps?.(
    nextStep,
    game,
    setRecordsByPlace,
    undoRecord
  );

  const boardChildren = behavior.boardAdditions
    ? Object.entries(behavior.boardAdditions).reduce(
        (elements: JSX.Element[], [name, value]) => {
          switch (name) {
            case 'propsOfPieces': {
              return elements.concat(
                (value as PieceProps[]).map((props, key) => (
                  <Piece key={key} {...props} />
                ))
              );
            }

            case 'propsOfRoutes': {
              return elements.concat(
                (value as RouteProps[]).map((pieceProps, key) => (
                  <Route key={key} {...pieceProps} />
                ))
              );
            }

            default: {
              return elements;
            }
          }
        },
        []
      )
    : null;

  const noticeProps = behavior.getNoticeProps?.(
    nextStep,
    game,
    setRecordsByPlace,
    undoRecord
  );

  const overDialogProps = behavior.getOverDialogProps?.(router);

  return (
    <Container>
      <BoardForGame
        game={game}
        prevGame={prevGame}
        lastPlacedPieceIndex={lastPlacedPieceIndex}
        {...boardProps}
        children={boardChildren}
      />

      <BottomLeftFixedButtonDenceGroup>
        <FadeInButton
          title="leave"
          backgroundColor="#888"
          onClick={handleLeave}
          children={<Icon url={LightLeaveIconUrl} />}
        />
      </BottomLeftFixedButtonDenceGroup>

      <TutorialPageLayout.TutorialLeaveDialog
        visible={leaveDialog.isVisible}
        onClose={leaveDialog.close}
        onLeave={leave}
      />

      <TutorialPageLayout.TutorialOverDialog
        visible={Boolean(overDialogProps)}
        message=""
        {...overDialogProps}
        onRetry={() => {
          setStep(0);
          resetRecords();
        }}
      />

      <TutorialPageLayout.TutorialBottomNotice
        {...noticeProps}
        visible={bottomNotice.isVisible && Boolean(noticeProps)}
        onButtonClick={() => {
          bottomNotice.close();
          noticeProps?.onButtonClick?.();
        }}
      />
    </Container>
  );
};

export default PagePropsInitialized(TutorialPage)((query) => {
  const [boardWidth, boardHeight] = QueryUtil.getBoardSize(query);
  const playersCount = 2;
  const stage = +QueryUtil.getItem(query.stage);

  const behaviors =
    TutorialPageLayout.StepBehaviors['X' + boardWidth]?.['Stage' + stage] || [];

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

  return { definition, behaviors };
});
