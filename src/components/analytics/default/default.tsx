import React from 'react';
import s from './default.module.scss';
import { Button } from '../../shared/button/button';
import Link from 'next/link';

export const Default: React.FC = () => (
  <div className={s.container}>
    <img src="/images/analytics.svg" alt="" className={s.img}/>
    <p className={s.text}>
      The analytics section is only available to premium accounts. Do you want to change your tariff?
    </p>
    <Link href="/dashboard/tariffs">
      <Button color="blue">Change tariff</Button>
    </Link>
  </div>
);
