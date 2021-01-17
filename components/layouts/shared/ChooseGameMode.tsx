import { LightBackIconUrl } from '../../../icons';
import { Button, Icon } from '../../core';
import { FadeInButton } from '../../shared';

export const renderButtonsForUnknown = () => (
  <Button.Group>
    <FadeInButton
      title="back"
      backgroundColor="#888"
      onClick={() => history.back()}
      children={<Icon url={LightBackIconUrl} />}
    />
  </Button.Group>
);

export * from './ChooseGameMode/utils';
