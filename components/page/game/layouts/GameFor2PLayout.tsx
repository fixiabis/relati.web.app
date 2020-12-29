import React, { useMemo, useState } from 'react';
import { Game, GameDefinition, GameRule, NO_WINNER } from '../../../../relati';
import { DirectionRoutes } from '../../../../relati/values';
import { Button, Container, Icon, useDialogState } from '../../../core';
import { LightLeaveIconUrl, LightRetryIconUrl } from '../../../../icons';
import { BoardFor2PGame, BoardFor2PGameProps } from '../../../game';

import {
  PieceFor2PGame as Piece,
  PlayerFor2PGame as Player,
  PLAYERS_COUNT_FOR_2P,
} from '../../../game/definitions';

import { GameLayoutComponent } from '../index';
import { GameLeaveDialog, GameOverDialog, GameRetryDialog } from '../dialogs';

const playersCount = PLAYERS_COUNT_FOR_2P;

const GameFor2PLayout: GameLayoutComponent = ({
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
        DirectionRoutes['P' + portsCount]
      ),
    [boardWidth, boardHeight, portsCount]
  );

  const [game, setGame] = useState(() => Game(GameRule(definition)));

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

  const winner = game.rule.getWinner(game);
  const playerOfTurn = (game.turn % playersCount) as Player;
  const canControlDirectly = winner !== NO_WINNER || game.turn === 0;

  const resetGame = () => {
    setGame(Game(game.rule));
    closeGameRetryDialog();
  };

  const handleRetry = canControlDirectly ? resetGame : openGameRetryDialog;
  const handleLeave = canControlDirectly ? emitLeave : openGameLeaveDialog;

  const handleGridClick: BoardFor2PGameProps['onGridClick'] = ({ x, y }) => {
    const pieceIndex = definition.toPieceIndex([x, y]);
    const gameWithPiecePlaced = game.place(pieceIndex, playerOfTurn);

    if (gameWithPiecePlaced !== game) {
      setGame(gameWithPiecePlaced);
      setPieceIndexesOfPlacement([...pieceIndexesOfPlacement, pieceIndex]);
    }

    openGameOverDialog();
  };

  return (
    <Container>
      <BoardFor2PGame
        game={game}
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

export default GameFor2PLayout;
