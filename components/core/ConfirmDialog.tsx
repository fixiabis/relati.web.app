import React from 'react';
import { LightAcceptIconUrl, LightRejectIconUrl } from '../../icons';
import Button from './Button';
import Dialog, { DialogProps } from './Dialog';
import Description from './Description';
import Icon from './Icon';

export type ConfirmDialogProps = DialogProps & {
  iconUrl: string;
  message: string;
  onAccept: () => void;
  onReject: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  iconUrl,
  message,
  onAccept: emitAccept,
  onReject: emitReject,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <Description>
        <Icon url={iconUrl} />
        {message}
      </Description>
      <Button.Group>
        <Button color="crimson" onClick={emitAccept}>
          <Icon url={LightAcceptIconUrl} />
        </Button>
        <Button color="royalblue" onClick={emitReject}>
          <Icon url={LightRejectIconUrl} />
        </Button>
      </Button.Group>
    </Dialog>
  );
};

export default ConfirmDialog;
