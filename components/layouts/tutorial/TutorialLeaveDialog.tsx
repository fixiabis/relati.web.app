import React from 'react';
import { GrayHelpIconUrl } from '../../../icons';
import { ConfirmDialog, ConfirmDialogProps } from '../../shared';

export type TutorialLeaveDialogProps = Omit<
  ConfirmDialogProps,
  'iconUrl' | 'message' | 'onAccept' | 'onReject'
> & { onLeave: () => void };

const TutorialLeaveDialog: React.FC<TutorialLeaveDialogProps> = ({
  onLeave: emitLeave,
  onClose: emitClose,
  ...props
}) => (
  <ConfirmDialog
    iconUrl={GrayHelpIconUrl}
    message="教學尚未結束，確認離開？"
    onAccept={emitLeave}
    onReject={emitClose}
    onClose={emitClose}
    {...props}
  />
);

export default TutorialLeaveDialog;
