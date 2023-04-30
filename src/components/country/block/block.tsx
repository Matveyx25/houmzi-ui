import React from 'react';
import s from './block.module.scss';

interface IProps {
  title?: string
}

export const Block: React.FC<IProps> = ({ title, children }) => (
  <div className={s.block}>
    {
      title &&
      <h2 className={s.block__title}>
        {title}
      </h2>
    }
    {children}
  </div>
);
