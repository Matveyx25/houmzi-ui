import React, { useContext } from 'react';
import s from './nav.module.scss';
import { withTranslation, WithTranslation } from 'react-i18next';
import { INavItem } from '../../../../interfaces/layout/nav-item.interface';
import { navItems } from '../../nav/nav-items.data';
import Link from 'next/link';
import { LayoutContext } from '../../../../contexts/layout.context';

const Nav: React.FC<WithTranslation> = ({ t }) => {
  const { country } = useContext(LayoutContext);

  const checkCountry = (link: string): string => {
    if (link.includes('buy') || link.includes('rent'))
      return country ? `/${country}${link}` : '/homes';
    return link;
  };

  return (
    <nav className={s.nav}>
      {
        navItems.map((navItem: INavItem) => (
          <Link href={checkCountry(navItem.link)} key={navItem.link}>
            <a className={s.nav__item}>
              <img src={navItem.img} alt="" className={s.nav__img}/>
              <span className={s.nav__text}>
                  {t(`menu.${navItem.text}`)}
                </span>
            </a>
          </Link>
        ))
      }
    </nav>
  );
};

export default withTranslation('header')(Nav);
