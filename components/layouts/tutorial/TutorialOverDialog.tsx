import React from 'react';

import {
  LightRetryIconUrl,
  LightEnterIconUrl,
  GrayVerifyIconUrl,
} from '../../../icons';

import { Button, Description, Dialog, PopupProps, Icon } from '../../core';

export type TutorialOverDialogProps = PopupProps & {
  message: string;
  onEnter?: () => void;
  onRetry?: () => void;
};

const TutorialOverDialog: React.FC<TutorialOverDialogProps> = ({
  message,
  onEnter: emitEnter,
  onRetry: emitRetry,
  visible: isVisible,
  ...props
}) => {
  return (
    <Dialog visible={isVisible} {...props}>
      <Description>
        <Icon url={GrayVerifyIconUrl} />
        <Description.Text children={message} />
      </Description>
      <Button.Group>
        <Button backgroundColor="crimson" onClick={emitEnter}>
          <Icon url={LightEnterIconUrl} />
        </Button>
        <Button backgroundColor="royalblue" onClick={emitRetry}>
          <Icon url={LightRetryIconUrl} />
        </Button>
      </Button.Group>
    </Dialog>
  );
};

export default TutorialOverDialog;
