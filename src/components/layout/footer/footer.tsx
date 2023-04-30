import React from 'react';
import s from './footer.module.scss';
import { navItems } from '../../../data/layout/nav-items.data';
import { INavItem } from '../../../interfaces/layout/nav-item.interface';
import { WithTranslation, withTranslation } from 'react-i18next';
import ActiveLink from '../../shared/active-link/active-link';
import { socials } from '../../../data/layout/socials,data';
import { ISocial } from '../../../interfaces/layout/social.intarface';

const Footer: React.FC<WithTranslation> = ({ t }) => (
  <footer className={s.footer}>
    <div className={s.footer__wrap}>
      <div className={s.socials}>
        {
          socials.map(({ icon, link }: ISocial) => (
            <a key={icon} href={link} className={s.socials__item}>
              <i className={icon}/>
            </a>
          ))
        }
      </div>
      <nav className={s.nav}>
        {
          navItems.map(({ text, link }: INavItem) => (
            <ActiveLink key={text} href={link} activeClassName={s.active}>
              <a className={s.nav__item}>
                {t(`menu.${text}`)}
              </a>
            </ActiveLink>
          ))
        }
      </nav>
      <div className={s.footer__copyright}>
        Copyright © 2019. {t('copy')}
      </div>
    </div>
  </footer>
);

export default withTranslation('footer')(Footer);
