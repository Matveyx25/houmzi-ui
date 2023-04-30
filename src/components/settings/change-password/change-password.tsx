import React from 'react';
import s from '../../../../pages/dashboard/settings/settings.module.scss';
import s2 from './change-password.module.scss';
import { Input } from '../../shared/input/input';
import { Button } from '../../shared/button/button';
import { validateForm } from '../../../helpers/validate-form.helper';
import { IChangePasswordData } from '../../../interfaces/settings/change-password-data.interface';

interface IProps {
  onChangePassword(changePasswordData: IChangePasswordData): void
}

interface IState {
  oldPassword: string
  oldPasswordError: string
  newPassword: string
  newPasswordError: string
  confirmPassword: string
  confirmPasswordError: string
  formValid: boolean
}

class ChangePassword extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      oldPassword: '', oldPasswordError: '',
      newPassword: '', newPasswordError: '',
      confirmPassword: '', confirmPasswordError: '',
      formValid: false,
    };
  }

  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState({ [name as 'oldPassword']: value });
    this.validateField(name, value);
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { onChangePassword } = this.props;
    const { oldPassword, newPassword } = this.state;

    onChangePassword({ oldPassword, newPassword });
    event.preventDefault();
  };

  validateField = (name: string, value: string) => {
    const { newPassword, confirmPassword } = this.state;
    let { oldPasswordError, newPasswordError, confirmPasswordError } = this.state;

    switch (name) {
      case 'oldPassword':
        oldPasswordError = !value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/g)
          ? 'Old password must contain numbers, upper and lower case letters and special characters'
          : '';
        this.setState({ oldPasswordError });
        break;
      case 'newPassword':
        newPasswordError = !value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/g)
          ? 'New password must contain numbers, upper and lower case letters and special characters'
          : '';
        confirmPasswordError = value === confirmPassword
          ? 'Confirm password is invalid'
          : '';
        this.setState({ newPasswordError, confirmPasswordError });
        break;
      case 'confirmPassword':
        confirmPasswordError = value !== newPassword
          ? 'Confirm password is invalid'
          : '';
        this.setState({ confirmPasswordError });
        break;
    }

    this.setState({
      formValid: validateForm(oldPasswordError, newPasswordError, confirmPasswordError),
    });
  };

  render(): React.ReactElement {
    const {
      oldPassword, newPassword, confirmPassword,
      oldPasswordError, newPasswordError, confirmPasswordError, formValid,
    } = this.state;

    return (
      <div>
        <span className={s.title}>
          Change password
        </span>
        <form onSubmit={this.onSubmit}>
          <Input
            type="password"
            name="oldPassword"
            value={oldPassword}
            error={oldPasswordError}
            placeholder="Old password"
            className={s2.input}
            onChange={this.onChange}
          />
          <Input
            type="password"
            name="newPassword"
            value={newPassword}
            error={newPasswordError}
            placeholder="New password"
            className={s2.input}
            onChange={this.onChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            error={confirmPasswordError}
            placeholder="Confirm password"
            className={s2.input}
            onChange={this.onChange}
          />
          <Button color="blue" disabled={!formValid} className={s2.btn}>
            Change
          </Button>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
