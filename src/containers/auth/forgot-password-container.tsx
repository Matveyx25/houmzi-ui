import React from 'react';
import Step1 from '../../components/auth/forgot-password/step-1/step-1';
import Step2 from '../../components/auth/forgot-password/step-2/step-2';
import Step3 from '../../components/auth/forgot-password/step-3/step-3';
import { changePassword, checkCode, forgotPassword } from '../../services/auth.service';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../../interfaces/auth/error-response.interface';
import { toast } from 'react-toastify';

interface IProps {
  onOpenPopup(name: string): void
}

interface IState {
  step: number
  token: string
}

export class ForgotPasswordContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { step: 1, token: null };
  }

  onForgotPassword = (email: string) => {
    forgotPassword(email)
      .then((token: string) => this.setState({ step: 2, token }))
      .catch((err: AxiosError<IErrorResponse>) =>
        toast.error(err.response?.data.message || err.message),
      );
  };

  onCheckCode = (code: string) => {
    const { token } = this.state;

    checkCode(code, token)
      .then((token: string) => this.setState({ step: 3, token }))
      .catch((err: AxiosError<IErrorResponse>) =>
        toast.error(err.response?.data.message || err.message));
  };

  onChangePassword = (password: string) => {
    const { onOpenPopup } = this.props;
    const { token } = this.state;

    changePassword(password, token)
      .then(() => {
        onOpenPopup('change-password-success');
        this.setState({ step: 1, token: '' });
      })
      .catch((err: AxiosError<IErrorResponse>) =>
        toast.error(err.response?.data.message || err.message));
  };

  render(): React.ReactElement {
    const { step } = this.state;

    switch (step) {
      case 1:
        return <Step1 onForgotPassword={this.onForgotPassword}/>;
      case 2:
        return <Step2 onCheckCode={this.onCheckCode}/>;
      case 3:
        return <Step3 onChangePassword={this.onChangePassword}/>;
    }
  }
}
