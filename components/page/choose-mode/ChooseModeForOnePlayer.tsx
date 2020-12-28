import React from 'react';

import {
  LightBackIconUrl,
  PlayerOIconUrl,
  PlayerXIconUrl,
  KnowledgeIconUrl,
  OnePlayerIconUrl,
} from '../../../icons';

import { Button, Container, Description, Icon, Link } from '../../core';
import ChooseModePageStyles from './ChooseModePage.module.css';

const ChooseModeForOnePlayer = ({ onCancel: emitCancel }) => (
  <Container>
    <Description className={ChooseModePageStyles.fadeIn}>
      <Icon url={OnePlayerIconUrl} />
      選擇用子或解謎
    </Description>
    <Button.Group>
      <Link href="/choose-mode?for=1p-with-x-game">
        <Button
          title="玩家先手"
          className={ChooseModePageStyles.slideLeftFadeIn}
        >
          <Icon url={PlayerOIconUrl} />
        </Button>
      </Link>
      <Link href="/choose-mode?for=1p-with-o-game">
        <Button
          title="玩家後手"
          className={ChooseModePageStyles.slideLeftFadeInWhenFirstShown}
        >
          <Icon url={PlayerXIconUrl} />
        </Button>
      </Link>
      <Link href="/choose-mode?for=1p-puzzle-game">
        <Button
          title="殘局關卡"
          className={ChooseModePageStyles.slideLeftFadeInWhenSecondShown}
        >
          <Icon url={KnowledgeIconUrl} />
        </Button>
      </Link>
    </Button.Group>
    <Button.DenceGroup className="bottom-right-fixed">
      <Button
        title="返回"
        color="#888"
        className={ChooseModePageStyles.fadeIn}
        onClick={emitCancel}
      >
        <Icon url={LightBackIconUrl} />
      </Button>
    </Button.DenceGroup>
  </Container>
);

export default ChooseModeForOnePlayer;