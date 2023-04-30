import React, { ChangeEvent } from 'react';
import s from './form.module.scss';
import { Button } from '../../shared/button/button';
import { Input } from '../../shared/input/input';

interface IProps {
  name: string
  nameError: string
  email: string
  emailError: string
  message: string
  formValid: boolean

  onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void

  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}

export const Form: React.FC<IProps> = ({
                                         name, nameError, email, emailError,
                                         message, formValid, onChange, onSubmit,
                                       }) => (
  <div className={s.form__wrap}>
    <div className={s.form__title}>
      Did not find an answer to your question? Contact us
    </div>
    <form className={s.form} onSubmit={onSubmit}>
      <Input
        name="name"
        value={name}
        placeholder="Name"
        error={nameError}
        className={s.form__input}
        onChange={onChange}
      />
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        error={emailError}
        className={s.form__input}
        onChange={onChange}
      />
      <textarea
        name="message"
        value={message}
        placeholder="Message"
        className={s.form__textarea}
        onChange={onChange}
      />
      <Button color="blue" disabled={!formValid} className={s.form__btn}>
        Send
      </Button>
    </form>
  </div>
);
