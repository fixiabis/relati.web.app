import React from 'react';
import { LightPlayIconUrl, LightHelpIconUrl } from '../icons';
import { Button, Icon, Link } from '../components/core';
import { HomePageStyles, Logo } from '../components/page/index';

const HomePage = () => {
  return (
    <div className="container-filled flex-center">
      <div className={HomePageStyles.slideTopWhenLogoDrawn}>
        <Logo effect="drawLineAndFill" />
      </div>
      <Button.Group className={HomePageStyles.slideDownFadeInWhenLogoDrawn}>
        <Link href="/choose-mode?for=game">
          <Button title="開始玩" color="crimson">
            <Icon url={LightPlayIconUrl} />
          </Button>
        </Link>
        <Link href="/choose-mode?for=tutorial">
          <Button title="如何玩" color="royalblue">
            <Icon url={LightHelpIconUrl} />
          </Button>
        </Link>
      </Button.Group>
    </div>
  );
};

export default HomePage;
