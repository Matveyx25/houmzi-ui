import React from 'react';
import s from './interested.module.scss';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';
import { Card } from '../card/card';
import { IArticleCardFull } from '../../../interfaces/blog.interfaces';

interface IProps {
  articles: IArticleCardFull[]
}

const swiperConfig: ReactIdSwiperProps = {
  slidesPerView: 'auto',
  spaceBetween: 20,
};

export const Interested: React.FC<IProps> = ({ articles }) => (
  <div className={s.interested}>
    <h2 className={s.interested__title}>
      You may be interested
    </h2>
    <Swiper {...swiperConfig}>
      {
        articles.map((article: IArticleCardFull) => (
          <div key={article.id} className={s.interested__item}>
            <Card article={article}/>
          </div>
        ))
      }
    </Swiper>
  </div>
);