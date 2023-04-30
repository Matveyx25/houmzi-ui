import { ITariff } from '../../interfaces/subscriptions/tariff.interface';

export const tariffs: ITariff[] = [
  {
    id: 0,
    img: '/images/tariffs/basic.svg',
    title: 'Basic',
    desc: 'A simple start for everyone',
    price: 0,
    options: [
      'Limit listings: 2',
      'No analytics',
      'No badge',
    ],
    isPopular: false,
  },
  {
    id: 1,
    img: '/images/tariffs/standard.svg',
    title: 'Standard',
    desc: 'For single agent',
    price: 10,
    options: [
      'Limit listings: 5',
      'No analytics',
      'Badge of confirm',
    ],
    isPopular: true,
  },
  {
    id: 2,
    img: '/images/tariffs/premium.svg',
    title: 'Premium',
    desc: 'Solution for big company',
    price: 15,
    options: [
      'Unlimited listings',
      'Available analytics',
      'Badge of confirm',
      'Opportunity to make team',
    ],
    isPopular: false,
  },
];
