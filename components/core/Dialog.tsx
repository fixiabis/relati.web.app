import styled from '@emotion/styled';
import Popup from './Popup';

const Dialog = styled(Popup)({
  userSelect: 'none',
  maxWidth: '300px',
  maxHeight: '200px',
  overflow: 'hidden',
  position: 'fixed',
  top: 'calc(50% - 100px)',
  left: 'calc(50% - 150px)',
});

export default Dialog;
