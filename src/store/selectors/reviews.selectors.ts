import { createSelector } from 'reselect';
import { IRootState } from '../reducers';
import { IReview } from '../../interfaces/shared/review.interface';

const _profile = (state: IRootState) => state.profile;
const _reviews = (state: IRootState) => _profile(state).reviews;
const _myReviews = (state: IRootState) => _profile(state).myReviews;

export const reviews = createSelector(
  _reviews,
  (reviews: IReview[]) => reviews,
);

export const myReviews = createSelector(
  _myReviews,
  (myReviews: IReview[]) => myReviews,
);

export const countReviews = createSelector(
  _reviews,
  (reviews: IReview[]) => reviews.length,
);
