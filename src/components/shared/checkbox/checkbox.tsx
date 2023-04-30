import React from 'react';
import c from 'classnames/bind';
import s from './checkbox.module.scss';

interface IProps {
  checked: boolean
  className?: string

  onClick?(): void
}

export const Checkbox: React.FC<IProps> = ({ checked, className, onClick, children }) => (
  <div className={c(s.checkbox__wrap, className)}>
    <div className={c(s.checkbox, checked && s.checked)} onClick={onClick}>
      <i className={c('icon-tick', s.checkbox__icon, checked && s.checked)}/>
    </div>
    <div className={s.checkbox__label}>
      {children}
    </div>
  </div>
);
