import React, { ChangeEvent } from 'react';
import s from './sign-up-component.module.scss';
import { validateForm } from '../../../helpers/validate-form.helper';
import { Input } from '../../shared/input/input';
import { Button } from '../../shared/button/button';
import SocialsAuth from '../socials-auth/socials-auth';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { IRegisterData } from '../../../interfaces/auth/register-data.interface';
import { withTranslation, WithTranslation } from 'react-i18next';
import Link from 'next/link';

interface IProps extends WithTranslation {
  onOpenPopup(name: string): void

  onRegister(registerData: IRegisterData): void
}

interface IState {
  name: string
  nameError: string
  email: string
  emailError: string
  password: string
  passwordError: string
  acceptTerms: boolean
  sendOffers: boolean
  formValid: boolean
}

class SignUpComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '', nameError: '',
      email: '', emailError: '',
      password: '', passwordError: '',
      acceptTerms: false,
      sendOffers: false,
      formValid: false,
    };
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name as 'email']: value });
    this.validateField(name, value);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onRegister } = this.props;
    const { name, email, password, acceptTerms, sendOffers } = this.state;

    onRegister({ name, email, password, acceptTerms, sendOffers });
    e.preventDefault();
  };

  validateField = (name: string, value: string) => {
    let { nameError, emailError, passwordError } = this.state;

    switch (name) {
      case 'name':
        nameError = !value.trim()
          ? 'Name is required'
          : '';
        this.setState({ nameError });
        break;
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
      formValid: validateForm(nameError, emailError, passwordError),
    });
  };

  render(): React.ReactElement {
    const { onOpenPopup, t } = this.props;
    const {
      name, nameError, email, emailError, password, passwordError,
      acceptTerms, sendOffers, formValid,
    } = this.state;

    return (
      <>
        <SocialsAuth/>
        <form onSubmit={this.onSubmit}>
          <Input
            name="name"
            value={name}
            placeholder={t('name')}
            error={nameError}
            onChange={this.onChange}
          />
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
          <Checkbox
            className={s.register__terms}
            checked={acceptTerms}
            onClick={() => this.setState({ acceptTerms: !acceptTerms })}
          >
            <span>{t('accept')}</span>
            <Link href="/privacy">
              <a
                className={s.register__termsLink}
                onClick={() => onOpenPopup('')}
              >
                {t('terms')}
              </a>
            </Link>
          </Checkbox>
          <Checkbox
            checked={sendOffers}
            onClick={() => this.setState({ sendOffers: !sendOffers })}
          >
            {t('receive')}
          </Checkbox>
          <Button full color="blue" disabled={!formValid || !acceptTerms} className={s.register__btn}>
            {t('btn')}
          </Button>
          <div className={s.register__redirect}>
            <span>{t('text')}</span>
            <span
              className={s.register__link}
              onClick={() => onOpenPopup('log-in')}
            >
              {t('redirect')}
            </span>
          </div>
        </form>
      </>
    );
  }
}

export default withTranslation(['signUp', 'auth'])(SignUpComponent);
