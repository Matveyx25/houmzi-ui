import React from 'react';
import s from './header.module.scss';
import { ChangeStateButton } from '../change-state-button/change-state-button';

interface IProps {
  windowWidth: number
  isActiveMap: boolean

  changeActiveScene(): void
}

export const Header: React.FC<IProps> = ({ windowWidth, ...props }) =>
  windowWidth < 1024 && (
    <section className={s.header}>
      <h1 className={s.header__title}>
        Rental Listings
      </h1>
      {
        windowWidth < 768 &&
        <ChangeStateButton {...props}/>
      }
    </section>
  );
