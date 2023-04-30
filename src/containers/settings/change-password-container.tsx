import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IChangePasswordData } from '../../interfaces/settings/change-password-data.interface';
import ChangePasswordComponent from '../../components/settings/change-password/change-password';
import { ChangePassword, ProfileActions } from '../../store/actions/profile.actions';

interface IProps {
  onChangePassword(changePasswordData: IChangePasswordData): void
}

const ChangePasswordContainer: React.FC<IProps> = (props) => <ChangePasswordComponent {...props}/>;

const mapDispatchToProps = (dispatch: Dispatch<ProfileActions>) => ({
  onChangePassword: (changePasswordData: IChangePasswordData) => dispatch(new ChangePassword(changePasswordData)),
});

export default connect(null, mapDispatchToProps)(ChangePasswordContainer);
