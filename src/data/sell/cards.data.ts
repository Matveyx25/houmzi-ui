import { ICard } from '../../interfaces/sell/card.interface';

export const cards: ICard[] = [
  {
    img: '/images/sell/agents.svg',
    title: 'Work with an agent',
    text: 'Our premium agents are among the best in the business. Learn how to ',
    link: 'pick the right one for you',
    btn: {
      link: '/agents',
      text: 'Search now',
    },
  },
  {
    img: '/images/sell/sell.svg',
    title: 'Sell it yourself',
    text: 'Reach the largest audience of shoppers with a free listing. Start by le arning ',
    link: 'how to “sell for sale by owner”',
    desc: 'You can place two listings for free',
    btn: {
      link: '/dashboard/my-listings',
      text: 'Create a listing',
    },
  },
];
