import React from 'react';
import { GrayHelpIconUrl } from '../../../icons';
import { ConfirmDialog, ConfirmDialogProps } from '../../core';

export type GameRetryDialogProps = Omit<
  ConfirmDialogProps,
  'iconUrl' | 'message' | 'onAccept' | 'onReject'
> & { onRetry: () => void };

const GameRetryDialog: React.FC<GameRetryDialogProps> = ({
  onRetry: emitRetry,
  onClose: emitClose,
  ...props
}) => (
  <ConfirmDialog
    iconUrl={GrayHelpIconUrl}
    message="勝負未分，確認重開？"
    onAccept={emitRetry}
    onReject={emitClose}
    onClose={emitClose}
    {...props}
  />
);

export default GameRetryDialog;
