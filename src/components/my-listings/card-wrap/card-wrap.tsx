import React from 'react';
import c from 'classnames';
import s from './card-wrap.module.scss';

interface IProps {
  className?: string
}

export const CardWrap: React.FC<IProps> = ({ className, children }) => (
  <div className={c(s.wrap, className)}>
    {children}
  </div>
);
