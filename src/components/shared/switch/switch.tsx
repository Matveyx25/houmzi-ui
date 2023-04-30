import React from 'react';
import s from './switch.module.scss';

interface IProps {
  name?: string
  checked?: boolean

  onChange?(e: React.FormEvent<HTMLInputElement>): void
}

export const Switch :React.FC<IProps>=({ name, checked, onChange })=> (
  <label className={s.switch}>
    <input
      className={s.switch__input}
      type="checkbox"
      name={name}
      checked={checked || false}
      onChange={onChange}
    />
    <span className={s.switch__slider}/>
  </label>
)
