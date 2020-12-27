import React from 'react';

import {
  LightOnePlayerIconUrl,
  LightTwoPlayerIconUrl,
  LightOnlineIconUrl,
} from '../../icons';

import { ButtonGroup, LinkButton } from '../../components';
import ChooseModePageStyles from './ChooseModePage.module.css';

const ChoosePlayerForGame = () => {
  return (
    <div className="conatiner-filled flex-centered">
      <ButtonGroup>
        <LinkButton
          title="單人玩家"
          backgroundColor="royalblue"
          backgroundImage={`url(${LightOnePlayerIconUrl})`}
          className={ChooseModePageStyles.slideLeftFadeIn}
          href="/choose-mode?for=1p-game"
        />
        <LinkButton
          title="雙人玩家"
          backgroundColor="crimson"
          backgroundImage={`url(${LightTwoPlayerIconUrl})`}
          className={ChooseModePageStyles.slideLeftFadeInWhenFirstShown}
          href="/choose-mode?for=2p-game"
        />
        <LinkButton
          title="線上對戰"
          backgroundColor="#888"
          backgroundImage={`url(${LightOnlineIconUrl})`}
          className={ChooseModePageStyles.slideLeftFadeInWhenSecondShown}
          href="/choose-mode?for=2p-online-game"
        />
      </ButtonGroup>
    </div>
  );
};

export default ChoosePlayerForGame;
