import { CSSObject } from '@emotion/react';
import React from 'react';
import { GrayOnePlayerIconUrl, LightVerifyIconUrl } from '../../../icons';
import { BottomNotice, Button, Description, Icon } from '../../core';
import { LinkButton } from '../../shared';

export type TutorialBottomNoticeProps = {
  buttonIconUrl?: string;
  buttonColor?: CSSObject['backgroundColor'];
  buttonHref?: string;
  onButtonClick?: () => void;
  iconUrl?: string;
  message: string;
  visible?: boolean;
};

const TutorialBottomNotice: React.FC<TutorialBottomNoticeProps> = ({
  buttonIconUrl = LightVerifyIconUrl,
  buttonColor = 'seagreen',
  buttonHref,
  iconUrl = GrayOnePlayerIconUrl,
  message,
  onButtonClick: emitButtonClick,
  visible: isVisible,
}) => {
  if (!isVisible) {
    return <></>;
  }

  const button = buttonHref ? (
    <LinkButton
      backgroundColor={buttonColor}
      children={<Icon url={buttonIconUrl} />}
      onClick={emitButtonClick}
      href={buttonHref}
    />
  ) : (
    <Button
      backgroundColor={buttonColor}
      children={<Icon url={buttonIconUrl} />}
      onClick={emitButtonClick}
    />
  );

  return (
    <BottomNotice>
      <Icon url={iconUrl} />
      <Description.Text children={message} />
      {button}
    </BottomNotice>
  );
};

export default TutorialBottomNotice;
