import React from 'react';
import c from 'classnames/bind';
import s from './block.module.scss';

interface IProps {
  title: string
  className?: string
}

export const Block: React.FC<IProps> = ({ title, className, children }) => (
  <div className={c(s.block, className)}>
    <div className={s.block__title}>
      {title}
    </div>
    {children}
  </div>
);
