import React from 'react';
import { IFormData } from '../../interfaces/help/form-data.interface';
import { Form } from '../../components/help/form/form';
import { validateForm } from '../../helpers/validate-form.helper';
import { sendForm } from '../../services/help.service';

interface IState {
  name: string
  nameError: string
  email: string
  emailError: string
  message: string
  formValid: boolean
}

export class FormContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: '', nameError: '',
      email: '', emailError: '',
      message: '',
      formValid: false,
    };
  }

  sendForm = (formData: IFormData) => {
    sendForm(formData).then(() => this.setState({
      name: '', nameError: '',
      email: '', emailError: '',
      message: '',
      formValid: false,
    }));
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name as 'email']: value });
    this.validateField(name, value);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, email, message } = this.state;

    this.sendForm({ name, email, message });
    e.preventDefault();
  };

  validateField = (name: string, value: string) => {
    let { nameError, emailError } = this.state;

    switch (name) {
      case 'name':
        nameError = !value.trim()
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
    }

    this.setState({
      formValid: validateForm(nameError, emailError),
    });
  };

  render(): React.ReactElement {
    return <Form {...this.state} onChange={this.onChange} onSubmit={this.onSubmit}/>;
  }
}
