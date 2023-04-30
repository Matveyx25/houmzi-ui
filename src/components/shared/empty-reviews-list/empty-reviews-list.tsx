import React from 'react';
import s from './empty-reviews-list.module.scss';

interface IProps {
  isMyReviews?: boolean
}

export const EmptyReviewsList: React.FC<IProps> = ({ isMyReviews }) => (
  <div className={s.emptyReviewsList}>
    <div className={s.emptyReviewsList__text}>
      {
        isMyReviews
          ? 'You haven\'t left any reviews yet'
          : 'No reviews yet'
      }
    </div>
    <img src="/images/clipboard.svg" alt="" className={s.emptyReviewsList__img}/>
  </div>
);
