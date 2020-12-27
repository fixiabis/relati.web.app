import React, { useRef } from 'react';
import PopupStyles from './Popup.module.css';

export type PopupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  visible?: boolean;
  onClose?: () => void;
};

const Popup: React.FC<PopupProps> = ({
  className = '',
  visible: isVisible = true,
  onClose: emitClose,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const containerDisplayMode = isVisible ? 'block' : 'none';

  const containerStyle = {
    display: containerDisplayMode,
  };

  const handleClose = (event: React.MouseEvent) => {
    if (event.target === containerRef.current) {
      emitClose?.();
    }
  };

  return (
    <div
      className={`overlay ${PopupStyles.PopupOverlay}`}
      ref={containerRef}
      style={containerStyle}
      onClick={handleClose}
    >
      <div
        className={PopupStyles.Popup + (className && ` ${className}`)}
        {...props}
      />
    </div>
  );
};

export default Popup;
