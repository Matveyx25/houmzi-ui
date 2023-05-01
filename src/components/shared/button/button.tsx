import React from 'react';
import c from 'classnames';
import s from './button.module.scss';

interface IProps {
  className?: string
  disabled?: boolean
  color?: 'white' | 'blue' | 'blueLight' | 'blueBorder' | 'orange'
  full?: boolean

  onClick?(): void;
}

export const Button: React.FC<IProps> = ({ className, disabled, color, full, onClick, children }) => (
  <button
    className={c(
      s.btn,
      className,
      color ? s[color] : s.white,
      full && s.full,
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
