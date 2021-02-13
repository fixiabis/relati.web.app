import React from 'react';
import { LightAcceptIconUrl, LightRejectIconUrl } from '../../icons';
import { Button, Dialog, Icon, PopupProps } from '../core';
import Description from './Description';

export type ConfirmDialogProps = {
  iconUrl: string;
  message: string;
  onAccept: () => void;
  onReject: () => void;
} & PopupProps;

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  iconUrl,
  message,
  onAccept: emitAccept,
  onReject: emitReject,
  ...props
}) => (
  <Dialog {...props}>
    <Description iconUrl={iconUrl} text={message} />
    <Button.Group>
      <Button backgroundColor="crimson" onClick={emitAccept}>
        <Icon url={LightAcceptIconUrl} />
      </Button>
      <Button backgroundColor="royalblue" onClick={emitReject}>
        <Icon url={LightRejectIconUrl} />
      </Button>
    </Button.Group>
  </Dialog>
);

export default ConfirmDialog;
