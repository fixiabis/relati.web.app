import React from 'react';

import {
  LightBackIconUrl,
  PlayerOIconUrl,
  PlayerXIconUrl,
  KnowledgeIconUrl,
  OnePlayerIconUrl,
} from '../../icons';

import { Button, Icon, LinkButton } from '../../components';
import ChooseModePageStyles from './ChooseModePage.module.css';

const ChooseModeForOnePlayer = ({ onCancel: emitCancel }) => (
  <div className="conatiner-filled flex-center">
    <div className="flex-center" style={{ height: 90, padding: 10 }}>
      <Icon url={OnePlayerIconUrl} />
      選擇用子或解謎
    </div>
    <Button.Group>
      <LinkButton
        title="玩家先手"
        backgroundImage={`url(${PlayerOIconUrl})`}
        className={ChooseModePageStyles.slideLeftFadeIn}
        href="/choose-mode?for=1p-with-x-game"
      />
      <LinkButton
        title="玩家後手"
        backgroundImage={`url(${PlayerXIconUrl})`}
        className={ChooseModePageStyles.slideLeftFadeInWhenFirstShown}
        href="/choose-mode?for=1p-with-o-game"
      />
      <LinkButton
        title="殘局關卡"
        backgroundImage={`url(${KnowledgeIconUrl})`}
        className={ChooseModePageStyles.slideLeftFadeInWhenSecondShown}
        href="/choose-mode?for=1p-puzzle-game"
      />
    </Button.Group>
    <div className="bottom-right-fixed" style={{ padding: 10 }}>
      <Button
        title="返回"
        backgroundColor="#888"
        backgroundImage={`url(${LightBackIconUrl})`}
        onClick={emitCancel}
      />
    </div>
  </div>
);

export default ChooseModeForOnePlayer;
