import React from 'react';
import s from './tabs.module.scss';
import ActiveLink from '../../shared/active-link/active-link';

const tabs = [
  {
    text: 'Active listings',
    link: '/dashboard/my-listings',
  }, {
    text: 'Drafts',
    link: '/dashboard/my-listings/drafts',
  },
];

export const Tabs: React.FC = () => (
  <div className={s.tabs}>
    {
      tabs.map(({ text, link }) => (
        <ActiveLink key={link} href={link} activeClassName={s.active} match>
          <a className={s.tabs__item}>
            {text}
          </a>
        </ActiveLink>
      ))
    }
  </div>
);
