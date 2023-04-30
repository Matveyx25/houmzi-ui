import { IMenuItem } from '../../interfaces/dashboard/menu-item.interface';

export const menu: IMenuItem[] = [
  {
    icon: 'icon-search',
    type: 'savedSearches',
    link: '/saved-searches',
  },
  {
    icon: 'icon-home',
    type: 'savedHomes',
    link: '/saved-homes',
  },
  {
    icon: 'icon-profile',
    type: 'profile',
    link: '/profile',
  },
  {
    icon: 'icon-message',
    type: 'messages',
    link: '/messages',
  },
  {
    icon: 'icon-settings',
    type: 'settings',
    link: '/settings',
  },
  {
    icon: 'icon-subscriptions',
    type: 'tariffs',
    link: '/tariffs',
  },
];
