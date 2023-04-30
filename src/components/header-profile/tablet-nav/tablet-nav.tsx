import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { INavItem } from '../../../interfaces/layout/nav-item.interface';
import { navItems } from '../../layout/nav/nav-items.data';
import { Block } from '../block/block';
import Link from 'next/link';

const TabletNav: React.FC<WithTranslation> = ({ t }) => (
  <Block>
    {
      navItems.map((navItem: INavItem) => (
        <Link key={navItem.link} href={navItem.link}>
          {t(`menu.${navItem.text}`)}
        </Link>
      ))
    }
  </Block>
);

export default withTranslation('header')(TabletNav);
