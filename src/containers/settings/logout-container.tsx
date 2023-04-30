import React from 'react';
import LogoutComponent from '../../components/settings/logout/logout';
import { logout } from '../../services/auth.service';

export const LogoutContainer: React.FC = () => {
  const onLogout = async () => await logout(null);

  return <LogoutComponent onLogout={onLogout}/>;
};
