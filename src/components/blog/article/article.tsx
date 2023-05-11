import React, { useContext } from 'react';
import s from './article.module.scss';
import c from 'classnames';
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

  return (
    <div className={s.article}>
      <div className={s.article__header}>
        {
          windowWidth >= 1440 &&
          <>{prev && <div className={c(s.preview, s.prev)}>
            <span className={s.preview__title}>
              {prev?.title}
            </span>
            <Link href={`/blog/${stringToUrl(prev?.title)}-${prev?.id}`}>
              <div className={s.preview__arrow}>
                <i className="icon-arrow" />
              </div>
            </Link>
            {prev.avatar ?
                <img src={prev?.avatar} alt="" className={s.preview__img} /> :
                <div className={s.preview__img}>
                  <img src="https://www.svgrepo.com/show/512367/image-picture-973.svg" decoding="async" />
                </div>}
          </div>
          }</>
        }
        <div className={s.article__img}>
            <img src={article?.avatar ? 
              article.avatar : 
              "https://www.svgrepo.com/show/512367/image-picture-973.svg"} 
              alt="" className={article.avatar ? '' : s.plug}/>
        </div>
        {
          windowWidth >= 1440 &&
          <>{next &&
            <div className={c(s.preview, s.next)}>
              <span className={s.preview__title}>
                {next?.title}
              </span>
              <Link href={`/blog/${stringToUrl(next?.title)}-${next?.id}`}>
                <div className={s.preview__arrow}>
                  <i className="icon-arrow" />
                </div>
              </Link>
              {next.avatar ?
                <img src={next?.avatar} alt="" className={s.preview__img} /> :
                <div className={s.preview__img}>
                  <img src="https://www.svgrepo.com/show/512367/image-picture-973.svg" decoding="async" />
                </div>}
            </div>
          }</>
        }
      </div>
      <div className={s.article__wrap}>
        <h1 className={s.article__title}>
          {article?.title}
        </h1>
        <div className={s.article__info}>
          <Moment className={s.article__date} format="DD MMM YYYY">{article?.date}</Moment>
        </div>
      </div>
      <div className={s.article__content}>
        <p dangerouslySetInnerHTML={{__html: article?.content}}></p>
      </div>
    </div>
  );
};
