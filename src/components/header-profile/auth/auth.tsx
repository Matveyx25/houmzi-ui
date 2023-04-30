import React from 'react';
import { Block } from '../block/block';
import { getAccessToken } from '../../../helpers/cookies.helpers';

interface IProps {
  onOpenPopup(name: string): void

  onLogout(): void
}

export const Auth: React.FC<IProps> = ({ onOpenPopup, onLogout }) => (
  <Block>
    {
      getAccessToken()
        ? <div onClick={onLogout}>
          Выйти
        </div>
        : <>
          <div onClick={() => onOpenPopup('log-in')}>
            Войти
          </div>
          <div onClick={() => onOpenPopup('sign-up')}>
            Зарегистрироваться
          </div>
        </>
    }
  </Block>
);
