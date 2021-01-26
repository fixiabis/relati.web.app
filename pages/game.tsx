import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import {
  useSwitch,
  Container,
  BoardForGame,
  BoardForGameProps,
  GamePageLayout,
  Icon,
  BottomRightFixedButtonDenceGroup,
  FadeInButton,
  GameUtil,
  PagePropsInitialized,
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
  const definition = GamePageLayout.useDefinition(
    playersCount,
    boardWidth,
    boardHeight,
    portsCount
  );

  const thinker = GamePageLayout.useThinker(definition);

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
    const game = Game(GameRule(definition));
    setGame(game);
    setPrevGame(game);
  }, [definition]);

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

    if (pieces.includes(shape)) {
      const pieceIndex = definition.toPieceIndex([x, y]);
      const gameWithPiecePlaced = game.place(pieceIndex, player);

      if (gameWithPiecePlaced !== game) {
        setGame(gameWithPiecePlaced);
        setPieceIndexesOfPlacement([...pieceIndexesOfPlacement, pieceIndex]);
        setPrevGame(game);
      }
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

      <GamePageLayout.GameOverDialog
        visible={isGameOverDialogVisible}
        onClose={closeGameOverDialog}
        winner={winner}
        onRetry={resetGame}
        onLeave={leave}
      />

      <GamePageLayout.GameLeaveDialog
        visible={isGameLeaveDialogVisible}
        onClose={closeGameLeaveDialog}
        onLeave={leave}
      />

      <GamePageLayout.GameRetryDialog
        visible={isGameRetryDialogVisible}
        onClose={closeGameRetryDialog}
        onRetry={resetGame}
      />
    </Container>
  );
};

export default PagePropsInitialized(GamePage)((query) => {
  const [boardWidth, boardHeight] = GameUtil.getBoardSize(query);
  const playersCount = GameUtil.getPlayersCount(query);
  const pieces = GameUtil.getPieces(query, playersCount);

  const portsCount = GameUtil.getPortsCount(query, playersCount, [
    boardWidth,
    boardHeight,
  ]);

  return { boardWidth, boardHeight, pieces, playersCount, portsCount };
});
