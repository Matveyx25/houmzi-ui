import React from 'react';
import s from './popups.module.scss';

export const SuccessfulPopup: React.FC = () => (
  <>
    <p className={s.text}>
      Congratulations! You have successfully <br/> changed the tariff.
    </p>
    <div className={s.wrap}>
      <img src="/images/tariffs/basic.svg" alt=""/>
    </div>
  </>
);
