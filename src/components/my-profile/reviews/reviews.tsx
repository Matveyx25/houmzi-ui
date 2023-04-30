import React from 'react';
import s from './reviews.module.scss';
import { Tabs } from '../tabs/tabs';
import { WithTranslation, withTranslation } from 'react-i18next';
import { EmptyReviewsList } from '../../shared/empty-reviews-list/empty-reviews-list';
import { IReview } from '../../../interfaces/shared/review.interface';
import Review from '../../shared/review/review';
import { Tab } from '../tab/tab';

interface IProps extends WithTranslation {
  reviews: IReview[]
  myReviews: IReview[]
}

const Reviews: React.FC<IProps> = ({ reviews, myReviews, t }) => {
  const reviewsRender = (reviews: IReview[], isMyReviews?: boolean): React.ReactElement | React.ReactElement[] =>
    reviews.length
      ? reviews?.map((review: IReview) => (
        <Review key={review.id} isMyReviews={isMyReviews} review={review}/>
      ))
      : <EmptyReviewsList isMyReviews={isMyReviews}/>;

  return (
    <Tabs className={s.reviews}>
      <Tab name={t('myReviews')}>
        <div className={s.reviews__list}>
          {reviewsRender(myReviews, true)}
        </div>
      </Tab>
      <Tab name={t('reviews')}>
        <div className={s.reviews__list}>
          {reviewsRender(reviews)}
        </div>
      </Tab>
    </Tabs>
  );
};

export default withTranslation('profile')(Reviews);
