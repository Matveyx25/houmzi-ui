import { Action } from 'redux';
import { IReview } from '../../interfaces/shared/review.interface';

export enum ReviewsActionTypes {
  getReviews = '[Reviews] Get Reviews',
  getReviewsSuccess = '[Reviews] Get Reviews Success',
  getReviewsFailed = '[Reviews] Get Reviews Failed',

  getMyReviews = '[Reviews] Get My Reviews',
  getMyReviewsSuccess = '[Reviews] Get My Reviews Success',
  getMyReviewsFailed = '[Reviews] Get My Reviews Failed',
}

export class GetReviews implements Action {
  readonly type = ReviewsActionTypes.getReviews;
}

export class GetReviewsSuccess implements Action {
  readonly type = ReviewsActionTypes.getReviewsSuccess;

  constructor(public payload: IReview[]) {
  }
}

export class GetReviewsFailed implements Action {
  readonly type = ReviewsActionTypes.getReviewsFailed;
}

export class GetMyReviews implements Action {
  readonly type = ReviewsActionTypes.getMyReviews;
}

export class GetMyReviewsSuccess implements Action {
  readonly type = ReviewsActionTypes.getMyReviewsSuccess;

  constructor(public payload: IReview[]) {
  }
}

export class GetMyReviewsFailed implements Action {
  readonly type = ReviewsActionTypes.getMyReviewsFailed;
}

export type ReviewsActions =
  | GetReviews
  | GetReviewsSuccess
  | GetReviewsFailed
  | GetMyReviews
  | GetMyReviewsSuccess
  | GetMyReviewsFailed
  ;
