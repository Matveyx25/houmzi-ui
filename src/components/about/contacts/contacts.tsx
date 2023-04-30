import React from 'react';
import s from './contacts.module.scss';

export const Contacts: React.FC = () => (
  <div className={s.content}>
    <div className={s.item}>
      1301 Second Avenue Floor 31 Seattle, WA 98101
    </div>
    <div className={s.item}>
      Hello@gmail.com
    </div>
    <div className={s.item}>
      +33 7899 6638 98
    </div>
  </div>
);
