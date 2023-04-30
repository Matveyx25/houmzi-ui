import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Block } from '../block/block';
import { IMenuItem } from '../../../interfaces/dashboard/menu-item.interface';
import Link from 'next/link';
import { menu } from '../../../data/dashboard/menu.data';

const MyAccount: React.FC<WithTranslation> = ({ t }) => (
  <Block title="Мой аккаунт">
    {
      menu.map((menuItem: IMenuItem) => (
        <Link key={menuItem.icon} href={`/dashboard${menuItem.link}`}>
          {t(menuItem.type)}
        </Link>
      ))
    }
  </Block>
);

export default withTranslation('dashboard')(MyAccount);
