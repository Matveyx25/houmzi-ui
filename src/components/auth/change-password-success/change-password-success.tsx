import React from 'react';
import s from './change-password-success.module.scss';
import { Button } from '../../shared/button/button';

export const ChangePasswordSuccess: React.FC = () => (
  <>
    <img src="/images/lock.svg" alt="" className={s.img}/>
    <Button full color="blue" className={s.btn}>
      Log in
    </Button>
  </>
);
