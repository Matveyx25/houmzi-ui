import React from 'react';
import s from './popups.module.scss';
import { Button } from '../shared/button/button';

export const DowngradePopup: React.FC = () => (
  <>
    <p className={s.text}>
      Are you sure you want to switch to a cheaper tariff? All bonuses and statistics will be lost.
    </p>
    <div className={s.wrap}>
      <img src="/images/tariffs/basic.svg" alt=""/>
      <i className="icon-arrow-back"/>
      <img src="/images/tariffs/basic.svg" alt=""/>
    </div>
    <Button color="blue" className={s.btn}>Continue</Button>
  </>
);
