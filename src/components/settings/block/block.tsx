import React from 'react';
import c from 'classnames';
import s from './block.module.scss';

interface IProps {
  className?: string
}

export const Block: React.FC<IProps> = ({ className, children }) => (
  <div className={c(s.block, className)}>
    {children}
  </div>
);
