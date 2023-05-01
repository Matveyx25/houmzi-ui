import React from 'react';
import s from './filter-block.module.scss';
import c from 'classnames';

interface IProps {
  title: string
  classContent?: string
  hidden?: boolean
}

export const FilterBlock: React.FC<IProps> = ({ title, classContent, hidden, children }) =>
  !hidden
    ? <div className={s.block}>
      <div className={s.block__title}>
        {title}
      </div>
      <div className={c(s.block__content, classContent)}>
        {children}
      </div>
    </div>
    : null;
