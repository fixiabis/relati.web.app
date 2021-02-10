import { Button } from '../../../core';
import { SlideLeftFadeInLinkButton } from '../../../shared';

export const renderButtons = () => (
  <Button.Group>
    <SlideLeftFadeInLinkButton
      animationDelay="0.25s"
      href="/tutorial?board=x5"
      title="5x5"
      backgroundColor="royalblue"
      children="5"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.5s"
      href="/tutorial?board=x7"
      title="7x7"
      backgroundColor="darkorange"
      children="7"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.75s"
      href="/tutorial?board=x9"
      title="9x9"
      backgroundColor="crimson"
      children="9"
    />
    {/* <SlideLeftFadeInLinkButton
      animationDelay="1s"
      href="/tutorial?board=x11"
      title="11x11"
      backgroundColor="seagreen"
      children="11"
    /> */}
  </Button.Group>
);
