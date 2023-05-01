import React from 'react';
import s from './user-card.module.scss';
import c from 'classnames';

interface IProp {
  id: string
  isChecked: boolean

  selectUser(id: string): void
}

export const UserCard: React.FC<IProp> = ({ id, isChecked, selectUser }) => (
  <div className={s.card}>
    <img src="https://randomuser.me/api/portraits/men/97.jpg" alt="" className={s.avatar}/>
    <div className={s.info}>
      <span className={s.name}>
        Jayden Massey
      </span>
      <span className={s.phone}>
        +44 890 908 09 09
      </span>
    </div>
    <div className={c(s.checkbox, isChecked && s.active)} onClick={() => selectUser(id)}>
      {isChecked && <i className={'icon-tick'}/>}
    </div>
  </div>
);
