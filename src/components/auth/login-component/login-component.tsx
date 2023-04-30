import React from 'react';
import s from './login-component.module.scss';
import { validateForm } from '../../../helpers/validate-form.helper';
import { Input } from '../../shared/input/input';
import { Button } from '../../shared/button/button';
import { Checkbox } from '../../shared/checkbox/checkbox';
import SocialsAuth from '../socials-auth/socials-auth';
import { ILoginData } from '../../../interfaces/auth/login-data.interface';
import { WithTranslation, withTranslation } from 'react-i18next';

interface IProps extends WithTranslation {
  onOpenPopup(name: string): void

  onLogIn(loginData: ILoginData): void
}

interface IState {
  email: string
  emailError: string
  password: string
  passwordError: string
  rememberMe: boolean
  formValid: boolean
}

class LoginComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '', emailError: '',
      password: '', passwordError: '',
      rememberMe: false,
      formValid: false,
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name as 'email']: value });
    this.validateField(name, value);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onLogIn } = this.props;
    const { email, password, rememberMe } = this.state;

    onLogIn({ email, password, rememberMe });
    e.preventDefault();
  };

  validateField = (name: string, value: string) => {
    let { emailError, passwordError } = this.state;

    switch (name) {
      case 'email':
        emailError = !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? 'Email is invalid'
          : '';
        this.setState({ emailError });
        break;
      case 'password':
        passwordError = !value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/g)
          ? 'Password must contain numbers, upper and lower case letters and special characters'
          : '';
        this.setState({ passwordError });
        break;
    }

    this.setState({
      formValid: validateForm(emailError, passwordError),
    });
  };

  render(): React.ReactElement {
    const { onOpenPopup, t } = this.props;
    const { rememberMe, email, password, emailError, passwordError, formValid } = this.state;

    return (
      <>
        <SocialsAuth/>
        <form onSubmit={this.onSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            error={emailError}
            onChange={this.onChange}
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder={t('auth:password')}
            error={passwordError}
            onChange={this.onChange}
          />
          <div className={s.login__row}>
            <Checkbox
              checked={rememberMe}
              onClick={() => this.setState({ rememberMe: !rememberMe })}
            >
              {t('remember')}
            </Checkbox>
            <span
              className={s.login__link}
              onClick={() => onOpenPopup('forgot')}
            >
              {t('forgot')}
            </span>
          </div>
          <Button full color="blue" disabled={!formValid}>
            {t('btn')}
          </Button>
          <div className={s.login__redirect}>
            <span>{t('text')}</span>
            <span
              className={s.login__link}
              onClick={() => onOpenPopup('sign-up')}
            >
              {t('redirect')}
            </span>
          </div>
        </form>
      </>
    );
  }
}

export default withTranslation(['logIn', 'auth'])(LoginComponent);
