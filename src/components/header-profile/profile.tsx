import React from 'react';
import c from 'classnames/bind';
import s from './profile.module.scss';
import Dropdown from './dropdown/dropdown';
import { IProfileInfo } from '../../interfaces/shared/profile-info.interface';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { LayoutContext } from '../../contexts/layout.context';
import { getAccessToken } from '../../helpers/cookies.helpers';
import { logout } from '../../services/auth.service';
import { ISavedSearch } from '../../interfaces/saved-searches/saved-search.interface';

interface IProps extends WithRouterProps {
  profile: IProfileInfo
  isOpenMenu: boolean
  savedSearches: ISavedSearch[]

  onSwitchMenu(): void

  onOpenPopup(name: string): void
}

interface IState {
  isOpenDropdown: boolean
}

class Profile extends React.Component<IProps, IState> {
  static contextType = LayoutContext;

  constructor(props: IProps) {
    super(props);

    this.state = { isOpenDropdown: false };
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { router } = this.props;

    if (router.pathname !== prevProps.router.pathname) {
      this.setState({ isOpenDropdown: false });
    }

    if (!getAccessToken()) {
      if (router.pathname.includes('dashboard') || router.pathname.includes('edit-listing')) {
        router.push('/');
      }
    }
  }

  onSwitchMenu = () => {
    const { isOpenDropdown } = this.state;

    this.setState({ isOpenDropdown: !isOpenDropdown });
  };

  onOpenPopup = (name: string) => {
    const { onOpenPopup } = this.props;

    onOpenPopup(name);
    this.setState({ isOpenDropdown: false });
  };

  onLogout = async () => {
    await logout(null);
    this.setState({ isOpenDropdown: false });
  };

  render(): React.ReactElement {
    const { profile, savedSearches, isOpenMenu, onSwitchMenu } = this.props;
    const { isOpenDropdown } = this.state;
    const { windowWidth } = this.context;

    return (
      <div className={s.profile__wrap}>
        <div className={s.profile} onClick={windowWidth < 768 ? onSwitchMenu : this.onSwitchMenu}>
          <i className={c(
            isOpenMenu ? 'icon-close' : 'icon-menu',
            s.profile__menuIcon,
          )}/>
          {
            profile.name && getAccessToken()
              ?
              profile.avatar
                ? <img className={s.profile__avatar} src={profile.avatar} alt=""/>
                : <div className={c(s.profile__avatar, s.profile__avatar_name)}>
                  {profile.name[0]}
                </div>
              :
              <div className={s.profile__avatar}>
                <i className="icon-profile"/>
              </div>
          }
        </div>
        {
          isOpenDropdown &&
          <Dropdown savedSearches={savedSearches} onOpenPopup={this.onOpenPopup} onLogout={this.onLogout}/>
        }
      </div>
    );
  }
}

export default withRouter(Profile);
