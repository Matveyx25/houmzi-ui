import React from 'react';
import s from './article-list.module.scss';
import Link from 'next/link';
import { IArticle, ICard } from '../../../interfaces/help/card.interface';

export const ArticleList: React.FC<ICard> = ({ title, articles }) => (
  <div className={s.list}>
    <div className={s.list__title}>
      {title}
    </div>
    {
      articles.map(({ title, link }: IArticle) => (
        <Link key={title} href={link}>
          <a className={s.list__link}>
            {title}
          </a>
        </Link>
      ))
    }
  </div>
);
