import React from 'react';
import s from './auth.module.scss';
import { Button } from '../../shared/button/button';

class Auth extends React.Component {
  render(): React.ReactElement {
    return (
      <div className={s.auth}>
        <div className={s.social}>
          <i className="icon-facebook2"/>
          <span className={s.social__text}>
            Continue with Facebook
          </span>
        </div>
        <div className={s.social}>
          <i className="icon-google"/>
          <span className={s.social__text}>
            Continue with Google
          </span>
        </div>
        <div className={s.auth__buttons}>
          <Button color="blue" className={s.auth__btn}>
            Sign up
          </Button>
          <Button color="blueBorder" className={s.auth__btn}>
            Log in
          </Button>
        </div>
      </div>
    );
  }
}

export default Auth;
