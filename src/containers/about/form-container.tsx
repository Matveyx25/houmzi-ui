import React, { ChangeEvent } from 'react';
import { IFormData } from '../../interfaces/about/form-data.interface';
import { Form } from '../../components/about/form/form';
import { sendForm } from '../../services/about.service';
import { validateForm } from '../../helpers/validate-form.helper';

interface IState {
  name: string
  nameError: string
  email: string
  emailError: string
  reason: string
  reasonError: string
  message: string
  messageError: string
  formValid: boolean
}

export class FormContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: '', nameError: '',
      email: '', emailError: '',
      reason: '', reasonError: '',
      message: '', messageError: '',
      formValid: false,
    };
  }

  sendForm = (formData: IFormData) => sendForm(formData).then(() => this.setState({
    name: '', nameError: '',
    email: '', emailError: '',
    reason: '', reasonError: '',
    message: '', messageError: '',
    formValid: false,
  }));

  onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name as 'name']: value });
    this.validateField(name, value);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, email, reason, message } = this.state;

    this.sendForm({ name, email, reason, message });
    e.preventDefault();
  };

  validateField = (name: string, value: string) => {
    let { nameError, emailError, reasonError, messageError } = this.state;

    switch (name) {
      case 'name':
        nameError = !value.trim().length
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
      case 'reason':
        reasonError = !value.trim().length
          ? 'Reason is required'
          : '';
        this.setState({ reasonError });
        break;
      case 'message':
        messageError = !value.trim().length
          ? 'Message is required'
          : '';
        this.setState({ messageError });
        break;
    }

    this.setState({
      formValid: validateForm(nameError, emailError, reasonError, messageError),
    });
  };

  render(): React.ReactElement {
    return <Form {...this.state} onChange={this.onChange} onSubmit={this.onSubmit}/>;
  }
}
