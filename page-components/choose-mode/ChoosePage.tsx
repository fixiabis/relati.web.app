import React from 'react';

import {
  LightBackIconUrl,
  LightPlayIconUrl,
  LightHelpIconUrl,
} from '../../icons';

import { Button, LinkButton } from '../../components';
import ChooseModePageStyles from './ChooseModePage.module.css';

const ChoosePage = ({ onCancel: emitCancel }) => (
  <div className="conatiner-filled flex-center">
    <Button.Group>
      <LinkButton
        title="開始玩"
        backgroundColor="crimson"
        backgroundImage={`url(${LightPlayIconUrl})`}
        className={ChooseModePageStyles.slideLeftFadeIn}
        href="/choose-mode?for=game"
      />
      <LinkButton
        title="如何玩"
        backgroundColor="royalblue"
        backgroundImage={`url(${LightHelpIconUrl})`}
        className={ChooseModePageStyles.slideLeftFadeInWhenSecondShown}
        href="/choose-mode?for=tutorial"
      />
    </Button.Group>
    <div className="bottom-fixed flex-center" style={{ height: 70 }}>
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

export default ChoosePage;
