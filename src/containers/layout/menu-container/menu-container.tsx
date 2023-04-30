import React from 'react';
import s from './menu-container.module.scss';
import c from 'classnames/bind';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { Dispatch } from 'redux';
import { IRootState } from '../../../store/reducers';
import { lang } from '../../../store/selectors/lang.selectors';
import { LangActions, SetLanguage } from '../../../store/actions/lang.actions';
import Nav from '../../../components/layout/mobile-menu/nav/nav';
import MyAccountMenu from '../../../components/layout/mobile-menu/my-account-menu';
import { Button } from '../../../components/layout/mobile-menu/button/button';
import { Auth } from '../../../components/layout/mobile-menu/auth';
import { getAccessToken } from '../../../helpers/cookies.helpers';
import { logout } from '../../../services/auth.service';
import Link from 'next/link';
import { savedSearches } from '../../../store/selectors/saved-seraches.selectors';
import { ISavedSearch } from '../../../interfaces/saved-searches/saved-search.interface';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

interface IProps extends WithRouterProps {
  lang: string
  isOpenMenu: boolean
  savedSearches: ISavedSearch[]

  onOpenPopup(name: string): void

  changeLanguage(lang: string): void

  onSwitchMenu(): void
}

interface IState {
  isAuth: boolean
}

class MenuContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isAuth: undefined };
  }

  componentDidMount() {
    this.setState({ isAuth: !!getAccessToken() });
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    if (this.props !== prevProps)
      this.setState({ isAuth: !!getAccessToken() });
  }

  onChangeLanguage = (lang: string) => {
    this.props.changeLanguage(lang);
    i18n.changeLanguage(lang);
  };

  onLogout = () => logout(null).then(() => this.props.onSwitchMenu());

  redirectToSavedSearch = () => {
    const { savedSearches, router } = this.props;

    !savedSearches.length && router.push('/dashboard/saved-searches');
  };

  render() {
    const { savedSearches, isOpenMenu, onOpenPopup } = this.props;
    const { isAuth } = this.state;

    return (
      <div className={c(s.menu, isOpenMenu && s.show)}>
        <div className={s.menu__wrap}>
          <Nav/>
          {!isAuth && <Auth onOpenPopup={onOpenPopup}/>}
          {
            isAuth &&
            <>
              <Button title="Saved searches" onClick={this.redirectToSavedSearch}>
                {
                  savedSearches.length ?
                    <>
                      <Link href={`/dashboard/${savedSearches[0]?.id}`}>
                        <a className={s.savedSearchItem}>{savedSearches[0]?.name}</a>
                      </Link>
                      <Link href="/dashboard/saved-searches">
                        <a className={s.savedSearchItem}>View all</a>
                      </Link>
                    </>
                    : null
                }
              </Button>
              <MyAccountMenu/>
            </>
          }
          {isAuth && <Button title="Sign out" color="red" onClick={this.onLogout}/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  lang: lang(state),
  savedSearches: savedSearches(state),
});

const mapDispatchToProps = (dispatch: Dispatch<LangActions>) => ({
  changeLanguage: (lang: string) => dispatch(new SetLanguage(lang)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuContainer));
