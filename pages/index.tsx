import React from 'react';
import { LightPlayIconUrl, LightHelpIconUrl } from '../icons';
import { Button, LinkButton, Logo } from '../components';
import { HomePageStyles } from '../page-components/index';

const HomePage = () => {
  return (
    <div className="conatiner-filled flex-centered">
      <div className={HomePageStyles.slideTopWhenLogoDrawn}>
        <Logo effect="drawLineAndFill" />
      </div>
      <Button.Group className={HomePageStyles.slideDownFadeInWhenLogoDrawn}>
        <LinkButton
          title="開始玩"
          backgroundColor="crimson"
          backgroundImage={`url(${LightPlayIconUrl})`}
          href="/choose-mode?for=game"
        />
        <LinkButton
          title="如何玩"
          backgroundColor="royalblue"
          backgroundImage={`url(${LightHelpIconUrl})`}
          href="/choose-mode?for=tutorial"
        />
      </Button.Group>
    </div>
  );
};

export default HomePage;
