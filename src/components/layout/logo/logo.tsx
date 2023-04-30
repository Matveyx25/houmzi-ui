import React from 'react';
import s from './logo.module.scss';
import Link from 'next/link';

export const Logo: React.FC = () => (
  <Link href="/">
    <a className={s.logo}>
      <img src="/images/logo.svg" alt="" className={s.logo__img}/>
      <img src="/images/logo-text.svg" alt="" className={s.logo__text}/>
    </a>
  </Link>
);
