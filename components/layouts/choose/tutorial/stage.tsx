import { Button } from '../../../core';
import { SlideLeftFadeInLinkButton } from '../../../shared';

export const renderButtons = (boardParams: string) => (
  <Button.Group>
    <SlideLeftFadeInLinkButton
      animationDelay="0.25s"
      href={`/tutorial?board=${boardParams}&stage=1`}
      title="1"
      backgroundColor="crimson"
      children="1"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.5s"
      href={`/tutorial?board=${boardParams}&stage=2`}
      title="2"
      backgroundColor="royalblue"
      children="2"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="0.75s"
      href={`/tutorial?board=${boardParams}&stage=3`}
      title="3"
      backgroundColor="darkorange"
      children="3"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="1s"
      href={`/tutorial?board=${boardParams}&stage=4`}
      title="4"
      backgroundColor="seagreen"
      children="4"
    />
    <SlideLeftFadeInLinkButton
      animationDelay="1.25s"
      href={`/tutorial?board=${boardParams}&stage=5`}
      title="5"
      backgroundColor="purple"
      children="5"
    />
  </Button.Group>
);
