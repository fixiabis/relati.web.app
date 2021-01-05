import React, { useEffect, useMemo, useState } from 'react';
import {
  EMPTY_PIECE,
  Game,
  GameDefinition,
  GameRule,
  NO_WINNER,
} from '../../../../relati';
import { DirectionRoutes } from '../../../../relati/values';

import Thinker, {
  DeepThinking,
  MultiInfluencesBasedThinking,
} from '../../../../relati/Thinker';

import { Button, Container, Icon, useDialogState } from '../../../core';
import { LightLeaveIconUrl, LightRetryIconUrl } from '../../../../icons';
import { BoardForGame, BoardForGameProps } from '../../../game';

import { GameLayoutComponent } from '../index';
import { GameLeaveDialog, GameOverDialog, GameRetryDialog } from '../dialogs';

type Player = number;
type Piece = number;
const playersCount = 2;

const GameFor1PLayoutBuilder: (player: Player) => GameLayoutComponent = (
  player
) => {
  const GameFor1PLayout: GameLayoutComponent = ({
    boardWidth,
    boardHeight,
    portsCount,
    onLeave: emitLeave,
  }) => {
    const definition = useMemo(
      () =>
        GameDefinition<Player, Piece>(
          playersCount,
          boardWidth,
          boardHeight,
          DirectionRoutes['P8' /*  + portsCount */]
        ),
      [boardWidth, boardHeight, portsCount]
    );

    const thinker = useMemo(() => {
      const multiInfluencesBasedThinking = MultiInfluencesBasedThinking(
        definition
      );

      // const maximumTerritoryBasedThinking = MaximumTerritoryBasedThinking(
      //   definition
      // );

      const deepThinking = DeepThinking(multiInfluencesBasedThinking, 1);

      const thinker = Thinker(deepThinking);

      return thinker;
    }, [definition]);

    const [game, setGame] = useState(() => Game(GameRule(definition)));
    const [prevGame, setPrevGame] = useState(game);

    const [pieceIndexesOfPlacement, setPieceIndexesOfPlacement] = useState<
      number[]
    >([]);

    const [
      isGameOverDialogVisible,
      openGameOverDialog,
      closeGameOverDialog,
    ] = useDialogState(false);

    const [
      isGameLeaveDialogVisible,
      openGameLeaveDialog,
      closeGameLeaveDialog,
    ] = useDialogState(false);

    const [
      isGameRetryDialogVisible,
      openGameRetryDialog,
      closeGameRetryDialog,
    ] = useDialogState(false);

    useEffect(() => {
      const playerOfTurn = (game.turn % playersCount) as Player;

      if (playerOfTurn !== player) {
        setTimeout(() => {
          const pieceIndex = thinker.getPieceIndexForPlacement(game);
          const gameWithPiecePlaced = game.place(pieceIndex, playerOfTurn);
          setGame(gameWithPiecePlaced);
          setPieceIndexesOfPlacement([...pieceIndexesOfPlacement, pieceIndex]);
          setPrevGame(game);
        }, 500);
      }
    }, [game]);

    useEffect(() => {
      const { turn, pieces, producerPieceIndexes } = game;
      const { pieceIndexes } = game.definition;

      const {
        isPieceIndexOfPlayerHasProvidablePieceIndexRoute,
        getWinner,
      } = game.rule;

      const winner = getWinner(game);

      if (turn < playersCount || winner !== NO_WINNER) {
        return;
      }

      const playerOfTurn = turn % playersCount;

      const hasPieceIndexOfPlayerPlaceable = pieceIndexes.some(
        (pieceIndex) =>
          pieces[pieceIndex] === EMPTY_PIECE &&
          isPieceIndexOfPlayerHasProvidablePieceIndexRoute(
            pieces,
            pieceIndex,
            playerOfTurn
          )
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

    const winner = game.rule.getWinner(game);
    const canControlDirectly = winner !== NO_WINNER || game.turn === 0;

    const resetGame = () => {
      const resetedGame = Game(game.rule);
      setGame(resetedGame);
      setPrevGame(resetedGame);
      closeGameRetryDialog();
    };

    const handleRetry = canControlDirectly ? resetGame : openGameRetryDialog;
    const handleLeave = canControlDirectly ? emitLeave : openGameLeaveDialog;

    const handleGridClick: BoardForGameProps['onGridClick'] = ({ x, y }) => {
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

        <Button.DenceGroup className="bottom-right-fixed">
          <Button title="重開" color="#888" onClick={handleRetry}>
            <Icon url={LightRetryIconUrl} />
          </Button>
          <Button title="離開" color="#888" onClick={handleLeave}>
            <Icon url={LightLeaveIconUrl} />
          </Button>
        </Button.DenceGroup>

        <GameOverDialog
          visible={isGameOverDialogVisible}
          onClose={closeGameOverDialog}
          winner={winner}
          onRetry={resetGame}
          onLeave={emitLeave}
        />

        <GameLeaveDialog
          visible={isGameLeaveDialogVisible}
          onClose={closeGameLeaveDialog}
          onLeave={emitLeave}
        />

        <GameRetryDialog
          visible={isGameRetryDialogVisible}
          onClose={closeGameRetryDialog}
          onRetry={resetGame}
        />
      </Container>
    );
  };

  return GameFor1PLayout;
};

export default GameFor1PLayoutBuilder;
