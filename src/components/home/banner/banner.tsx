import React from 'react';
import s from './banner.module.scss';
import { Button } from '../../shared/button/button';
import { withTranslation, WithTranslation } from 'react-i18next';
import { GooglePlacesAutocomplete } from '../../shared/google-places-autocomplete/google-places-autocomplete';
import { withRouter } from 'next/router';
import { compose } from 'redux';
import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { stringToUrl } from '../../../helpers/url-parser.helper';
import { LayoutContext } from '../../../contexts/layout.context';

interface IProps extends WithTranslation, WithRouterProps {
}

interface IState {
  search: string
}

class Banner extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { search: '' };
  }

  onChange = (search: string) => {
    this.setState({ search });
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { router } = this.props;
    const { search } = this.state;
    const location = stringToUrl(search);

    router.push(`/homes/${location}`);
    e.preventDefault();
  };

  render(): React.ReactElement {
    const { t } = this.props;
    const { search } = this.state;
    const { windowWidth } = this.context;

    return (
      <div className={s.banner}>
        <div className={s.banner__wrap}>
          <img
            className={s.banner__img}
            src={windowWidth >= 600 ? '/images/home/main.svg' : '/images/home/main-mobile.svg'}
            alt=""
          />
          <div className={s.banner__content}>
            <h1 className={s.banner__title}>
              {t('banner.title')}
            </h1>
            <div className={s.banner__subtitle}>
              {t('banner.subtitle')}
            </div>
            <Link href="/homes">
              <Button className={s.banner__btn}>
                <i className="icon-pin"/>
                {t('banner.btn')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Banner.contextType = LayoutContext;

export default compose(
  withTranslation('home'),
  withRouter,
)(Banner);
