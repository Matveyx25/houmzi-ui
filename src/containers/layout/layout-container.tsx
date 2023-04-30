import React from 'react';
import { withRouter } from 'next/router';
import HeaderContainer from './header-container/header-container';
import Footer from '../../components/layout/footer/footer';
import MobileMenuContainer from './menu-container/menu-container';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Auth } from '../../components/auth/auth';
import Head from 'next/head';
import { LayoutContext } from '../../contexts/layout.context';
import { countriesData } from '../../data/layout/countries.data';
import { Toast } from '../../components/shared/toast/toast';
import { confirm } from '../../services/auth.service';
import { ITokens } from '../../interfaces/auth/tokens.interface';
import { getAccessToken, setTokens } from '../../helpers/cookies.helpers';
import { GetProfile, ProfileActions } from '../../store/actions/profile.actions';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../../interfaces/auth/error-response.interface';
import { toast } from 'react-toastify';
import { GetSavedSearches, SavedSearchesActions } from '../../store/actions/saved-searches.actions';

interface IProps extends WithRouterProps {
  title?: string | string[]
  script?: string | string[]
  hideLayout?: boolean

  getProfile(): void

  getSavedSearches(): void
}

interface IState {
  windowWidth: number
  country: string
  isOpenMenu: boolean
  popupName: string
}

class LayoutContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      windowWidth: null,
      country: '',
      isOpenMenu: false,
      popupName: '',
    };
  }

  componentDidMount() {
    const { router, getProfile, getSavedSearches } = this.props;

    window.addEventListener('resize', this.windowResize);
    this.windowResize();

    getAccessToken() && getSavedSearches();

    if (Object.entries(router.query).length > 0) {
      const { token } = router.query;

      if (token) {
        confirm(token as string)
          .then((tokens: ITokens) => {
            setTokens(null, tokens);
            getProfile();
            this.onOpenPopup('thank-you');
          })
          .catch((err: AxiosError<IErrorResponse>) =>
            toast.error(err.response?.data.message || err.message),
          );
      }
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }: GeolocationPosition) => {
        let location: google.maps.LatLng = new google.maps.LatLng(coords.latitude, coords.longitude);
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            let country = results[0].formatted_address.split(', ').pop();
            let isEurope = countriesData.some((c: string) => c === country);

            if (isEurope) {
              this.setState({ country });
            }
          }
        });
      },
    );
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>) {
    const { windowWidth } = this.state;

    if (windowWidth !== prevState.windowWidth && windowWidth > 768) {
      this.setState({ isOpenMenu: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  onSwitchMenu = () => {
    const { isOpenMenu } = this.state;

    this.setState({ isOpenMenu: !isOpenMenu });
    document.body.style.overflow = isOpenMenu ? 'auto' : 'hidden';
  };

  onOpenPopup = (name: string = '') => {
    const { router } = this.props;
    const { popupName, isOpenMenu } = this.state;

    if (popupName === 'thank-you') {
      router.push('/');
    }
    if (isOpenMenu) {
      this.setState({ isOpenMenu: false });
    }
    this.setState({ popupName: name });
  };

  windowResize = () => this.setState({ windowWidth: window.innerWidth });

  setTitle = (): string => {
    const { title } = this.props;

    if (!title) return 'Houmzi';
    return (typeof title === 'string' ? title : title.join(' | ')) + ' | Houmzi';
  };

  setScript = (): React.ReactElement | React.ReactElement[] => {
    const { script } = this.props;

    if (!script) return;
    return typeof script === 'string'
      ? <script src={script}/>
      : script.map((str: string) => <script src={str}/>);
  };

  render(): React.ReactElement {
    const { hideLayout, children } = this.props;
    const { isOpenMenu, popupName, country, windowWidth } = this.state;

    return (
      <LayoutContext.Provider value={{ windowWidth, country }}>
        <Head>
          <title>{this.setTitle()}</title>
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDVCO65ELdkZdl8zUYLUxfYFhA9FmuU0Dw&libraries=places&libraries=geometry,drawing,places&language=en"/>
          {this.setScript()}
        </Head>

        {
          !hideLayout
            ? <>
              <HeaderContainer isOpenMenu={isOpenMenu} onSwitchMenu={this.onSwitchMenu} onOpenPopup={this.onOpenPopup}/>
              <main>{children}</main>
              <Footer/>

              <Toast/>
              <MobileMenuContainer isOpenMenu={isOpenMenu} onOpenPopup={this.onOpenPopup}
                                   onSwitchMenu={this.onSwitchMenu}/>
              <Auth popupName={popupName} onOpenPopup={this.onOpenPopup}/>
            </>
            : children
        }

      </LayoutContext.Provider>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch<ProfileActions | SavedSearchesActions>) => ({
  getProfile: () => dispatch(new GetProfile()),
  getSavedSearches: () => dispatch(new GetSavedSearches()),
});

export const Layout = withRouter(connect(null, mapDispatchToProps)(LayoutContainer));
