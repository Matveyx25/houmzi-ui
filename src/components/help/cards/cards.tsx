import React from 'react';
import s from './cards.module.scss';
import c from 'classnames/bind';
import Link from 'next/link';
import { cards } from '../../../data/help/cards.data';
import { IArticle, ICard } from '../../../interfaces/help/card.interface';

export const Cards: React.FC = () => (
  <div className={s.cards}>
    {
      cards.map(({ icon, title, articles }: ICard) => (
        <div key={title} className={s.card}>
          <div className={s.card__label}>
            <i className={icon}/>
          </div>
          <div className={s.card__title}>
            {title}
          </div>
          {
            articles.slice(0, 3).map(({ title, link }: IArticle) => (
              <Link key={title} href={link}>
                <a className={s.card__link}>
                  {title}
                </a>
              </Link>
            ))
          }
          {
            articles.length > 3 &&
            <Link href="/help/category">
              <a className={c(s.card__link, s.card__link_viewAll)}>
                View all
              </a>
            </Link>
          }
        </div>
      ))
    }
  </div>
);
