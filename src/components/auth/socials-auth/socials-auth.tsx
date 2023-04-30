import { Component, ReactElement } from 'react';
import c from 'classnames/bind';
import s from './socials-auth.module.scss';
import { ISocialButton } from '../../../interfaces/auth/social-button.interface';
import { socialButtons } from '../../../data/auth/social-buttons.data';
import { withTranslation, WithTranslation } from 'react-i18next';
import Link from 'next/link';
import { setCookie } from '../../../helpers/cookies.helpers';

class SocialsAuth extends Component<WithTranslation> {
  componentDidMount() {
    setCookie(null, 'beforeSocAuth', location.href);
  }

  render(): ReactElement {
    const { t } = this.props;

    return (
      <>
        <div className={s.socials}>
          {
            socialButtons.map(({ icon, className, link }: ISocialButton) => (
              <Link href={link}>
                <i key={icon} className={c(icon, s.socials__icon, s[className])}/>
              </Link>
            ))
          }
        </div>
        <div className={s.divider}>
          {t('divider')}
        </div>
      </>
    );
  }
}

export default withTranslation('auth')(SocialsAuth);
