import React from 'react';
import SignUpComponent from '../../components/auth/sign-up-component/sign-up-component';
import { IRegisterData } from '../../interfaces/auth/register-data.interface';
import { register } from '../../services/auth.service';
import { toast } from 'react-toastify';

interface IProps {
  onOpenPopup(name: string): void
}

const SignUpContainer: React.FC<IProps> = ({ onOpenPopup }) => {
  const onRegister = (registerData: IRegisterData) => {
    register(registerData)
      .then(() => onOpenPopup('register-success'))
      .catch((err) => toast.error(err.response?.data.message || err.message));
  };

  return <SignUpComponent onOpenPopup={onOpenPopup} onRegister={onRegister}/>;
};

export default SignUpContainer;
