import React from 'react';
import { GrayHelpIconUrl } from '../../../icons';
import { ConfirmDialog, ConfirmDialogProps } from '../../shared';

export type GameUndoDialogProps = Omit<
  ConfirmDialogProps,
  'iconUrl' | 'message' | 'onAccept' | 'onReject'
> & { onUndo?: () => void };

const GameUndoDialog: React.FC<GameUndoDialogProps> = ({
  onUndo: emitUndo,
  onClose: emitClose,
  ...props
}) => (
  <ConfirmDialog
    iconUrl={GrayHelpIconUrl}
    message="確認返回上一步？"
    onAccept={emitUndo}
    onReject={emitClose}
    onClose={emitClose}
    {...props}
  />
);

export default GameUndoDialog;
