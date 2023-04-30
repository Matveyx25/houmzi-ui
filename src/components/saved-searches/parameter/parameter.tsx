import React from 'react';
import s from './parameter.module.scss';

interface IProps {
  label: string
  value: string
}

export const Parameter: React.FC<IProps> = ({ label, value }) =>
  value && (
    <div className={s.parameter}>
        <span className={s.parameter__label}>
          {label}:
        </span>
      <span className={s.parameter__text}>
          {
            typeof value === 'boolean'
              ? value ? 'Yes' : 'No'
              : value
          }
        </span>
    </div>
  );
