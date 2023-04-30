import React from 'react';
import s from './popups.module.scss';
import { Button } from '../shared/button/button';

export const UpgradePopup: React.FC = () => (
  <>
    <p className={s.text}>
      Are you sure you want to switch to another tariff? An appropriate amount will be debited from your account.
    </p>
    <div className={s.wrap}>
      <img src="/images/tariffs/basic.svg" alt=""/>
      <i className="icon-arrow-back"/>
      <img src="/images/tariffs/basic.svg" alt=""/>
    </div>
    <Button color="blue" className={s.btn}>Continue</Button>
  </>
);
