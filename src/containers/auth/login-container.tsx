import React from 'react';
import LoginComponent from '../../components/auth/login-component/login-component';
import { ILoginData } from '../../interfaces/auth/login-data.interface';
import { login } from '../../services/auth.service';
import { ITokens } from '../../interfaces/auth/tokens.interface';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { GetProfile, ProfileActions } from '../../store/actions/profile.actions';
import { Dispatch } from 'redux';
import { setTokens } from '../../helpers/cookies.helpers';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../../interfaces/auth/error-response.interface';

interface IProps {
  onOpenPopup(name: string): void

  onClosePopup(): void

  getProfile(): void
}

const LoginContainer: React.FC<IProps> = ({ onOpenPopup, onClosePopup, getProfile }) => {
  const onLogIn = (params, rememberMe) => {
    login(params)
      .then((tokens: ITokens) => {
        setTokens(null, tokens, rememberMe);
        getProfile();
        onClosePopup();
      })
      .catch((err: AxiosError<IErrorResponse>) =>
        toast.error(err.response?.data.message || err.message)
      );
  };

  return <LoginComponent onOpenPopup={onOpenPopup} onLogIn={onLogIn}/>;
};

const mapDispatchToProps = (dispatch: Dispatch<ProfileActions>) => ({
  getProfile: () => dispatch(new GetProfile()),
});

export default connect(null, mapDispatchToProps)(LoginContainer);
