import React from 'react';

import {
  LightBackIconUrl,
  LightOnePlayerIconUrl,
  LightTwoPlayerIconUrl,
  LightOnlineIconUrl,
  PlayIconUrl,
} from '../../../../icons';

import { Button, Container, Description, Icon, Link } from '../../../core';
import ChooseModePageStyles from '../ChooseModePage.module.css';

const ChoosePlayerForGameLayout = ({ onCancel: emitCancel }) => (
  <Container>
    <Description className={ChooseModePageStyles.FadeIn}>
      <Icon url={PlayIconUrl} />
      選擇玩家數量
    </Description>
    <Button.Group>
      <Link href="/choose-mode?for=1p-game">
        <Button
          title="單人玩家"
          color="royalblue"
          className={ChooseModePageStyles.SlideLeftFadeIn}
        >
          <Icon url={LightOnePlayerIconUrl} />
        </Button>
      </Link>
      <Link href="/choose-mode?for=2p-game">
        <Button
          title="雙人玩家"
          color="crimson"
          className={ChooseModePageStyles.SlideLeftFadeInWhenFirstShown}
        >
          <Icon url={LightTwoPlayerIconUrl} />
        </Button>
      </Link>
      <Link href="/choose-mode?for=2p-online-game">
        <Button
          title="線上對戰"
          color="#888"
          className={ChooseModePageStyles.SlideLeftFadeInWhenSecondShown}
        >
          <Icon url={LightOnlineIconUrl} />
        </Button>
      </Link>
    </Button.Group>
    <Button.DenceGroup className="bottom-right-fixed">
      <Button
        title="返回"
        color="#888"
        className={ChooseModePageStyles.FadeIn}
        onClick={emitCancel}
      >
        <Icon url={LightBackIconUrl} />
      </Button>
    </Button.DenceGroup>
  </Container>
);

export default ChoosePlayerForGameLayout;
