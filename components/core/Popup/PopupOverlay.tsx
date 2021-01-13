import * as animations from '../animations';
import { styled } from '../utils';
import * as styles from '../styles';

export type PopupOverlayProps = {
  visible: boolean;
};

const PopupOverlay = styled.div<PopupOverlayProps>(
  {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    animation: `${animations.fadeIn} 0.25s`,
    ...styles.overlay,
  },
  ({ visible: isVisible }) => ({ display: isVisible ? 'block' : 'none' })
);

export default PopupOverlay;
