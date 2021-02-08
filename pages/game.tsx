import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import {
  Container,
  BoardForGame,
  BoardForGameProps,
  GamePageLayout,
  Icon,
  BottomRightFixedButtonDenceGroup,
  FadeInButton,
  GameUtil,
  PagePropsInitialized,
  useDialogState,
  useGameDefinition,
  useGameDeepThinker,
  useGameThinkerPlacement,
} from '../components';

import { EMPTY_PIECE, Game, GameRule, NO_WINNER, PieceIndex } from '../relati';
import { LightRetryIconUrl, LightLeaveIconUrl } from '../icons';
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
      setRecords((records) => [
        ...records,
        { pieceIndex, game: gameAfterPlaced },
      ]);
    }
  };

  const [
    { game, pieceIndex: lastPlacedPieceIndex },
    { game: prevGame = game } = {},
  ] = records.slice(-2).reverse();

  const winner = game.rule.getWinner(game);
  const canControlDirectly = winner !== NO_WINNER || game.turn === 0;

  const gameOverDialog = useDialogState();
  const gameLeaveDialog = useDialogState();
  const gameRetryDialog = useDialogState();

  useEffect(() => {
    const game = Game(GameRule(definition));
    setRecords([{ pieceIndex: -1, game }]);
  }, [definition]);

  useGameThinkerPlacement(
    game,
    thinker,
    setRecordsByPlace,
    (player) => !players.includes(player)
  );

  useEffect(() => {
    const { turn, pieces, producerIndexes } = game;
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
      const turnPassedGame = Game(game.rule, turn + 1, pieces, producerIndexes);

      setRecords((records) => [
        ...records,
        { pieceIndex: -1, game: turnPassedGame },
      ]);
    }
  }, [game]);

  const resetGame = () => {
    const resetedGame = Game(game.rule);
    setRecords([{ pieceIndex: -1, game: resetedGame }]);
    gameRetryDialog.close();
  };

  const leave = () => history.back();
  const handleRetry = canControlDirectly ? resetGame : gameRetryDialog.open;
  const handleLeave = canControlDirectly ? leave : gameLeaveDialog.open;

  const handleGridClick: BoardForGameProps['onGridClick'] = ({ x, y }) => {
    const player = game.turn % playersCount;

    if (players.includes(player)) {
      const pieceIndex = definition.toPieceIndex([x, y]);
      setRecordsByPlace(pieceIndex);
    }

    gameOverDialog.open();
  };

  return (
    <Container>
      <BoardForGame
        game={game}
        prevGame={prevGame}
        lastPlacedPieceIndex={lastPlacedPieceIndex}
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

      <GamePageLayout.GameOverDialog
        visible={gameOverDialog.isVisible}
        onClose={gameOverDialog.close}
        winner={winner}
        onRetry={resetGame}
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
        onRetry={resetGame}
      />
    </Container>
  );
};

export default PagePropsInitialized(GamePage)((query) => {
  const [boardWidth, boardHeight] = GameUtil.getBoardSize(query);
  const playersCount = GameUtil.getPlayersCount(query);
  const shapes = GameUtil.getPieceShapes(query, playersCount);
  const players = shapes.map((shape) => shapeByPlayer.indexOf(shape));

  const routePortsCount = GameUtil.getRoutePortsCount(query, playersCount, [
    boardWidth,
    boardHeight,
  ]);

  const turretPortsCount = GameUtil.getTurretPortsCount(query, playersCount, [
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
