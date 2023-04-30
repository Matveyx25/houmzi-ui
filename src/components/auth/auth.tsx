import React from 'react';
import { Popup } from '../shared/popup/popup';
import LoginContainer from '../../containers/auth/login-container';
import SignUpContainer from '../../containers/auth/sign-up-container';
import { popups } from '../../data/auth/auth.data';
import { ForgotPasswordContainer } from '../../containers/auth/forgot-password-container';

interface IProps {
  popupName: string

  onOpenPopup(name?: string): void
}

export const Auth: React.FC<IProps> = ({ popupName, onOpenPopup }) => (
  <>
    <Popup title="Log in" visible={popupName === 'log-in'} onClose={onOpenPopup}>
      <LoginContainer onOpenPopup={onOpenPopup} onClosePopup={onOpenPopup}/>
    </Popup>

    <Popup title="Sign up" visible={popupName === 'sign-up'} onClose={onOpenPopup}>
      <SignUpContainer onOpenPopup={onOpenPopup}/>
    </Popup>

    <Popup title="Forgot password" visible={popupName === 'forgot'} onClose={onOpenPopup}>
      <ForgotPasswordContainer onOpenPopup={onOpenPopup}/>
    </Popup>

    {
      popups.map(({ title, flag, Component }) => (
        <Popup key={flag} title={title} visible={popupName === flag} onClose={onOpenPopup}>
          {Component}
        </Popup>
      ))
    }
  </>
);
