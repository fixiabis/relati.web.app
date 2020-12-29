import React from 'react';

import {
  BoardIconUrl,
  LightBackIconUrl,
  LightX5IconUrl,
  LightX7IconUrl,
  LightX9IconUrl,
} from '../../../../icons';

import { Button, Container, Description, Icon, Link } from '../../../core';
import ChooseModePageStyles from '../ChooseModePage.module.css';

const ChooseBoardSizeLayout = ({ usage, onCancel: emitCancel }) => (
  <Container>
    <Description className={ChooseModePageStyles.FadeIn}>
      <Icon url={BoardIconUrl} />
      選擇棋盤大小
    </Description>
    <Button.Group>
      <Link href={`/choose-mode?for=x5-${usage}`}>
        <Button
          title="5x5大小"
          color="royalblue"
          className={ChooseModePageStyles.SlideLeftFadeIn}
        >
          <Icon url={LightX5IconUrl} />
        </Button>
      </Link>
      <Link href={`/choose-mode?for=x7-${usage}`}>
        <Button
          title="7x7大小"
          color="seagreen"
          className={ChooseModePageStyles.SlideLeftFadeInWhenFirstShown}
        >
          <Icon url={LightX7IconUrl} />
        </Button>
      </Link>
      <Link href={`/choose-mode?for=x9-${usage}`}>
        <Button
          title="9x9大小"
          color="crimson"
          className={ChooseModePageStyles.SlideLeftFadeInWhenSecondShown}
        >
          <Icon url={LightX9IconUrl} />
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

export default ChooseBoardSizeLayout;
