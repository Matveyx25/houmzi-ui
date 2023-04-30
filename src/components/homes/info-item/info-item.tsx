import React from 'react';
import s from './info-item.module.scss';
import c from 'classnames/bind';

interface IProps {
  label: string
  value: string | number
  prefix?: string
  postfix?: string
  icon?: string
}

export const InfoItem: React.FC<IProps> = ({ label, value, prefix, postfix, icon }) =>
  value ?
    <div className={s.item}>
      <div className={s.item__label}>
        {label}
      </div>
      <div className={s.item__value}>
        {
          icon &&
          <i className={c(s.item__icon, icon)}/>
        }
        <span>
          {prefix && `${prefix} `}
          {value}
          {postfix && ` ${postfix}`}
        </span>
      </div>
    </div>
    : null;
