import React, { ChangeEvent } from 'react';
import s from './offer-popup.module.scss';
import c from 'classnames/bind';
import { Input } from '../../shared/input/input';
import { Button } from '../../shared/button/button';
import { validateForm } from '../../../helpers/validate-form.helper';
import { sendOffer } from '../../../services/search-listing.service';
import { IUser } from '../../../interfaces/buy/user.interface';

interface IProps {
  user: IUser
}

interface IState {
  name: string
  nameError: string
  phone: string
  phoneError: string
  email: string
  emailError: string
  suggestedPrice: string
  suggestedPriceError: string
  message: string
  formValid: boolean
}

export class OfferPopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '', nameError: '',
      phone: '', phoneError: '',
      email: '', emailError: '',
      suggestedPrice: '', suggestedPriceError: '',
      message: '', formValid: false,
    };
  }

  onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name as 'name']: value });
    this.validateField(name, value);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { user } = this.props;
    const { name, phone, email, suggestedPrice, message } = this.state;

    sendOffer({ name, phone, email, suggestedPrice, message }, user.id).then(() =>
      this.setState({
        name: '', nameError: '',
        phone: '', phoneError: '',
        email: '', emailError: '',
        suggestedPrice: '', suggestedPriceError: '',
        message: '', formValid: false,
      }));
    e.preventDefault();
  };

  validateField = (name: string, value: string) => {
    let { nameError, phoneError, emailError, suggestedPriceError } = this.state;

    switch (name) {
      case 'name':
        nameError = !value.trim().length
          ? 'Name is required'
          : '';
        this.setState({ nameError });
        break;
      case 'phone':
        phoneError = !value.trim().length
          ? 'Phone is required'
          : '';
        this.setState({ phoneError });
        break;
      case 'email':
        emailError = !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? 'Email is invalid'
          : '';
        this.setState({ emailError });
        break;
      case 'suggestedPriceError':
        nameError = !value.trim().length
          ? 'Suggested price is required'
          : '';
        this.setState({ suggestedPriceError });
        break;
    }

    this.setState({
      formValid: validateForm(nameError, phoneError, emailError, suggestedPriceError),
    });
  };


  render() {
    const { user } = this.props;
    const {
      name, nameError, phone, phoneError, email, emailError,
      suggestedPrice, suggestedPriceError, message, formValid,
    } = this.state;

    return (
      <div className={s.offer}>
        <p className={c(s.offer__text, s.offer__text_top)}>
          Select the agent to whom you want to send an offer
        </p>
        <div className={s.offer__users}>
          <div className={s.users}>
            <div className={s.user}>
              {
                user?.avatar
                  ? <img src={user?.avatar} alt="" className={s.user__avatar}/>
                  : <div className={s.user__avatar}>
                    <i className="icon-profile"/>
                  </div>
              }
              <div className={s.user__info}>
                <span className={s.user__name}>{user?.name}</span>
                {
                  user?.rate
                    ? <span className={s.user__rate}>
                        <i className="icon-star2"/>
                        <span className={s.user__text}>{user?.rate}/5&nbsp;</span>
                        <span className={c(s.user__text, s.card__text_orange)}>({user?.reviewsCount})</span>
                      </span>
                    : null
                }
                {
                  user?.phone &&
                  <span className={s.user__text}>{user?.phone}</span>
                }
                {
                  user?.email &&
                  <span className={s.user__text}>{user?.email}</span>
                }
              </div>
            </div>
          </div>
        </div>
        <form className={s.form} onSubmit={this.onSubmit}>
          <Input
            name="name"
            value={name}
            placeholder="Name"
            error={nameError}
            onChange={this.onChange}
          />
          <Input
            name="phone"
            value={phone}
            placeholder="Phone"
            error={phoneError}
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
            type="number"
            name="suggestedPrice"
            value={suggestedPrice}
            placeholder="Suggested price"
            error={suggestedPriceError}
            onChange={this.onChange}
          />
          <textarea
            className={c(s.form__textarea, s.form__full)}
            name="message"
            value={message}
            placeholder="Message"
            onChange={this.onChange}
          />
          <Button color="blue" className={s.form__btn} disabled={!formValid}>
            Send
          </Button>
        </form>
        <p className={c(s.offer__text, s.offer__text_bottom)}>
          By pressing Contact, you agree our Terms and conditions and Privacy politics
        </p>
      </div>
    );
  }
}
