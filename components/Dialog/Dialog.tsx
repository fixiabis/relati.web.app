import React from 'react';
import Popup, { PopupProps } from '../Popup';
import DialogStyles from './Dialog.module.css';

export type DialogProps = PopupProps;

const Dialog: React.FC<DialogProps> = ({ className = '', ...props }) => (
  <Popup
    className={DialogStyles.Dialog + (className && ` ${className}`)}
    {...props}
  />
);

export default Dialog;
