import React from 'react';

import {
  LightLeaveIconUrl,
  LightRetryIconUrl,
  PlayerDIconUrl,
  PlayerNIconUrl,
  PlayerOIconUrl,
  PlayerEIconUrl,
  PlayerXIconUrl,
} from '../../../icons';

import { NoPlayer, NoWinner, NO_WINNER } from '../../../relati';
import { Button, Description, Dialog, PopupProps, Icon } from '../../core';

const iconUrlByWinner: Record<number, string> = {
  [-1]: PlayerNIconUrl,
  0: PlayerOIconUrl,
  1: PlayerXIconUrl,
  2: PlayerDIconUrl,
  3: PlayerEIconUrl,
};

const messageByWinner: Record<number, string> = {
  [-1]: '平手！',
  0: '圓圈玩家獲勝！',
  1: '叉叉玩家獲勝！',
  2: '三角玩家獲勝！',
  3: '四方玩家獲勝！',
};

export type GameOverDialogProps = PopupProps & {
  winner: number | NoPlayer | NoWinner;
  onRetry?: () => void;
  onLeave?: () => void;
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
        <Description.Text children={message} />
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
