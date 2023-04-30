import React from 'react';
import s from '../forgot-password.module.scss';
import { Input } from '../../../shared/input/input';
import { Button } from '../../../shared/button/button';
import { WithTranslation, withTranslation } from 'react-i18next';

interface IProps extends WithTranslation {
  onForgotPassword(email: string): void
}

interface IState {
  email: string
  emailError: string
}

class Step1 extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { email: '', emailError: '' };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: email } = e.currentTarget;

    this.setState({ email });
    this.validateField(email);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onForgotPassword } = this.props;
    const { email } = this.state;

    onForgotPassword(email);
    e.preventDefault();
  };

  validateField = (value: string) => {
    const emailError = !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ? 'Email is invalid'
      : '';
    this.setState({ emailError });
  };

  render(): React.ReactElement {
    const { t } = this.props;
    const { email, emailError } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={s.subtitle}>
          {t('step1.subtitle')}
        </div>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          error={emailError}
          onChange={this.onChange}
        />
        <Button color="blue" full disabled={!!emailError} className={s.btn}>
          {t('step1.btn')}
        </Button>
      </form>
    );
  }
}

export default withTranslation('forgot')(Step1);
