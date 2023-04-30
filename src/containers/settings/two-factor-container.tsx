import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TwoFactor } from '../../components/settings/two-factor/two-factor';
import { IRootState } from '../../store/reducers';
import { is2faEnabled } from '../../store/selectors/profile.selectors';
import { DisableTwoFactor, EnableTwoFactor, ProfileActions } from '../../store/actions/profile.actions';

interface IProps {
  is2faEnabled: boolean

  enableTwoFactor(phone: string): void

  disableTwoFactor(): void
}

const TwoFactorContainer: React.FC<IProps> = (props) => <TwoFactor {...props}/>;

const mapStateToProps = (state: IRootState) => ({
  is2faEnabled: is2faEnabled(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ProfileActions>) => ({
  enableTwoFactor: (phone: string) => dispatch(new EnableTwoFactor(phone)),
  disableTwoFactor: () => dispatch(new DisableTwoFactor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorContainer);
