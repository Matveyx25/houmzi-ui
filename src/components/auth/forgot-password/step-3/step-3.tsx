import React from 'react';
import s from '../forgot-password.module.scss';
import { Input } from '../../../shared/input/input';
import { Button } from '../../../shared/button/button';
import { validateForm } from '../../../../helpers/validate-form.helper';
import { WithTranslation, withTranslation } from 'react-i18next';

interface IProps extends WithTranslation {
  onChangePassword(password: string): void
}

interface IState {
  password: string
  passwordError: string
  confirmPassword: string
  confirmPasswordError: string
  formValid: boolean
}

class Step3 extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      password: '', passwordError: '',
      confirmPassword: '', confirmPasswordError: '',
      formValid: false,
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name as 'password']: value });
    this.validateField(name, value);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onChangePassword } = this.props;
    const { password } = this.state;

    onChangePassword(password);
    e.preventDefault();
  };

  validateField = (name: string, value: string) => {
    const { password, confirmPassword } = this.state;
    let { passwordError, confirmPasswordError } = this.state;

    switch (name) {
      case 'password':
        passwordError = !value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/g)
          ? 'Password must contain numbers, upper and lower case letters and special characters'
          : '';
        confirmPasswordError = value === confirmPassword
          ? 'Confirm password is invalid'
          : '';
        this.setState({ passwordError, confirmPasswordError });
        break;
      case 'confirmPassword':
        confirmPasswordError = value === password
          ? 'Confirm password is invalid'
          : '';
        this.setState({ confirmPasswordError });
        break;
    }

    this.setState({
      formValid: validateForm(passwordError, confirmPasswordError),
    });
  };

  render(): React.ReactElement {
    const { t } = this.props;
    const { password, confirmPassword, passwordError, confirmPasswordError, formValid } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={s.subtitle}>
          {t('step3.subtitle')}
        </div>
        <Input
          type="password"
          name="password"
          value={password}
          placeholder={t('step3.newPassword')}
          error={passwordError}
          onChange={this.onChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder={t('step3.confirmPassword')}
          error={confirmPasswordError}
          onChange={this.onChange}
        />
        <Button color="blue" full disabled={!formValid} className={s.btn}>
          {t('step3.btn')}
        </Button>
      </form>
    );
  }
}

export default withTranslation('forgot')(Step3);
