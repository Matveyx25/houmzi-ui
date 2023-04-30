import React from 'react';
import s from './edit-profile.module.scss';
import { validateForm } from '../../../helpers/validate-form.helper';
import { IProfileInfo } from '../../../interfaces/shared/profile-info.interface';
import { IUpdateProfileData } from '../../../interfaces/my-profile/update-profile-data.interface';
import { Input } from '../../shared/input/input';
import { Button } from '../../shared/button/button';

interface IProps {
  profile: IProfileInfo

  onUpdateProfile(updateProfileData: IUpdateProfileData): void

  onOpenPopup(name: string): void
}

interface IState {
  name: string
  nameError: string
  email: string
  emailError: string
  phone: string
  phoneError: string
  formValid: boolean
}

export class EditProfile extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '', nameError: '',
      email: '', emailError: '',
      phone: '', phoneError: '',
      formValid: false,
    };
  }

  componentDidMount() {
    const { profile } = this.props;

    this.setState({
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
    });
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { profile } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        name: profile?.name || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
      });
      this.validateField('name', profile?.name);
      this.validateField('email', profile?.email);
      this.validateField('phone', profile?.phone);
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name as 'name']: value });
    this.validateField(name, value);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onUpdateProfile } = this.props;
    const { name, email, phone } = this.state;

    onUpdateProfile({ name, email, phone });
    e.preventDefault();
  };

  validateField = (name: string, value: string) => {
    let { nameError, emailError, phoneError } = this.state;

    switch (name) {
      case 'name':
        nameError = value.trim()
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
      case 'phone':
        phoneError = value && value.trim()
          ? 'Phone is required'
          : '';
        this.setState({ phoneError });
    }

    this.setState({
      formValid: validateForm(nameError, emailError, phoneError),
    });
  };

  render(): React.ReactElement {
    const { profile, onOpenPopup } = this.props;
    const { name, nameError, email, emailError, phone, phoneError } = this.state;

    return (
      <>
        <div className={s.avatar__wrap}>
          {
            profile?.avatar
              ? <img src={profile?.avatar} alt="" className={s.avatar}/>
              : <div className={s.avatar}>
                <i className="icon-profile"/>
              </div>
          }
          <div className={s.avatar__mask}/>
          <i className="icon-edit" onClick={() => onOpenPopup('upload-avatar')}/>
        </div>
        <form className={s.form} onSubmit={this.onSubmit}>
          <Input
            name="name"
            value={name}
            placeholder="Full name"
            error={nameError}
            className={s.form__name}
            onChange={this.onChange}
          />
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            error={emailError}
            className={s.form__email}
            onChange={this.onChange}
          />
          <Input
            name="phone"
            value={phone}
            placeholder="Phone"
            error={phoneError}
            className={s.form__phone}
            onChange={this.onChange}
          />
          <Button color="blue">Edit</Button>
        </form>
      </>
    );
  }
}
