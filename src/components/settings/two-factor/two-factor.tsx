import React from 'react';
import c from 'classnames';
import s from './two-factor.module.scss';
import sSettings from '../../../../pages/dashboard/settings/settings.module.scss';
import { Input } from '../../shared/input/input';
import { countriesAndPhones, ICountriesAndPhones } from '../../../data/countries-and-phones';
import { Select } from '../select/select';

interface IProps {
  is2faEnabled: boolean

  enableTwoFactor(phone: string): void

  disableTwoFactor(): void
}

interface IState {
  selectedCountry: ICountriesAndPhones
  phone: string
  phoneValid: boolean
}

export class TwoFactor extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      phone: '',
      phoneValid: false,
      selectedCountry: null,
    };
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    this.setState({ phone: value });
    this.validateField(value);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { is2faEnabled, enableTwoFactor, disableTwoFactor } = this.props;
    const { phone } = this.state;

    if (is2faEnabled) {
      disableTwoFactor();
    } else {
      enableTwoFactor(phone);
    }
    e.preventDefault();
  };

  validateField = (value: string) => {
    const phoneValid = !!value.trim();
    this.setState({ phoneValid });
  };

  selectCountry = (option: ICountriesAndPhones) => {
    this.setState({ selectedCountry: option });
  };

  render(): React.ReactElement {
    const { is2faEnabled } = this.props;
    const { phone, selectedCountry } = this.state;

    return (
      <div className={s.container}>
        <span className={sSettings.title}>
          Two-factor authentication
        </span>
        <div className={sSettings.desc}>
          If you activate two-factor authentication, we will send a verification code via SMS, which you must enter to
          enter your account.
        </div>
        <form className={s.form} onSubmit={this.onSubmit}>
          <Select
            value={selectedCountry}
            placeholder="Select country"
            options={countriesAndPhones}
            className={s.select}
            onSelect={this.selectCountry}
          />
          <Input
            type="text"
            name="phone"
            value={phone}
            maxLength={10}
            placeholder="Your number phone"
            onChange={this.onChange}
          />
          <button className={c(sSettings.btn, sSettings.btn_blue, s.form__btn)}>
            {is2faEnabled ? 'Disconnect' : 'Connect'}
          </button>
        </form>
      </div>
    );
  }
}
