import React from 'react';
import { connect } from 'react-redux';
import Info from '../../components/my-profile/info/info';
import { isLoadAvatar, isLoadData, profile } from '../../store/selectors/profile.selectors';
import { EditProfile } from '../../components/my-profile/edit-profile/edit-profile';
import AvatarEditor from '../../components/my-profile/avatar-editor/avatar-editor';
import { Dispatch } from 'redux';
import { ProfileActions, UpdateProfile, UploadAvatar } from '../../store/actions/profile.actions';
import { IUpdateProfileData } from '../../interfaces/my-profile/update-profile-data.interface';
import UploadAvatarComponent from '../../components/my-profile/upload-avatar/upload-avatar';
import { countReviews } from '../../store/selectors/reviews.selectors';
import { Popup } from '../../components/shared/popup/popup';
import { IProfileInfo } from '../../interfaces/shared/profile-info.interface';
import { IRootState } from '../../store/reducers';

interface IProps {
  profile: IProfileInfo
  countReviews: number
  isLoadData: boolean
  isLoadAvatar: boolean

  onUpdateProfile(updateProfileData: IUpdateProfileData): void

  onUploadAvatar(blob: Blob): void
}

interface IState {
  popupName: string
  file: File | null
}

class InfoContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { popupName: '', file: null };
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { isLoadData, isLoadAvatar } = this.props;

    if (isLoadData !== prevProps.isLoadData || isLoadAvatar !== prevProps.isLoadAvatar) {
      this.setState({ popupName: '' });
    }
  }

  onOpenPopup = (popupName: string) => {
    this.setState({ popupName });
  };

  onClosePopup = () => {
    this.setState({ popupName: '' });
  };

  onUploadAvatar = (file: File) => {
    this.setState({ file });
    this.onOpenPopup('avatar-editor');
  };

  onUploadToBackend = (blob: Blob) => {
    const { onUploadAvatar } = this.props;

    onUploadAvatar(blob);
  };

  render(): React.ReactElement {
    const { popupName, file } = this.state;

    return (
      <>
        <Info {...this.props} onOpenPopup={this.onOpenPopup}/>

        <Popup width={60} title="Edit information" visible={popupName === 'edit'} onClose={this.onClosePopup}>
          <EditProfile {...this.props} onOpenPopup={this.onOpenPopup}/>
        </Popup>

        <Popup width={45.3} visible={popupName === 'upload-avatar'} onClose={this.onClosePopup}>
          <UploadAvatarComponent onUploadAvatar={this.onUploadAvatar}/>
        </Popup>

        <Popup width={53.5} visible={popupName === 'avatar-editor'} onClose={this.onClosePopup}>
          <AvatarEditor file={file} onUploadToBackend={this.onUploadToBackend}/>
        </Popup>
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  profile: profile(state),
  countReviews: countReviews(state),
  isLoadData: isLoadData(state),
  isLoadAvatar: isLoadAvatar(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ProfileActions>) => ({
  onUpdateProfile: (updateProfileData: IUpdateProfileData) => dispatch(new UpdateProfile(updateProfileData)),
  onUploadAvatar: (blob: Blob) => dispatch(new UploadAvatar(blob)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);
