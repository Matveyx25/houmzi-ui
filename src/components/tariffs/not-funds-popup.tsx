import React from 'react';
import s from './popups.module.scss';
import { Button } from '../shared/button/button';

export const NotFundsPopup: React.FC = () => (
  <>
    <p className={s.text}>
      You do not have enough funds to switch to another plan, please replenish your account.
    </p>
    <p className={s.text}>
      It is necessary to replenish
    </p>
    <p className={s.price}>
      $8
    </p>
    <Button color="blue" className={s.btn}>Continue</Button>
  </>
);
