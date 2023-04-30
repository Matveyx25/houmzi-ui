import React from 'react';
import s from './radio.module.scss';
import c from 'classnames/bind';

interface IProps {
  name: string
  checked: boolean
  className?: string

  onChange(e: React.FormEvent<HTMLInputElement>): void
}

export const Radio: React.FC<IProps> = ({ name, checked, className, onChange, children }) => (
  <div className={c(s.radio, className)}>
    <label className={s.radio__wrap}>
      <input type="radio" name={name} checked={checked} className={s.radio__input} onChange={onChange}/>
      <span className={s.radio__mark}/>
    </label>
    <div className={s.radio__label}>
      {children}
    </div>
  </div>
);
