import React from 'react';
import s from './category.module.scss';
import { ICard } from '../../../interfaces/help/card.interface';
import { cards } from '../../../data/help/category-cards.data';
import { ArticleList } from '../article-list/article-list';

export const Category: React.FC = () => (
  <div className={s.category}>
    <div className={s.category__header}>
      <div className={s.category__title}>
        Professionals
      </div>
    </div>
    <div className={s.category__list}>
      {
        cards.map((card: ICard) => <ArticleList key={card.title} {...card}/>)
      }
    </div>
  </div>
);
