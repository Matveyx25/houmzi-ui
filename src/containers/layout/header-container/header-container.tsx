import React from 'react';
import s from './header-container.module.scss';
import c from 'classnames/bind';
import { IRootState } from '../../../store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GetProfile, ProfileActions } from '../../../store/actions/profile.actions';
import { IProfileInfo } from '../../../interfaces/shared/profile-info.interface';
import { profile } from '../../../store/selectors/profile.selectors';
import Profile from '../../../components/header-profile/profile';
import { LayoutContext } from '../../../contexts/layout.context';
import { Logo } from '../../../components/layout/logo/logo';
import { getAccessToken } from '../../../helpers/cookies.helpers';
import { savedSearches } from '../../../store/selectors/saved-seraches.selectors';
import { ISavedSearch } from '../../../interfaces/saved-searches/saved-search.interface';

interface IProps {
  profile: IProfileInfo
  isOpenMenu: boolean
  savedSearches: ISavedSearch[]

  onOpenPopup(name: string): void

  onSwitchMenu(): void

  onGetProfile(): void
}

interface IState {
  scroll: number
  isScroll: boolean
}

class HeaderContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { scroll: 0, isScroll: false };
  }

  componentDidMount(): void {
    const { onGetProfile } = this.props;

    getAccessToken() && onGetProfile();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { scroll } = this.state;
    const scrolled = window.scrollY;

    this.setState({
      scroll: scrolled,
      isScroll: scrolled > 100 && scrolled > scroll,
    });
  };

  render(): React.ReactElement {
    const { isOpenMenu } = this.props;
    const { scroll, isScroll } = this.state;

    return (
      <header className={c(
        s.header,
        scroll && s.header_scrolled,
        isScroll && s.header_hide,
        isOpenMenu && s.header_openMenu,
      )}>
        <Logo/>
        <Profile {...this.props}/>
      </header>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  profile: profile(state),
  savedSearches: savedSearches(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ProfileActions>) => ({
  onGetProfile: () => dispatch(new GetProfile()),
});

HeaderContainer.contextType = LayoutContext;

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
