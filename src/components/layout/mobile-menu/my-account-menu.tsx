import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { IMenuItem } from '../../../interfaces/dashboard/menu-item.interface';
import Link from 'next/link';
import { menu } from '../../../data/dashboard/menu.data';
import { Button } from './button/button';

const MyAccountMenu: React.FC<WithTranslation> = ({ t }) => (
  <Button title="My account">
    {
      menu
        .filter(({ type }) => type !== 'savedSearches')
        .map((menuItem: IMenuItem) => (
          <Link key={menuItem.icon} href={`/dashboard${menuItem.link}`}>
            {t(menuItem.type)}
          </Link>
        ))
    }
  </Button>
);

export default withTranslation('dashboard')(MyAccountMenu);
