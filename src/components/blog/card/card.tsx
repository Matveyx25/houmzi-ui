import React from 'react';
import s from './card.module.scss';
import Link from 'next/link';
import Moment from 'react-moment';
import { stringToUrl } from '../../../helpers/url-parser.helper';
import { IArticleCardFull, IAuthor } from '../../../interfaces/blog.interfaces';

interface IProps {
  article: IArticleCardFull
  authors?: IAuthor[]
}

export const Card: React.FC<IProps> = ({ article, authors }) => {
  const getAuthor = (author: number | IAuthor): string => {
    if (typeof author === 'number')
      return authors.find((a: IAuthor) => a.id === author as number).name;
    return author.name;
  };

  return (
    <div className={s.card}>
      <Link href={`/blog/${stringToUrl(article?.title)}-${article?.id}`}>
      {article.avatar ?
          <img src={article?.avatar} alt="" className={s.card__img} /> :
          <div className={s.card__img}>
            <img src="https://www.svgrepo.com/show/512367/image-picture-973.svg" decoding="async" />
          </div>}
      </Link>
      <Link href={`/blog/${stringToUrl(article?.title)}/${article?.id}`}>
        <div className={s.card__title}>
          {article?.title}
        </div>
      </Link>
      <div className={s.card__desc}>
        {`${article?.content.slice(0, 100)}...`}
      </div>
      <div className={s.card__author}>
        {/* <span>by</span> {getAuthor(article.author)} */}
      </div>
      <Moment className={s.card__date} format="DD MMM YYYY">{article?.date}</Moment>
    </div>
  );
};
