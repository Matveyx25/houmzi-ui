import React from 'react';
import s from './info-block.module.scss';

interface IProps {
  title?: string
}

export const InfoBlock : React.FC<IProps> =({ title, children })=> (
  <div className={s.block}>
    {
      title &&
      <div className={s.block__title}>
        {title}
      </div>
    }
    {children}
  </div>
)
