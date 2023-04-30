import React from 'react';
import s from './header.module.scss';

export const Header: React.FC = () => (
  <section className={s.header}>
    <h1 className={s.header__title}>
      Agents
    </h1>
    {/*<div className={s.header__actions}>*/}
    {/*  Actions*/}
    {/*</div>*/}
  </section>
);
