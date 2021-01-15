import React from 'react';
import { LightAcceptIconUrl, LightRejectIconUrl } from '../../icons';
import Button from './Button';
import Dialog from './Dialog';
import Description from './Description';
import { PopupProps } from './Popup';
import Icon from './Icon';

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
    <Description>
      <Icon url={iconUrl} />
      {message}
    </Description>
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
