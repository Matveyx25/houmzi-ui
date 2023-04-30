import React from 'react';
import c from 'classnames';
import s from './menu.module.scss';
import { IMenuItem } from '../../../interfaces/dashboard/menu-item.interface';
import { menu } from '../../../data/dashboard/menu.data';
import { WithTranslation, withTranslation } from 'react-i18next';
import ActiveLink from '../../shared/active-link/active-link';

const Menu: React.FC<WithTranslation> = ({ t }) => (
  <div className={s.menu}>
    {
      menu.map(({ icon, type, link }: IMenuItem) => (
        <ActiveLink key={icon} href={`/dashboard${link}`} activeClassName={s.active}>
          <a className={s.menu__item}>
            <i className={c(icon, s.menu__icon)}/>
            <div className={s.menu__text}>
              {t(type)}
            </div>
          </a>
        </ActiveLink>
      ))
    }
  </div>
);

export default withTranslation('dashboard')(Menu);
