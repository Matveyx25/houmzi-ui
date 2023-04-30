import React, { ChangeEvent } from 'react';
import s from './form.module.scss';
import { Input } from '../../shared/input/input';
import { Button } from '../../shared/button/button';

interface IProps {
  name: string
  nameError: string
  email: string
  emailError: string
  reason: string
  reasonError: string
  message: string
  messageError: string
  formValid: boolean

  onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void

  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}

export const Form: React.FC<IProps> = ({
                                         name, nameError, email, emailError, reason,
                                         reasonError, message, formValid, onChange, onSubmit,
                                       }) => {
  return (
    <div className={s.form__wrap}>
      <div className={s.form__title}>
        Contact
      </div>
      <form className={s.form} onSubmit={onSubmit}>
        <Input
          name="name"
          value={name}
          placeholder="Name"
          error={nameError}
          onChange={onChange}
        />
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          error={emailError}
          onChange={onChange}
        />
        <Input
          className={s.form__full}
          name="reason"
          value={reason}
          placeholder="Reason"
          error={reasonError}
          onChange={onChange}
        />
        <textarea
          className={s.form__full}
          name="message"
          value={message}
          placeholder="Message"
          onChange={onChange}
        />
        <Button color="blue" className={s.form__btn} disabled={!formValid}>
          Send
        </Button>
      </form>
    </div>
  );
};
