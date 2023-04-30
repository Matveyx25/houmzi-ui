import { interval, Observable } from 'rxjs';
import {
  AddReview,
  AddReviewFailed,
  AddReviewSuccess,
  GetReviews,
  GetReviewsSuccess,
  UserActionTypes,
} from '../actions/user.actions';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, pluck, throttle } from 'rxjs/operators';
import { IAddReviewData } from '../../interfaces/user/add-review-data.interface';
import { addReview, getReviews } from '../../services/user.service';
import { IReview } from '../../interfaces/shared/review.interface';
import { IReviewResponse } from '../../interfaces/shared/review-response.interface';
import { GetReviewsFailed } from '../actions/reviews.actions';

const addUserReviewEpic = (action$: Observable<AddReview>) => action$.pipe(
  ofType<AddReview>(UserActionTypes.addReview),
  pluck('payload'),
  mergeMap((addReviewData: IAddReviewData) =>
    addReview(addReviewData)
      .then((review: IReview) => new AddReviewSuccess(review))
      .catch(() => new AddReviewFailed()),
  ),
);

const getReviewsEpic = (action$: Observable<GetReviews>) => action$.pipe(
  ofType<GetReviews>(UserActionTypes.getReviews),
  pluck('payload'),
  throttle(() => interval(1000)),
  mergeMap(({ id, currentPage }) =>
    getReviews(id, currentPage)
      .then((reviewResponse: IReviewResponse) => new GetReviewsSuccess(reviewResponse))
      .catch(() => new GetReviewsFailed()),
  ),
);

export const userEpics = combineEpics(
  addUserReviewEpic,
  getReviewsEpic,
);
