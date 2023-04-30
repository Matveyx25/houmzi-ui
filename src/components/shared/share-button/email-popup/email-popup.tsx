import React, { ChangeEvent } from 'react';
import s from './email-popup.module.scss';
import { Input } from '../../input/input';
import { Button } from '../../button/button';

interface IProps {
  sendForm(email: string): void
}

interface IState {
  email: string
  emailError: string
}

export class EmailPopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { email: '', emailError: null };
  }

  onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value: email } = e.currentTarget;

    this.setState({ email });
    this.validateField(email);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.props.sendForm(this.state.email);
    e.preventDefault();
  };

  validateField = (value: string) => {
    let emailError = !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ? 'Email is invalid'
      : '';
    this.setState({ emailError });
  };

  render() {
    const { email, emailError } = this.state;

    return (
      <form className={s.form} onSubmit={this.onSubmit}>
        <Input
          className={s.input}
          value={email}
          placeholder="Enter email to send"
          error={emailError}
          onChange={this.onChange}
        />
        <Button className={s.btn} color="blue" disabled={!!emailError}>
          Send
        </Button>
      </form>
    );
  }
}
