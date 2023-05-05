import React from 'react';
import s from './filters.module.scss';
import c from 'classnames';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';
import { ICategory } from '../../../interfaces/blog.interfaces';

interface IProps {
  categories: ICategory[]
  categoryId: string

  changeCategoryId(categoryId: string): void
}

const swiperConfig: ReactIdSwiperProps = {
  slidesPerView: 'auto',
  spaceBetween: 30,
};

const getFilters = (categories, categoryId, changeCategoryId) => categories.map(({ id, name }) => (
  <div
    key={id}
    className={c(s.filters__item, categoryId === id && s.active)}
    onClick={() => changeCategoryId(id)}
  >
    {name}
  </div>
));

export const Filters: React.FC<IProps> = ({ categories, categoryId, changeCategoryId }) => (
  <div className={s.filters}>
    <Swiper {...swiperConfig}>
      <div
        className={c(s.filters__item, categoryId === null && s.active)}
        onClick={() => changeCategoryId(null)}
      >
        Все
      </div>
      {
        getFilters(categories, categoryId, changeCategoryId)
      }
    </Swiper>
  </div>
);
