import React from 'react';
import s from './nav.module.scss';
import { INavItem } from '../../../interfaces/layout/nav-item.interface';
import { navItems } from './nav-items.data';
import { WithTranslation, withTranslation } from 'react-i18next';
import ActiveLink from '../../shared/active-link/active-link';

interface IProps extends WithTranslation {
  country: string
}

const Nav: React.FC<IProps> = ({ country, t }) => {
  const checkCountry = (link: string): string => {
    if (link.includes('buy') || link.includes('rent'))
      return country ? `/${country}${link}` : '/homes';
    return link;
  };

  return (
    <nav className={s.nav}>
      {
        navItems
          .filter(({ text }) => text !== 'help')
          .map(({ text, link }: INavItem) => (
            <ActiveLink key={text} href={checkCountry(link)} activeClassName={s.active}>
              <a className={s.nav__item}>
                {t(`menu.${text}`)}
              </a>
            </ActiveLink>
          ))
      }
    </nav>
  );
};

export default withTranslation('header')(Nav);
