import React from 'react';
import { GrayHelpIconUrl } from '../../../icons';
import { ConfirmDialog, ConfirmDialogProps } from '../../core';

export type GameLeaveDialogProps = Omit<
  ConfirmDialogProps,
  'iconUrl' | 'message' | 'onAccept' | 'onReject'
> & { onLeave: () => void };

const GameLeaveDialog: React.FC<GameLeaveDialogProps> = ({
  onLeave: emitLeave,
  onClose: emitClose,
  ...props
}) => (
  <ConfirmDialog
    iconUrl={GrayHelpIconUrl}
    message="勝負未分，確認離開？"
    onAccept={emitLeave}
    onReject={emitClose}
    onClose={emitClose}
    {...props}
  />
);

export default GameLeaveDialog;
