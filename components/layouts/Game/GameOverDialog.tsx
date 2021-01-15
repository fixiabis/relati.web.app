import React from 'react';

import {
  LightLeaveIconUrl,
  LightRetryIconUrl,
  PlayerNIconUrl,
  PlayerOIconUrl,
  PlayerXIconUrl,
} from '../../../icons';

import { NoPlayer, NoWinner, NO_WINNER } from '../../../relati';
import { Button, Description, Dialog, PopupProps, Icon } from '../../core';

const iconUrlByWinner: Record<number, string> = {
  [-1]: PlayerNIconUrl,
  0: PlayerOIconUrl,
  1: PlayerXIconUrl,
};

const messageByWinner: Record<number, string> = {
  [-1]: '平手！',
  0: 'O方玩家獲勝！',
  1: 'X方玩家獲勝！',
};

export type GameOverDialogProps = PopupProps & {
  winner: number | NoPlayer | NoWinner;
  onRetry: () => void;
  onLeave: () => void;
};

const GameOverDialog: React.FC<GameOverDialogProps> = ({
  winner,
  onRetry: emitRetry,
  onLeave: emitLeave,
  visible: isVisible,
  ...props
}) => {
  const iconUrl = iconUrlByWinner[winner];
  const message = messageByWinner[winner];

  return (
    <Dialog visible={isVisible && winner !== NO_WINNER} {...props}>
      <Description>
        <Icon url={iconUrl} />
        {message}
      </Description>
      <Button.Group>
        <Button backgroundColor="crimson" onClick={emitRetry}>
          <Icon url={LightRetryIconUrl} />
        </Button>
        <Button backgroundColor="royalblue" onClick={emitLeave}>
          <Icon url={LightLeaveIconUrl} />
        </Button>
      </Button.Group>
    </Dialog>
  );
};

export default GameOverDialog;
