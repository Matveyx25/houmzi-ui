import React from 'react';
import s from './banner.module.scss';
import Link from 'next/link';
import { IArticleCard } from '../../../interfaces/blog.interfaces';
import { stringToUrl } from '../../../helpers/url-parser.helper';

interface IProps {
  articles: IArticleCard[]
}


export const Banner: React.FC<IProps> = ({ articles }) => (
  <div className={s.banner}>
    <h1 className={s.banner__title}>
      Блог
    </h1>
    <div className={s.banner__list}>
      {
        articles?.map((article: IArticleCard) => (
          <Link key={article.id} href={`/blog/${stringToUrl(article?.title)}-${article?.id}`}>
            <div className={article.avatar ? s.card : s.plugCard}>
              <img src={article.avatar || "https://www.svgrepo.com/show/512367/image-picture-973.svg"} alt="" className={s.card__img} />
              <div className={s.card__title}>
                {article.title}
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  </div>
);
