import React from 'react';
import { PlayerOIconUrl, PlayerXIconUrl, KnowledgeIconUrl } from '../../icons';
import { ButtonGroup, LinkButton } from '../../components';
import ChooseModePageStyles from './ChooseModePage.module.css';

const ChooseModeForOnePlayer = () => {
  return (
    <ButtonGroup>
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
    </ButtonGroup>
  );
};

export default ChooseModeForOnePlayer;
