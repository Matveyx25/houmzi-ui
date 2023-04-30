import React from 'react';
import s from './banner.module.scss';

export const Banner: React.FC = () => (
  <section className={s.banner}>
    <img className={s.banner__img} src="/images/sell/banner.svg" alt=""/>
    <div className={s.banner__wrap}>
      <h1 className={s.banner__title}>
        Sell with confidence
      </h1>
      <div className={s.banner__subtitle}>
        Home selling is complicated. We are changing that.
      </div>
    </div>
  </section>
);
