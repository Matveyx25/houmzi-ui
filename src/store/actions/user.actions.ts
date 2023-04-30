import { Action } from 'redux';
import { IAddReviewData } from '../../interfaces/user/add-review-data.interface';
import { IReview } from '../../interfaces/shared/review.interface';
import { IProfile } from '../../interfaces/user/profile.interface';
import { IReviewResponse } from '../../interfaces/shared/review-response.interface';
import { GetReviewsFailed } from './reviews.actions';

export enum UserActionTypes {
  getProfileSuccess = '[User] Get Profile Success',

  getReviews = '[User] Get Reviews',
  getReviewsSuccess = '[User] Get Reviews Success',
  getReviewsFailed = '[User] Get Reviews Failed',

  addReview = '[User] Add Review',
  addReviewSuccess = '[User] Add Review Success',
  addReviewFailed = '[User] Add Review Failed',
}

export class GetProfileSuccess implements Action {
  readonly type = UserActionTypes.getProfileSuccess;

  constructor(public payload: IProfile) {
  }
}

export class GetReviews implements Action {
  readonly type = UserActionTypes.getReviews;

  constructor(public payload: { id: string, currentPage: number }) {
  }
}

export class GetReviewsSuccess implements Action {
  readonly type = UserActionTypes.getReviewsSuccess;

  constructor(public payload: IReviewResponse) {
  }
}

export class GetReviewFailed implements Action {
  readonly type = UserActionTypes.getReviewsFailed;
}

export class AddReview implements Action {
  readonly type = UserActionTypes.addReview;

  constructor(public payload: IAddReviewData) {
  }
}

export class AddReviewSuccess implements Action {
  readonly type = UserActionTypes.addReviewSuccess;

  constructor(public payload: IReview) {
  }
}

export class AddReviewFailed implements Action {
  readonly type = UserActionTypes.addReviewFailed;
}

export type UserActions =
  | GetProfileSuccess
  | GetReviews
  | GetReviewsSuccess
  | GetReviewsFailed
  | AddReview
  | AddReviewSuccess
  | AddReviewFailed
  ;
