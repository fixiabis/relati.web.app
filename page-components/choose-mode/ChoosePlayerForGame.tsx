import React from 'react';

import {
  LightBackIconUrl,
  LightOnePlayerIconUrl,
  LightTwoPlayerIconUrl,
  LightOnlineIconUrl,
} from '../../icons';

import { Button, LinkButton } from '../../components';
import ChooseModePageStyles from './ChooseModePage.module.css';

const ChoosePlayerForGame = ({ onCancel: emitCancel }) => (
  <div className="conatiner-filled flex-centered">
    <Button.Group>
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
    </Button.Group>
    <div className="bottom-fixed flex-centered" style={{ height: 70 }}>
      <Button.Group>
        <Button
          title="返回"
          backgroundColor="#888"
          backgroundImage={`url(${LightBackIconUrl})`}
          onClick={emitCancel}
        />
      </Button.Group>
    </div>
  </div>
);

export default ChoosePlayerForGame;
