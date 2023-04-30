import React from 'react';
import s from './register-success.module.scss';

export const RegisterSuccess: React.FC = () => (
  <>
    <div className={s.subtitle}>
      A confirmation letter has been sent to the mail you specified.
    </div>
    <img src="/images/email.svg" alt="" className={s.img}/>
  </>
);
