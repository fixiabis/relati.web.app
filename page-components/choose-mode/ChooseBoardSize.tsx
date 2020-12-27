import React from 'react';

import {
  LightBackIconUrl,
  LightX5IconUrl,
  LightX7IconUrl,
  LightX9IconUrl,
} from '../../icons';

import { Button, LinkButton } from '../../components';
import ChooseModePageStyles from './ChooseModePage.module.css';

const ChooseBoardSize = ({ usage, onCancel: emitCancel }) => (
  <div className="conatiner-filled flex-centered">
    <Button.Group>
      <LinkButton
        title="5x5大小"
        backgroundColor="royalblue"
        backgroundImage={`url(${LightX5IconUrl})`}
        className={ChooseModePageStyles.slideLeftFadeIn}
        href={`/choose-mode?for=x5-${usage}`}
      />
      <LinkButton
        title="7x7大小"
        backgroundColor="seagreen"
        backgroundImage={`url(${LightX7IconUrl})`}
        className={ChooseModePageStyles.slideLeftFadeInWhenFirstShown}
        href={`/choose-mode?for=x7-${usage}`}
      />
      <LinkButton
        title="9x9大小"
        backgroundColor="crimson"
        backgroundImage={`url(${LightX9IconUrl})`}
        className={ChooseModePageStyles.slideLeftFadeInWhenSecondShown}
        href={`/choose-mode?for=x9-${usage}`}
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

export default ChooseBoardSize;
