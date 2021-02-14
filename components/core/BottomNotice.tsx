import styled from '@emotion/styled';
import * as animations from './animations';

const BottomNotice = styled.div({
  boxSizing: 'border-box',
  width: '100%',
  height: '70px',
  overflow: 'hidden',
  padding: '10px',
  borderTopWidth: '2px',
  borderTopColor: '#888',
  borderTopStyle: 'solid',
  position: 'fixed',
  top: '0px',
  left: '0px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f2f2f2',
  userSelect: 'none',
  animation: `${animations.slideTopFadeIn} 0.25s`,
});

export default BottomNotice;
