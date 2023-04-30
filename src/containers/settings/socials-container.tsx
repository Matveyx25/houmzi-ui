import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DeleteAccount, ProfileActions } from '../../store/actions/profile.actions';
import { Socials } from '../../components/settings/socials/socials';
import { Popup } from '../../components/shared/popup/popup';
import DeleteAccountComponent from '../../components/settings/delete-account/delete-account';

interface IProps {
  deleteAccount(): void
}

interface IState {
  isOpen: boolean
}

class SocialsContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isOpen: false };
  }

  onOpenPopup = () => {
    this.setState({ isOpen: true });
  };

  onClosePopup = () => {
    this.setState({ isOpen: false });
  };

  deleteAccount = () => {
    const { deleteAccount } = this.props;

    deleteAccount();
    this.onClosePopup();
  };

  render(): React.ReactElement {
    const { isOpen } = this.state;

    return (
      <>
        <Socials onOpenPopup={this.onOpenPopup}/>

        <Popup
          title="Are you sure you want to delete your account?"
          visible={isOpen}
          onClose={this.onClosePopup}
        >
          <DeleteAccountComponent deleteAccount={this.deleteAccount}/>
        </Popup>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ProfileActions>) => ({
  deleteAccount: () => dispatch(new DeleteAccount()),
});

export default connect(null, mapDispatchToProps)(SocialsContainer);
