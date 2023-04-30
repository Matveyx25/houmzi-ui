import React, { useContext, useEffect } from 'react';
import s from './article.module.scss';
import c from 'classnames/bind';
import Moment from 'react-moment';
import { IArticle, IArticleCardFull, IAuthor } from '../../../interfaces/blog.interfaces';
import { LayoutContext } from '../../../contexts/layout.context';
import Link from 'next/link';
import { stringToUrl } from '../../../helpers/url-parser.helper';

interface IProps {
  article: IArticle,
  nearbyArticles: { prev: IArticleCardFull, next: IArticleCardFull }
}

export const Article: React.FC<IProps> = ({ article, nearbyArticles }) => {
  const { windowWidth } = useContext(LayoutContext);

  const { prev, next } = nearbyArticles

  const parseText = (text: string) => text?.split('\n')
    .map((str: string, i: number) => str ? <p key={i}>{str}</p> : <br key={i} />);

  return (
    <div className={s.article}>
      <div className={s.article__header}>
        {
          windowWidth >= 1440 &&
          <>{prev && <div className={c(s.preview, s.prev)}>
            <span className={s.preview__title}>
              {prev?.title}
            </span>
            <Link href={`/blog/${stringToUrl(prev?.title)}/${prev?.id}`}>
              <div className={s.preview__arrow}>
                <i className="icon-arrow" />
              </div>
            </Link>
            <img src={prev?.avatar} alt="" className={s.preview__img} />
          </div>
          }</>
        }
        <img src={article?.avatar} alt="Avatar" className={s.article__img} />
        {
          windowWidth >= 1440 &&
          <>{next &&
            <div className={c(s.preview, s.next)}>
              <span className={s.preview__title}>
                {next?.title}
              </span>
              <Link href={`/blog/${stringToUrl(next?.title)}/${next?.id}`}>
                <div className={s.preview__arrow}>
                  <i className="icon-arrow" />
                </div>
              </Link>
              <img src={next?.avatar} alt="" className={s.preview__img} />
            </div>
          }</>
        }
      </div>
      <div className={s.article__wrap}>
        <h1 className={s.article__title}>
          {article?.title}
        </h1>
        <div className={s.article__info}>
          {/* <img src={(article.author as IAuthor)?.avatar} alt="" className={s.article__avatar}/>
          <div className={s.article__name}>
            {(article.author as IAuthor)?.name}
          </div> */}
          <Moment className={s.article__date} format="DD MMM YYYY">{article?.date}</Moment>
        </div>
      </div>
      <div className={s.article__content}>
        {parseText(article?.content)}
      </div>
    </div>
  );
};
