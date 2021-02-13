import styled from '@emotion/styled';
import * as animations from './animations';
import Popup from './Popup';

const BottomNotice = styled(Popup)({
  userSelect: 'none',
  borderWidth: '0px',
  borderTopWidth: '2px',
  borderRadius: '0px',
  width: '100%',
  maxHeight: '70px',
  overflow: 'hidden',
  position: 'fixed',
  top: 'calc(100% - 70px)',
  left: '0px',
  animation: `${animations.slideTopFadeIn} 0.25s`,
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export default BottomNotice;
