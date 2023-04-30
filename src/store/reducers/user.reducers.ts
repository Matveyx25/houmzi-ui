import { UserActions, UserActionTypes } from '../actions/user.actions';
import { IProfile } from '../../interfaces/user/profile.interface';
import { IReview } from '../../interfaces/shared/review.interface';
import { IReviewResponse } from '../../interfaces/shared/review-response.interface';

export interface IState {
  profile: IProfile
  reviews: IReview[]
  total: number
  currentPage: number
}

const initialState: IState = {
  profile: null,
  reviews: [],
  total: 0,
  currentPage: null,
};

export function reducer(state: IState = initialState, actions: UserActions): IState {
  switch (actions.type) {
    case UserActionTypes.getProfileSuccess:
      return {
        ...state,
        profile: actions.payload,
      };
    case UserActionTypes.getReviewsSuccess:
      return setReviews(state, actions.payload);
    case UserActionTypes.addReviewSuccess:
      return {
        ...state,
        reviews: [actions.payload, ...state.reviews],
        total: state.total + 1,
        profile: { ...state.profile, rate: actions.payload.newRate },
      };
    default:
      return state;
  }
}

function setReviews(state: IState, reviewResponse: IReviewResponse): IState {
  const { reviews, currentPage } = state;

  if (!reviews.length) return {
    ...state,
    reviews: reviewResponse.items,
    total: reviewResponse.total,
    currentPage: 0,
  };

  return {
    ...state,
    reviews: [...reviews, ...reviewResponse.items],
    total: reviewResponse.total,
    currentPage: currentPage + 1,
  };
}
