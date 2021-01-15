import React, { useCallback, useRef } from 'react';
import * as animations from '../animations';
import { styled } from '../utils';
import PopupOverlay from './PopupOverlay';

export type PopupProps = {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
};

const PopupBase = styled.div({
  boxSizing: 'border-box',
  width: '90%',
  height: '90%',
  overflow: 'auto',
  padding: '10px',
  borderWidth: '2px',
  borderColor: '#888',
  borderStyle: 'solid',
  borderRadius: '5px',
  position: 'fixed',
  top: '5%',
  left: '5%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f2f2f2',
  animation: `${animations.zoomIn} 0.25s`,
});

const Popup: React.FC<PopupProps> = ({
  className,
  children,
  visible: isVisible = false,
  onClose: emitClose,
}) => {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleClose = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === containerRef.current) {
        emitClose && emitClose();
      }
    },
    [containerRef, emitClose]
  );

  return (
    <PopupOverlay ref={containerRef} visible={isVisible} onClick={handleClose}>
      <PopupBase className={className} children={children} />
    </PopupOverlay>
  );
};

export default Popup;
