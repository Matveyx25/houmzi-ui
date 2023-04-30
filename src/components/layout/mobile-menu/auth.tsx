import React from 'react';
import { Button } from './button/button';

interface IButton {
  title: string
  popupName: string
}

const buttons: IButton[] = [
  { title: 'Войти', popupName: 'log-in' },
  { title: 'Зарегистрироваться', popupName: 'sign-up' },
];

interface IProps {
  onOpenPopup(name: string): void
}

export const Auth: React.FC<IProps> = ({ onOpenPopup }) => (
  <>
    {
      buttons.map(({ title, popupName }: IButton) =>
        <Button key={popupName} title={title} onClick={() => onOpenPopup(popupName)}/>)
    }
  </>
);
